export { EngagementStatus, STORAGE_KEY_ENGAGEMENTS, createEngagementId, createEngagementCommitted } from '../engagement/model'

export const AppointmentStatus = {
  READINESS_PENDING: 'READINESS_PENDING',
  READY: 'READY',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
}

export const ActionStatus = {
  TO_DO: 'TO_DO',
  CONFIRMED: 'CONFIRMED',
}

export const ActionCriticality = {
  BLOCKING: 'BLOCKING',
  INFORMATIVE: 'INFORMATIVE',
}

export const ActionOwner = {
  CLIENT: 'CLIENT',
  PRO: 'PRO',
}

export { DemoRole } from '../demoRole'

export const STORAGE_KEY_APPOINTMENTS = 'as.mvp.appointments'
export const STORAGE_KEY_PREP_PLANS = 'as.mvp.prepPlans'
export const STORAGE_KEY_PREP_TEMPLATES = 'as.mvp.prepTemplates'
export const STORAGE_KEY_CURRENT_APPOINTMENT_ID = 'as.mvp.currentAppointmentId'

export function createAppointmentId() {
  return `appt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function createPrepPlanId() {
  return `prep_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function createActionId(suffix) {
  return `act_${suffix}`
}

/**
 * @param {object} engagement
 */
export function createAppointmentFromEngagement(engagement) {
  return {
    id: createAppointmentId(),
    engagementId: engagement.id,
    status: AppointmentStatus.READINESS_PENDING,
    prepPlanId: null,
    readySnapshot: null,
    readyAt: null,
    createdAt: new Date().toISOString(),
  }
}

/**
 * @param {{
 *   template: object,
 *   appointmentId: string,
 *   engagementId: string,
 * }} params
 */
export function createPrepPlanFromTemplate({ template, appointmentId, engagementId }) {
  const actions = (template.actions ?? []).map((action) => ({
    id: action.id,
    title: action.title,
    helper: action.helper ?? '',
    owner: action.owner,
    criticality: action.criticality,
    status: action.status ?? ActionStatus.TO_DO,
    dueHint: action.dueHint ?? null,
  }))

  return {
    id: createPrepPlanId(),
    appointmentId,
    engagementId,
    templateId: template.id,
    actions,
    createdAt: new Date().toISOString(),
  }
}

export function blockingActions(plan) {
  if (!plan?.actions) return []
  return plan.actions.filter((a) => a.criticality === ActionCriticality.BLOCKING)
}

export function blockingProgress(plan) {
  const blocking = blockingActions(plan)
  const total = blocking.length
  const confirmed = blocking.filter((a) => a.status === ActionStatus.CONFIRMED).length
  const percent = total === 0 ? 0 : Math.round((confirmed / total) * 100)
  return { confirmed, total, percent, remaining: total - confirmed }
}

export function ownerBlockingProgress(plan, owner) {
  const blocking = blockingActions(plan).filter((a) => a.owner === owner)
  const total = blocking.length
  const confirmed = blocking.filter((a) => a.status === ActionStatus.CONFIRMED).length
  return { confirmed, total }
}

export function isReady(plan) {
  const blocking = blockingActions(plan)
  if (blocking.length === 0) return false
  return blocking.every((a) => a.status === ActionStatus.CONFIRMED)
}

export function remainingBlockingActions(plan) {
  return blockingActions(plan).filter((a) => a.status === ActionStatus.TO_DO)
}

/**
 * Confirm an action on a plan (immutable). Returns next plan or null.
 * @param {object} plan
 * @param {string} actionId
 */
export function confirmActionOnPlan(plan, actionId) {
  if (!plan?.actions) return null
  const index = plan.actions.findIndex((a) => a.id === actionId)
  if (index === -1) return null
  const action = plan.actions[index]
  if (action.status === ActionStatus.CONFIRMED) return plan
  const nextActions = [...plan.actions]
  nextActions[index] = {
    ...action,
    status: ActionStatus.CONFIRMED,
    confirmedAt: new Date().toISOString(),
  }
  return { ...plan, actions: nextActions }
}

/**
 * @param {{ appointment: object, plan: object, engagement: object }} params
 */
export function createReadySnapshot({ appointment, plan, engagement }) {
  const progress = blockingProgress(plan)
  return {
    appointmentId: appointment.id,
    engagementId: engagement.id,
    status: AppointmentStatus.READY,
    blockingConfirmed: progress.confirmed,
    blockingTotal: progress.total,
    serviceLabel: engagement.serviceLabel,
    dateLabel: engagement.dateLabel,
    startTime: engagement.startTime,
    endTime: engagement.endTime,
    placeLabel: engagement.placeLabel,
    clientDisplayName: engagement.clientDisplayName,
    proDisplayName: engagement.proDisplayName,
    createdAt: new Date().toISOString(),
  }
}

export function isReadinessPending(appointment) {
  return appointment?.status === AppointmentStatus.READINESS_PENDING
}

export function isAppointmentReady(appointment) {
  return appointment?.status === AppointmentStatus.READY
}
