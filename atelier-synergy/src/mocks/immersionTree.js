/**
 * Immersion demo tree — happy-path snapshot after capacity OPEN / demand QUALIFIED.
 * Creates parallel dossiers (≥1 per key state) so each role is autonomous.
 * Idempotent per role (one portfolio).
 */

import {
  AppointmentStatus,
  ActionCriticality,
  ActionOwner,
  ActionStatus,
  createAppointmentFromEngagement,
  createPrepPlanFromTemplate,
  createReadySnapshot,
} from '../domain/appointment/model'
import { DemandStatus } from '../domain/demand/model'
import {
  EngagementStatus,
  PaymentStatus,
  createEngagementAwaitingAcceptance,
  createEngagementCommitted,
  createPaymentCreated,
  createContractProof,
} from '../domain/engagement/model'
import {
  CampaignStatus,
  InvitationStatus,
  ResponseType,
  createCampaign,
  createDemandSnapshot,
  createInvitation,
  DEFAULT_THRESHOLD,
} from '../domain/matching/model'
import {
  FeasibilityDecision,
  ProposalStatus,
  SoftHoldStatus,
  createProposalPending,
  createSoftHold,
  createOfferDraft,
} from '../domain/proposal/model'
import {
  SettlementStatus,
  createSettlementPending,
  settleMock,
} from '../domain/settlement/model'
import {
  ExperienceStatus,
  createExperienceFromSettlement,
  confirmOutcomeOk,
  createHistoryEntry,
} from '../domain/experience/model'
import { buildFrozenDemandBrief, defaultProSpecialty } from './proposalSeed'
import { buildKnotlessPrepTemplate, APPOINTMENT_THUMBNAIL } from './appointmentSeed'
import { buildSeedOpenCapacity, buildSeedQualifiedDemand } from './matchingPool'
import { mockClient, mockProfessional } from './platform'
import { seedDemoScenario } from './demoScenario'
import {
  isImmersionDemandId,
  readImmersionState,
  writeImmersionState,
} from './immersionIds'

export {
  isImmersionCapacityId,
  isImmersionDemandId,
  isImmersionSystemId,
  clearImmersionState,
} from './immersionIds'
import { useCapacityStore } from '../stores/capacity'
import { useDemandStore } from '../stores/demand'
import { useMatchingStore } from '../stores/matching'
import { useProposalStore } from '../stores/proposal'
import { useEngagementStore } from '../stores/engagement'
import { useAppointmentStore } from '../stores/appointment'
import { useSettlementStore } from '../stores/settlement'
import { useExperienceStore } from '../stores/experience'

const IMMERSION_CLIENTS = [
  {
    key: 'amina',
    firstName: 'Amina',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFPc8XNcTrByFBQYaSi85fz5Cs-Iob59JWA9UbOp5vYBRUmKv6P_JLulKQzKT0ZULNnwPw8BjaMgBmvs3CClG9bGSyM7CJnrnwDU6HFOx1nHBN0GOJ4BuNG1oeUHD1nJBBhILyRvF1BJAlkkSNFWZaMEfSJdeqLhSJrkVTMqHXOwNwG3H3U5-MZv6d-ioJSZ3CjjWmSmwD8wTJfDSjnXAW3soqRMgyQVC6tsPLLevnMF324obup5Ns',
  },
  {
    key: 'khadija',
    firstName: 'Khadija',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjeVyhLWlKQYZbRA4DmxRaQU6GnHZHzIN4K8zMSYY2lAQc-cMGJ4RIU6XtyYPtnLm9zZEHERb0uxKIS2Ran1bx-h0qQaHn-O2znRJxeUU61JXkBVHWQSqT9fGqDVoEHUcwTn2YXWmC1udQzHRJQNG2QuEcACCOjLGlMXlkpWPYYEJmynP-v3QYg3obHSxZg1qiCpDLz7Rtrh5d6YzSu7-vhZa98bqoQ9MPLrWTu9RFzJQqXCyNV3Au',
  },
  {
    key: 'sofia',
    firstName: 'Sofia',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOSTsl1h1oddDJMP2zT-SszeNGJu7RJjNtXY1ekkWSvGrbq1dHQJuxNYAHYHROGg6xEcJesrAljJSVvBlwey8L1OElR1YCZhbaBKF4FY8JAjy8Q4nqyGWPcS8Tnlrzic68RoZY2bs_pIh-jk74AwMQ0-eOEgKD4bLo56jzVilIIgscNCcn-qaw93mHAdGbmIX5RIO7j4wpgOwdCqEsI8X3l8L6EX8cgw742n_HCyoYtXTJKYbltvWy',
  },
]

