import { computed, ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { DemoRole } from '../domain/demoRole'
import {
  STORAGE_KEY_LEDGER_LINES,
  STORAGE_KEY_PAYOUT,
  STORAGE_KEY_SETTLEMENT,
  SettlementStatus,
  TIP_OPTIONS,
  applyTip,
  createLedgerLines,
  createPayoutPaidOut,
  createSettlementPending,
  isSettled,
  settleMock,
} from '../domain/settlement/model'
import {
  commissionRateLabel,
  payoutStatusBadge,
  settlementStatusBadge,
  settlementStatusCode,
} from '../domain/settlement/labels'
import { useAppointmentStore } from './appointment'
import { useDemoRoleStore } from './demoRole'
import { useExecutionStore } from './execution'

function readJsonObject(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : null
  } catch {
    return null
  }
}

function readJsonArray(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeJson(key, value) {
  if (value == null) localStorage.removeItem(key)
  else localStorage.setItem(key, JSON.stringify(value))
}

export const useSettlementStore = defineStore('settlement', () => {
  const settlement = ref(readJsonObject(STORAGE_KEY_SETTLEMENT))
  const ledgerLines = ref(readJsonArray(STORAGE_KEY_LEDGER_LINES))
  const payout = ref(readJsonObject(STORAGE_KEY_PAYOUT))
  const demoRoleStore = useDemoRoleStore()
  const { demoRole } = storeToRefs(demoRoleStore)
  const downloadNote = ref(null)

  watch(
    settlement,
    (value) => writeJson(STORAGE_KEY_SETTLEMENT, value),
    { deep: true },
  )
  watch(
    ledgerLines,
    (value) => writeJson(STORAGE_KEY_LEDGER_LINES, value),
    { deep: true },
  )
  watch(
    payout,
    (value) => writeJson(STORAGE_KEY_PAYOUT, value),
    { deep: true },
  )

  const appointmentStore = useAppointmentStore()
  const executionStore = useExecutionStore()

  const statusBadge = computed(() =>
    settlementStatusBadge(settlement.value?.status),
  )
  const statusCode = computed(() =>
    settlementStatusCode(settlement.value?.status),
  )
  const payoutBadge = computed(() =>
    payoutStatusBadge(payout.value?.status),
  )
  const settled = computed(() => isSettled(settlement.value))
  const tipOptions = TIP_OPTIONS
  const commissionLabel = commissionRateLabel()

  function ensureDemoSeed() {
    const appointment = executionStore.ensureCompletedForSettlement()
    const engagement = appointmentStore.currentEngagement
    if (!appointment || !engagement) return null

    const dossier = executionStore.dossier
    const existing = settlement.value
    if (
      existing &&
      existing.appointmentId === appointment.id &&
      existing.engagementId === engagement.id
    ) {
      return existing
    }

    const next = createSettlementPending({
      engagement,
      appointment,
      executionDossier: dossier,
    })
    settlement.value = next
    ledgerLines.value = []
    payout.value = null
    return next
  }

  function ensureCalculated() {
    const current = ensureDemoSeed()
    if (!current) return null
    if (isSettled(current)) return current
    if (
      current.status === SettlementStatus.SETTLEMENT_PENDING ||
      current.status === SettlementStatus.CALCULATED
    ) {
      settlement.value = {
        ...applyTip(current, current.tipAmount ?? 0),
        status: SettlementStatus.PAYMENT_PENDING,
      }
    }
    return settlement.value
  }

  function setDemoRole(role) {
    demoRoleStore.setDemoRole(role)
  }

  function setTip(amount) {
    const current = ensureCalculated()
    if (!current || isSettled(current)) return current
    settlement.value = applyTip(current, amount)
    return settlement.value
  }

  /**
   * Mock pay balance (or close zero balance) → SETTLED + payout + ledger.
   */
  function payBalanceMock() {
    const current = ensureCalculated()
    if (!current) return null
    if (isSettled(current)) return current

    const settledSettlement = settleMock(current)
    settlement.value = settledSettlement
    payout.value = createPayoutPaidOut(settledSettlement)
    ledgerLines.value = createLedgerLines(settledSettlement)
    return settledSettlement
  }

  function acknowledgeDownloadReleve() {
    downloadNote.value =
      'Relevé mock — pas de fichier généré dans cette démo.'
    return downloadNote.value
  }

  function clearDownloadNote() {
    downloadNote.value = null
  }

  function resetDemo() {
    settlement.value = null
    ledgerLines.value = []
    payout.value = null
    downloadNote.value = null
    try {
      localStorage.removeItem(STORAGE_KEY_SETTLEMENT)
      localStorage.removeItem(STORAGE_KEY_LEDGER_LINES)
      localStorage.removeItem(STORAGE_KEY_PAYOUT)
    } catch {
      /* ignore */
    }
  }

  return {
    settlement,
    ledgerLines,
    payout,
    demoRole,
    downloadNote,
    statusBadge,
    statusCode,
    payoutBadge,
    settled,
    tipOptions,
    commissionLabel,
    ensureDemoSeed,
    ensureCalculated,
    setDemoRole,
    setTip,
    payBalanceMock,
    acknowledgeDownloadReleve,
    clearDownloadNote,
    resetDemo,
    DemoRole,
    SettlementStatus,
  }
})