function buildImmersionDemand(persona, suffix, capacity) {
  const base = buildSeedQualifiedDemand()
  const label = capacity?.prestation?.label || base.result.label
  const variante = capacity?.prestation?.variante?.taille || base.result.variante
  return {
    ...base,
    id: `dem_imm_${persona.key}_${suffix}`,
    clientName: persona.firstName,
    clientAvatarUrl: persona.avatarUrl,
    result: {
      ...base.result,
      label,
      variante,
    },
    immersion: true,
    immersionState: suffix,
  }
}

function buildImmersionCapacityForDemand(demand) {
  const label = demand?.result?.label || 'Knotless'
  const variante = demand?.result?.variante || 'medium'
  return {
    ...buildSeedOpenCapacity({
      seedKey: 'imm_mirror',
      capacityId: `cap_imm_mirror_${demand.id.replace(/^dem_/, '')}`,
      displayName: `${mockProfessional.firstName} D.`,
      styleTag: label,
      styleDetail: label,
      distanceKm: 3.2,
      wave: 1,
      avatarUrl: mockProfessional.avatarUrl,
      prestationLabel: label,
      prestationVariante: variante,
    }),
    immersion: true,
  }
}

function acceptInvitations(campaign, count) {
  const invitations = (campaign.invitations || []).map((inv, index) => {
    if (index >= count) return inv
    return {
      ...inv,
      status: InvitationStatus.ACCEPTED,
      responseType: ResponseType.ACCEPT_EXACT,
      respondedAt: new Date().toISOString(),
    }
  })
  const accepted = invitations.filter((i) => i.status === InvitationStatus.ACCEPTED).length
  const threshold = Number(campaign.threshold) || DEFAULT_THRESHOLD
  const ready = accepted >= threshold
  return {
    ...campaign,
    invitations,
    status: ready ? CampaignStatus.SHORTLIST_READY : CampaignStatus.OPEN,
    outcome: ready ? 'RESPONSES_TO_CONVERT' : null,
    shortlistedAt: ready ? new Date().toISOString() : null,
  }
}

function buildCampaignForDemand({
  id,
  demand,
  capacity,
  status,
  proDisplayName,
  proAvatarUrl,
}) {
  const invitation = createInvitation({
    capacityId: capacity.id,
    displayName: proDisplayName,
    styleTag: capacity.prestation?.label || demand.result?.label || 'Prestation',
    avatarUrl: proAvatarUrl,
    distanceKm: 2.5,
  })
  invitation.id = `inv_imm_${id}`

  const padInvites = [
    createInvitation({
      capacityId: 'cap_seed_mariam',
      displayName: 'Mariam K.',
      styleTag: 'Braids / twists',
      avatarUrl: null,
      distanceKm: 7,
    }),
    createInvitation({
      capacityId: 'cap_seed_fatou',
      displayName: 'Fatou B.',
      styleTag: 'Vanilles',
      avatarUrl: null,
      distanceKm: 5.2,
    }),
  ]
  padInvites[0].id = `inv_imm_${id}_b`
  padInvites[1].id = `inv_imm_${id}_c`

  let campaign = createCampaign({
    demandId: demand.id,
    demandSnapshot: createDemandSnapshot(demand, {
      firstName: demand.clientName || mockClient.firstName,
      avatarUrl: demand.clientAvatarUrl || mockClient.avatarUrl,
    }),
    pool: [
      {
        capacityId: capacity.id,
        displayName: proDisplayName,
        styleTag: invitation.styleTag,
        distanceKm: 2.5,
        wave: 1,
        avatarUrl: proAvatarUrl,
      },
    ],
    invitations: [invitation, ...padInvites],
    threshold: DEFAULT_THRESHOLD,
  })
  campaign.id = id
  campaign.immersion = true

  if (status === CampaignStatus.SHORTLIST_READY) {
    campaign = acceptInvitations(campaign, DEFAULT_THRESHOLD)
  } else if (status === CampaignStatus.OPEN) {
    // Keep first invitation SENT (pro can accept); pad one accepted for progress feel
    const invitations = campaign.invitations.map((inv, index) =>
      index === 1
        ? {
            ...inv,
            status: InvitationStatus.ACCEPTED,
            responseType: ResponseType.ACCEPT_EXACT,
            respondedAt: new Date().toISOString(),
          }
        : inv,
    )
    campaign = { ...campaign, invitations }
  }

  return campaign
}

function buildProposal({
  id,
  status,
  campaign,
  invitation,
  capacity,
  demand,
  proDisplayName,
  proAvatarUrl,
}) {
  const proposal = createProposalPending({
    campaignId: campaign.id,
    invitationId: invitation.id,
    capacityId: capacity.id,
    demandId: demand.id,
    demandSnapshot: campaign.demandSnapshot,
    frozenBrief: buildFrozenDemandBrief(campaign.demandSnapshot),
    proDisplayName,
    proAvatarUrl,
    proSpecialty: defaultProSpecialty(invitation.styleTag),
  })
  proposal.id = id
  proposal.immersion = true
  proposal.offer = createOfferDraft()

  if (status === ProposalStatus.PENDING) {
    proposal.feasibility = FeasibilityDecision.EXACT
    return { proposal, softHold: null }
  }

  const hold = createSoftHold({
    proposalId: proposal.id,
    slot: proposal.offer.slot,
  })
  hold.id = `hold_imm_${id}`
  hold.status = SoftHoldStatus.ACTIVE

  return {
    proposal: {
      ...proposal,
      status: ProposalStatus.FIRM,
      feasibility: FeasibilityDecision.EXACT,
      softHoldId: hold.id,
      confirmedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      offer: {
        ...proposal.offer,
        slot: { ...proposal.offer.slot, availability: 'SOFT_HOLD' },
      },
    },
    softHold: hold,
  }
}

function buildEngagementBundle({
  id,
  status,
  proposal,
  softHold,
  policies,
  clientName,
  proName,
}) {
  if (status === EngagementStatus.COMMITTED) {
    const payment = createPaymentCreated({
      engagementId: id,
      amount: 66,
    })
    payment.id = `pay_imm_${id}`
    payment.status = PaymentStatus.SUCCEEDED
    payment.succeededAt = new Date().toISOString()

    const seed = {
      id,
      serviceLabel: proposal?.frozenBrief?.prestationLabel || 'Knotless / box braids',
      dateLabel: proposal?.offer?.slot?.dateLabel || 'Samedi 15 mars',
      startTime: proposal?.offer?.slot?.startTime || '09:30',
      endTime: proposal?.offer?.slot?.endTime || '14:00',
      placeLabel: proposal?.offer?.placeLabel || 'Chez la coiffeuse',
      clientDisplayName: clientName,
      proDisplayName: proName,
      thumbnailUrl: proposal?.proAvatarUrl || APPOINTMENT_THUMBNAIL,
      priceTotal: proposal?.offer?.priceTotal || 220,
      depositAmount: 66,
      balanceAmount: 154,
      proposalId: proposal?.id ?? null,
      softHoldId: softHold?.id ?? null,
      paymentId: payment.id,
      createdAt: new Date().toISOString(),
    }
    const engagement = createEngagementCommitted(seed)
    engagement.immersion = true
    engagement.proof = createContractProof({
      engagement,
      payment,
      proposal,
      policies,
    })
    return { engagement, payment }
  }

  const engagement = createEngagementAwaitingAcceptance({
    proposal,
    softHold,
    policies,
  })
  engagement.id = id
  engagement.immersion = true
  engagement.clientDisplayName = clientName
  engagement.proDisplayName = proName

  if (status === EngagementStatus.AWAITING_CLIENT_ACCEPTANCE) {
    return { engagement, payment: null }
  }

  // AWAITING_PAYMENT
  const payment = createPaymentCreated({
    engagementId: id,
    amount: engagement.depositAmount,
  })
  payment.id = `pay_imm_${id}`
  return {
    engagement: {
      ...engagement,
      status: EngagementStatus.AWAITING_PAYMENT,
      paymentId: payment.id,
      consents: {
        offerAccepted: true,
        policiesAccepted: Object.fromEntries(
          (policies || []).map((p) => [p.id, true]),
        ),
        acceptedAt: new Date().toISOString(),
      },
    },
    payment,
  }
}

function buildAppointmentBundle({ id, engagement, status }) {
  const template = buildKnotlessPrepTemplate()
  template.id = `tpl_imm_${id}`
  const appointment = createAppointmentFromEngagement(engagement)
  appointment.id = id
  appointment.immersion = true

  let plan = createPrepPlanFromTemplate({
    template,
    appointmentId: appointment.id,
    engagementId: engagement.id,
  })
  plan.id = `prep_imm_${id}`

  if (status === AppointmentStatus.READINESS_PENDING) {
    return { appointment, plan, template }
  }

  plan = {
    ...plan,
    actions: plan.actions.map((action) => ({
      ...action,
      status: ActionStatus.CONFIRMED,
      confirmedAt: new Date().toISOString(),
    })),
  }
  const snapshot = createReadySnapshot({ appointment, plan, engagement })
  let nextAppointment = {
    ...appointment,
    status: AppointmentStatus.READY,
    prepPlanId: plan.id,
    readySnapshot: snapshot,
    readyAt: snapshot.createdAt,
  }

  if (status === AppointmentStatus.READY) {
    return { appointment: nextAppointment, plan, template }
  }

  if (status === AppointmentStatus.IN_PROGRESS) {
    nextAppointment = {
      ...nextAppointment,
      status: AppointmentStatus.IN_PROGRESS,
      startedAt: new Date().toISOString(),
    }
    return { appointment: nextAppointment, plan, template }
  }

  // COMPLETED
  nextAppointment = {
    ...nextAppointment,
    status: AppointmentStatus.COMPLETED,
    startedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  }
  return { appointment: nextAppointment, plan, template }
}

/**
 * After coiffeuse opens a capacity — portfolio of client demands + dossiers.
 */
export function seedImmersionAfterCapacityOpen(capacity) {
  if (!capacity?.id) return null
  const state = readImmersionState()
  if (state.pro?.seeded) return state.pro

  seedDemoScenario()

  const demandStore = useDemandStore()
  const matchingStore = useMatchingStore()
  const proposalStore = useProposalStore()
  const engagementStore = useEngagementStore()
  const appointmentStore = useAppointmentStore()
  const settlementStore = useSettlementStore()
  const experienceStore = useExperienceStore()

  const proName = `${mockProfessional.firstName} · vous`
  const proAvatar = mockProfessional.avatarUrl

  // --- Demands (one per matching / proposal branch) ---
  const demandOpen = buildImmersionDemand(IMMERSION_CLIENTS[0], 'open', capacity)
  const demandShortlist = buildImmersionDemand(IMMERSION_CLIENTS[1], 'shortlist', capacity)
  const demandFirm = buildImmersionDemand(IMMERSION_CLIENTS[2], 'firm', capacity)

  demandStore.importDemand(demandOpen, { setAsCurrent: false })
  demandStore.importDemand(demandShortlist, { setAsCurrent: false })
  demandStore.importDemand(demandFirm, { setAsCurrent: false })

  // --- Campaigns: OPEN (actionable) + SHORTLIST_READY ---
  const campOpen = buildCampaignForDemand({
    id: 'camp_imm_open',
    demand: demandOpen,
    capacity,
    status: CampaignStatus.OPEN,
    proDisplayName: proName,
    proAvatarUrl: proAvatar,
  })
  const campShortlist = buildCampaignForDemand({
    id: 'camp_imm_shortlist',
    demand: demandShortlist,
    capacity,
    status: CampaignStatus.SHORTLIST_READY,
    proDisplayName: proName,
    proAvatarUrl: proAvatar,
  })
  matchingStore.importCampaign(campOpen, { setAsCurrent: true })
  matchingStore.importCampaign(campShortlist, { setAsCurrent: false })

  // --- Proposals: PENDING (current) + FIRM ---
  const pendingInvite = campShortlist.invitations[0]
  const { proposal: proposalPending } = buildProposal({
    id: 'prop_imm_pending',
    status: ProposalStatus.PENDING,
    campaign: campShortlist,
    invitation: pendingInvite,
    capacity,
    demand: demandShortlist,
    proDisplayName: proName,
    proAvatarUrl: proAvatar,
  })

  const campFirm = buildCampaignForDemand({
    id: 'camp_imm_firm',
    demand: demandFirm,
    capacity,
    status: CampaignStatus.SHORTLIST_READY,
    proDisplayName: proName,
    proAvatarUrl: proAvatar,
  })
  matchingStore.importCampaign(campFirm, { setAsCurrent: false })
  const { proposal: proposalFirm, softHold: holdFirm } = buildProposal({
    id: 'prop_imm_firm',
    status: ProposalStatus.FIRM,
    campaign: campFirm,
    invitation: campFirm.invitations[0],
    capacity,
    demand: demandFirm,
    proDisplayName: proName,
    proAvatarUrl: proAvatar,
  })

  proposalStore.importProposal(proposalPending, { setAsCurrent: true })
  proposalStore.importProposal(proposalFirm, { setAsCurrent: false })
  if (holdFirm) proposalStore.importSoftHold(holdFirm)

  // --- Engagements: acceptance / payment / committed ---
  const policies = engagementStore.policies
  const { engagement: engAccept } = buildEngagementBundle({
    id: 'eng_imm_accept',
    status: EngagementStatus.AWAITING_CLIENT_ACCEPTANCE,
    proposal: proposalFirm,
    softHold: holdFirm,
    policies,
    clientName: IMMERSION_CLIENTS[2].firstName,
    proName,
  })
  const { engagement: engPay, payment: payPay } = buildEngagementBundle({
    id: 'eng_imm_pay',
    status: EngagementStatus.AWAITING_PAYMENT,
    proposal: proposalFirm,
    softHold: holdFirm,
    policies,
    clientName: IMMERSION_CLIENTS[1].firstName,
    proName,
  })
  const { engagement: engCommitted, payment: payCommitted } = buildEngagementBundle({
    id: 'eng_imm_committed',
    status: EngagementStatus.COMMITTED,
    proposal: proposalFirm,
    softHold: holdFirm,
    policies,
    clientName: IMMERSION_CLIENTS[0].firstName,
    proName,
  })

  engagementStore.importEngagement(engAccept, { setAsCurrent: true })
  engagementStore.importEngagement(engPay, { setAsCurrent: false })
  if (payPay) engagementStore.importPayment(payPay)
  engagementStore.importEngagement(engCommitted, { setAsCurrent: false })
  if (payCommitted) engagementStore.importPayment(payCommitted)

  // --- Appointments: readiness (current) + ready + in progress + completed ---
  const apptPending = buildAppointmentBundle({
    id: 'appt_imm_pending',
    engagement: engCommitted,
    status: AppointmentStatus.READINESS_PENDING,
  })
  const apptReady = buildAppointmentBundle({
    id: 'appt_imm_ready',
    engagement: engCommitted,
    status: AppointmentStatus.READY,
  })
  const apptProgress = buildAppointmentBundle({
    id: 'appt_imm_progress',
    engagement: engCommitted,
    status: AppointmentStatus.IN_PROGRESS,
  })
  const apptDone = buildAppointmentBundle({
    id: 'appt_imm_done',
    engagement: engCommitted,
    status: AppointmentStatus.COMPLETED,
  })

  appointmentStore.importAppointmentBundle(apptPending, { setAsCurrent: true })
  appointmentStore.importAppointmentBundle(apptReady, { setAsCurrent: false })
  appointmentStore.importAppointmentBundle(apptProgress, { setAsCurrent: false })
  appointmentStore.importAppointmentBundle(apptDone, { setAsCurrent: false })

  // --- Settlement + experience (singletons, only if empty) ---
  if (!settlementStore.settlement) {
    const pendingSettlement = createSettlementPending({
      engagement: engCommitted,
      appointment: apptDone.appointment,
      executionDossier: null,
    })
    pendingSettlement.id = 'set_imm_pending'
    pendingSettlement.immersion = true
    settlementStore.importSettlement(pendingSettlement)
  }

  if (!experienceStore.experiences.length && settlementStore.settlement) {
    // Keep a recorded sample + leave settlement pending actionable separately:
    // use a SETTLED clone for experience only if settlement is still pending.
    let settlementForExp = settlementStore.settlement
    if (settlementForExp.status !== SettlementStatus.SETTLED) {
      settlementForExp = {
        ...settleMock(settlementForExp),
        id: 'set_imm_settled',
        immersion: true,
      }
    }
    const experience = createExperienceFromSettlement(settlementForExp)
    experience.id = 'exp_imm_pending'
    experience.status = ExperienceStatus.PROOF_PENDING
    experience.immersion = true
    experienceStore.importExperience(experience, { replaceAll: false })

    const recorded = {
      ...confirmOutcomeOk(experience),
      id: 'exp_imm_recorded',
      immersion: true,
    }
    experienceStore.importExperience(recorded, { replaceAll: false })
    experienceStore.importHistory(createHistoryEntry(recorded))
  }

  const result = {
    seeded: true,
    role: 'pro',
    capacityId: capacity.id,
    at: new Date().toISOString(),
  }
  writeImmersionState({ ...state, pro: result })
  return result
}

/**
 * After cliente qualifies a demand — mirror capacity + responses + portfolio.
 */
export function seedImmersionAfterDemandQualified(demand) {
  if (!demand?.id) return null
  const state = readImmersionState()
  if (state.client?.seeded) return state.client

  seedDemoScenario()

  const capacityStore = useCapacityStore()
  const matchingStore = useMatchingStore()
  const proposalStore = useProposalStore()
  const engagementStore = useEngagementStore()
  const appointmentStore = useAppointmentStore()
  const settlementStore = useSettlementStore()
  const experienceStore = useExperienceStore()

  const mirrorCapacity = buildImmersionCapacityForDemand(demand)
  capacityStore.importCapacity(mirrorCapacity, { setAsCurrent: false })

  const proName = mirrorCapacity.displayName
  const proAvatar = mockProfessional.avatarUrl

  // Live chain on the user's demand: shortlist → firm → awaiting acceptance (current)
  let campaign = matchingStore.launchCampaign(demand.id)
  if (campaign?.status === CampaignStatus.OPEN) {
    const threshold = Number(campaign.threshold) || DEFAULT_THRESHOLD
    const ids = (campaign.invitations || []).slice(0, threshold).map((inv) => inv.id)
    for (const id of ids) matchingStore.acceptExact(id)
    campaign = matchingStore.currentCampaign
  }

  // Ensure mirror capacity invitation is preferred if missing
  if (!campaign) {
    campaign = buildCampaignForDemand({
      id: `camp_imm_client_${demand.id}`,
      demand,
      capacity: mirrorCapacity,
      status: CampaignStatus.SHORTLIST_READY,
      proDisplayName: proName,
      proAvatarUrl: proAvatar,
    })
    matchingStore.importCampaign(campaign, { setAsCurrent: true })
  }

  let proposal = proposalStore.openFromShortlist()
  if (proposal?.status === ProposalStatus.PENDING) {
    proposalStore.setFeasibility(FeasibilityDecision.EXACT)
    proposalStore.publishFirm()
    proposal = proposalStore.currentProposal
  }
  if (!proposal || proposal.status !== ProposalStatus.FIRM) {
    const built = buildProposal({
      id: 'prop_imm_client_firm',
      status: ProposalStatus.FIRM,
      campaign,
      invitation: campaign.invitations[0],
      capacity: mirrorCapacity,
      demand,
      proDisplayName: proName,
      proAvatarUrl: proAvatar,
    })
    proposalStore.importProposal(built.proposal, { setAsCurrent: true })
    if (built.softHold) proposalStore.importSoftHold(built.softHold)
    proposal = built.proposal
  }

  const softHold =
    proposalStore.softHolds.find((h) => h.id === proposal.softHoldId) || null

  // Parallel pending proposal (another coiffeuse still validating)
  const { proposal: pendingOther } = buildProposal({
    id: 'prop_imm_client_pending',
    status: ProposalStatus.PENDING,
    campaign,
    invitation: campaign.invitations[1] || campaign.invitations[0],
    capacity: mirrorCapacity,
    demand,
    proDisplayName: 'Mariam K.',
    proAvatarUrl: null,
  })
  proposalStore.importProposal(pendingOther, { setAsCurrent: false })

  const policies = engagementStore.policies
  const { engagement: engAccept } = buildEngagementBundle({
    id: 'eng_imm_client_accept',
    status: EngagementStatus.AWAITING_CLIENT_ACCEPTANCE,
    proposal,
    softHold,
    policies,
    clientName: mockClient.firstName,
    proName: proposal.proDisplayName || proName,
  })
  const { engagement: engPay, payment: payPay } = buildEngagementBundle({
    id: 'eng_imm_client_pay',
    status: EngagementStatus.AWAITING_PAYMENT,
    proposal,
    softHold,
    policies,
    clientName: mockClient.firstName,
    proName,
  })
  const { engagement: engCommitted, payment: payCommitted } = buildEngagementBundle({
    id: 'eng_imm_client_committed',
    status: EngagementStatus.COMMITTED,
    proposal,
    softHold,
    policies,
    clientName: mockClient.firstName,
    proName,
  })

  engagementStore.importEngagement(engAccept, { setAsCurrent: true })
  engagementStore.importEngagement(engPay, { setAsCurrent: false })
  if (payPay) engagementStore.importPayment(payPay)
  engagementStore.importEngagement(engCommitted, { setAsCurrent: false })
  if (payCommitted) engagementStore.importPayment(payCommitted)

  const apptPending = buildAppointmentBundle({
    id: 'appt_imm_client_pending',
    engagement: engCommitted,
    status: AppointmentStatus.READINESS_PENDING,
  })
  const apptReady = buildAppointmentBundle({
    id: 'appt_imm_client_ready',
    engagement: engCommitted,
    status: AppointmentStatus.READY,
  })
  const apptDone = buildAppointmentBundle({
    id: 'appt_imm_client_done',
    engagement: engCommitted,
    status: AppointmentStatus.COMPLETED,
  })
  appointmentStore.importAppointmentBundle(apptPending, { setAsCurrent: false })
  appointmentStore.importAppointmentBundle(apptReady, { setAsCurrent: false })
  appointmentStore.importAppointmentBundle(apptDone, { setAsCurrent: false })

  if (!settlementStore.settlement) {
    const pendingSettlement = createSettlementPending({
      engagement: engCommitted,
      appointment: apptDone.appointment,
      executionDossier: null,
    })
    pendingSettlement.id = 'set_imm_client_pending'
    pendingSettlement.immersion = true
    settlementStore.importSettlement(pendingSettlement)
  }

  if (!experienceStore.experiences.length) {
    const settled = {
      ...settleMock(
        createSettlementPending({
          engagement: engCommitted,
          appointment: apptDone.appointment,
        }),
      ),
      id: 'set_imm_client_settled',
      immersion: true,
    }
    const experience = createExperienceFromSettlement(settled)
    experience.id = 'exp_imm_client_pending'
    experience.immersion = true
    experienceStore.importExperience(experience, { replaceAll: false })
  }

  // Also seed an OPEN campaign sample so matching badge > 1 when possible
  const campOpenSample = buildCampaignForDemand({
    id: 'camp_imm_client_open',
    demand,
    capacity: mirrorCapacity,
    status: CampaignStatus.OPEN,
    proDisplayName: 'Fatou B.',
    proAvatarUrl: null,
  })
  // Avoid duplicate demand campaigns conflicting — only import if no open sample
  if (!matchingStore.campaigns.some((c) => c.id === campOpenSample.id)) {
    matchingStore.importCampaign(campOpenSample, { setAsCurrent: false })
  }

  const result = {
    seeded: true,
    role: 'client',
    demandId: demand.id,
    capacityId: mirrorCapacity.id,
    at: new Date().toISOString(),
  }
  writeImmersionState({ ...state, client: result })
  return result
}

/**
 * Badges = objets qui demandent une intervention du rôle courant.
 * Pas un compteur d’existence ; pas de badge sur le cadre pro.
 */
export function immersionBlockCounts({
  isPro,
  capacityStore,
  demandStore,
  matchingStore,
  proposalStore,
  engagementStore,
  appointmentStore,
  settlementStore,
  experienceStore,
  isSeedDemandId,
}) {
  const userCapacityIds = new Set(
    capacityStore.userCapacities.map((c) => c.id),
  )

  // Capacité : brouillons à finaliser / activer (pro)
  const capacityAction = isPro ? capacityStore.userDraftCapacities.length : 0

  // Demande : brouillons / qualification en cours (cliente)
  const demandAction = isPro
    ? 0
    : demandStore.demands.filter(
        (d) =>
          !isSeedDemandId(d.id) &&
          !isImmersionDemandId(d.id) &&
          (d.status === DemandStatus.DRAFT ||
            d.status === DemandStatus.IN_PROGRESS),
      ).length

  // Apparier
  let matchingAction = 0
  if (isPro) {
    // Invitations SENT sur une capacité user → répondre
    for (const campaign of matchingStore.campaigns) {
      if (campaign.status !== CampaignStatus.OPEN) continue
      for (const inv of campaign.invitations || []) {
        if (
          inv.status === InvitationStatus.SENT &&
          userCapacityIds.has(inv.capacityId)
        ) {
          matchingAction += 1
        }
      }
    }
  } else {
    // Shortlist prête → consulter / convertir
    matchingAction = matchingStore.campaigns.filter(
      (c) => c.status === CampaignStatus.SHORTLIST_READY,
    ).length
  }

  // Proposition
  const proposalAction = isPro
    ? proposalStore.proposals.filter((p) => p.status === ProposalStatus.PENDING)
        .length
    : proposalStore.proposals.filter((p) => p.status === ProposalStatus.FIRM)
        .length

  // Engagement
  const engagementAction = isPro
    ? 0 // la pro attend acceptation / paiement
    : engagementStore.engagements.filter(
        (e) =>
          e.status === EngagementStatus.AWAITING_CLIENT_ACCEPTANCE ||
          e.status === EngagementStatus.AWAITING_PAYMENT,
      ).length

  // RDV : checklist bloquante restante pour mon rôle
  const owner = isPro ? ActionOwner.PRO : ActionOwner.CLIENT
  let appointmentAction = 0
  for (const appointment of appointmentStore.appointments) {
    if (appointment.status !== AppointmentStatus.READINESS_PENDING) continue
    const plan = appointmentStore.prepPlans.find(
      (p) => p.id === appointment.prepPlanId,
    )
    if (!plan?.actions) continue
    const todo = plan.actions.some(
      (a) =>
        a.owner === owner &&
        a.criticality === ActionCriticality.BLOCKING &&
        a.status === ActionStatus.TO_DO,
    )
    if (todo) appointmentAction += 1
  }

  // Exécution : RDV READY / EN COURS (arrivées, démarrer, fin, confirmer)
  const executionAction = appointmentStore.appointments.filter((a) =>
    [AppointmentStatus.READY, AppointmentStatus.IN_PROGRESS].includes(a.status),
  ).length

  // Règlement : solde à payer (cliente)
  const settlement = settlementStore.settlement
  const settlementAction =
    !isPro &&
    settlement &&
    [
      SettlementStatus.SETTLEMENT_PENDING,
      SettlementStatus.CALCULATED,
      SettlementStatus.PAYMENT_PENDING,
    ].includes(settlement.status)
      ? 1
      : 0

  // Preuve : confirmer l’expérience (cliente)
  const experienceAction = isPro
    ? 0
    : (experienceStore.experiences || []).filter(
        (e) => e.status === ExperienceStatus.PROOF_PENDING,
      ).length

  return {
    'avant-0': 0,
    'etape-0': capacityAction,
    'etape-1': demandAction,
    'etape-2': matchingAction,
    'etape-3': proposalAction,
    'etape-4': engagementAction,
    'etape-5': appointmentAction,
    'etape-6': executionAction,
    'etape-7': settlementAction,
    'etape-8': experienceAction,
  }
}
