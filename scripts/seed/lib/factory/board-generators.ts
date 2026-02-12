// =============================================================================
// Board-Specific Data Generators
// =============================================================================
// Each function returns { name, overrides } for use with BoardItemFactory.

import { faker } from "./column-generators";
import { generateDate, generatePhone, generateEmail, generateAddress } from "./column-generators";
import type { GeneratedProfile } from "./profile-factory";
import type { GeneratedFeeK } from "./fee-k-factory";
import type { GeneratedBoardItem } from "./board-item-factory";
import {
  HEARING_TYPES,
  RELIEF_TYPES,
  COURT_STATUSES,
  OPEN_FORM_STATUSES,
  MOTION_TYPES,
  APPEAL_STATUSES,
  FOIA_TYPES,
  LANGUAGES,
  APPOINTMENT_STATUSES,
  NVC_NOTICE_TYPES,
  RECEIPT_TYPES,
  RFE_TYPES,
  DETENTION_FACILITIES,
} from "../constants";

// =============================================================================
// Types
// =============================================================================

interface BoardGenResult {
  name: string;
  overrides: Record<string, unknown>;
}

// =============================================================================
// Court Cases
// =============================================================================

export function generateCourtCaseData(
  profile: GeneratedProfile,
  feeK: GeneratedFeeK
): BoardGenResult {
  const hearingType = faker.helpers.arrayElement(HEARING_TYPES);
  const relief = faker.helpers.arrayElement(RELIEF_TYPES);
  const status = faker.helpers.arrayElement(COURT_STATUSES);

  return {
    name: `${profile.name} - Court Case`,
    overrides: {
      hearing_type: { label: hearingType },
      status: { label: status },
      x_next_hearing_date: { date: generateDate(7, 180) },
      nta_date: { date: generateDate(-365, -30) },
      year: { label: new Date().getFullYear().toString() },
      entry: { label: faker.helpers.arrayElement(["EWI", "Overstay", "Visa"]) },
      seeking: { label: relief },
    },
  };
}

// =============================================================================
// Open Forms
// =============================================================================

export function generateOpenFormData(
  profile: GeneratedProfile,
  feeK: GeneratedFeeK
): BoardGenResult {
  const status = faker.helpers.arrayElement(OPEN_FORM_STATUSES);

  return {
    name: `${profile.name} - ${feeK.caseType}`,
    overrides: {
      status: { label: status },
      target_date: { date: generateDate(14, 90) },
      assignment_date: { date: generateDate(-30, -1) },
      hire_date: { date: generateDate(-90, -1) },
    },
  };
}

// =============================================================================
// Motions
// =============================================================================

export function generateMotionData(
  profile: GeneratedProfile,
  feeK: GeneratedFeeK,
  _courtCase: GeneratedBoardItem
): BoardGenResult {
  const motionType = faker.helpers.arrayElement(MOTION_TYPES);
  const hearingType = faker.helpers.arrayElement(HEARING_TYPES);

  return {
    name: `${profile.name} - ${motionType}`,
    overrides: {
      status: { label: faker.helpers.arrayElement(["Pending", "Filed", "Granted", "Denied"]) },
      hearing_type: { label: hearingType },
      next_hearing_date: { date: generateDate(7, 120) },
    },
  };
}

// =============================================================================
// Appeals
// =============================================================================

export function generateAppealData(
  profile: GeneratedProfile,
  _feeK: GeneratedFeeK
): BoardGenResult {
  const status = faker.helpers.arrayElement(APPEAL_STATUSES);

  return {
    name: `${profile.name} - Appeal`,
    overrides: {
      status: { label: status },
      decision_date: { date: generateDate(-60, -1) },
      appeal_due: { date: generateDate(1, 30) },
      second_half_due: { date: generateDate(30, 90) },
    },
  };
}

// =============================================================================
// FOIAs
// =============================================================================

export function generateFoiaData(
  profile: GeneratedProfile,
  _feeK: GeneratedFeeK
): BoardGenResult {
  const foiaType = faker.helpers.arrayElement(FOIA_TYPES);

  return {
    name: `${profile.name} - FOIA (${foiaType})`,
    overrides: {
      status: { label: faker.helpers.arrayElement(["Pending", "Submitted", "Received", "Completed"]) },
    },
  };
}

// =============================================================================
// Litigation
// =============================================================================

export function generateLitigationData(
  profile: GeneratedProfile,
  _feeK: GeneratedFeeK
): BoardGenResult {
  return {
    name: `${profile.name} - Litigation`,
    overrides: {
      type_of_case: "Mandamus",
      status_of_complaint: { label: faker.helpers.arrayElement(["Draft", "Filed", "Pending", "Resolved"]) },
      current_status: { label: faker.helpers.arrayElement(["Active", "Pending", "Closed"]) },
      due_date: { date: generateDate(7, 90) },
      hearing_date: { date: generateDate(30, 180) },
    },
  };
}

// =============================================================================
// I918B's
// =============================================================================

export function generateI918BData(
  profile: GeneratedProfile,
  _feeK: GeneratedFeeK
): BoardGenResult {
  return {
    name: `${profile.name} - I918B`,
    overrides: {
      status: { label: faker.helpers.arrayElement(["Pending", "Requested", "Signed", "Filed"]) },
      hire_date_for_i918b_request: { date: generateDate(-60, -1) },
      signed_date: { date: generateDate(-30, -1) },
      due_date_for_u_visa_hire: { date: generateDate(30, 120) },
      expiration_date: { date: generateDate(180, 365) },
    },
  };
}

// =============================================================================
// Address Changes (direct from Profile, no Fee K)
// =============================================================================

export function generateAddressChangeData(
  profile: GeneratedProfile
): BoardGenResult {
  return {
    name: `${profile.name} - Address Change`,
    overrides: {
      status: { label: faker.helpers.arrayElement(["Pending", "Sent", "Completed"]) },
      court_or_uscis: { label: faker.helpers.arrayElement(["Court", "USCIS"]) },
      ecas_or_paper: { label: faker.helpers.arrayElement(["ECAS", "Paper"]) },
      date_received: { date: generateDate(-14, -1) },
      date_sent: { date: generateDate(1, 14) },
    },
  };
}

// =============================================================================
// NVC Notices (direct from Profile, no Fee K)
// =============================================================================

export function generateNvcNoticeData(
  profile: GeneratedProfile
): BoardGenResult {
  const noticeType = faker.helpers.arrayElement(NVC_NOTICE_TYPES);

  return {
    name: `${profile.name} - NVC Notice`,
    overrides: {
      notice_type: { label: noticeType },
      status: { label: faker.helpers.arrayElement(["Received", "Reviewed", "Action Needed"]) },
      notice_date: { date: generateDate(-30, -1) },
    },
  };
}

// =============================================================================
// Originals + Cards + Notices (direct from Profile, no Fee K)
// =============================================================================

export function generateOriginalData(
  profile: GeneratedProfile
): BoardGenResult {
  const receiptType = faker.helpers.arrayElement(RECEIPT_TYPES);

  return {
    name: `${profile.name} - ${receiptType}`,
    overrides: {
      status: { label: faker.helpers.arrayElement(["Received", "Filed", "Delivered to Client"]) },
      date_received: { date: generateDate(-30, -1) },
      receipt_type: { label: receiptType },
      receipt_number: faker.string.alphanumeric(13).toUpperCase(),
    },
  };
}

// =============================================================================
// RFEs (direct from Profile, occasionally with Fee K)
// =============================================================================

export function generateRfeData(
  profile: GeneratedProfile
): BoardGenResult {
  const rfeType = faker.helpers.arrayElement(RFE_TYPES);

  return {
    name: `${profile.name} - RFE (${rfeType})`,
    overrides: {
      status: { label: faker.helpers.arrayElement(["Received", "In Progress", "Responded", "Closed"]) },
      received_date: { date: generateDate(-30, -1) },
      warning: { date: generateDate(14, 60) },
      due_date: { date: generateDate(30, 87) },
    },
  };
}

// =============================================================================
// Appointments (entry point, linked to Profile)
// =============================================================================

export function generateAppointmentData(
  profile: GeneratedProfile
): BoardGenResult {
  const language = faker.helpers.arrayElement(LANGUAGES);
  const [firstName, ...lastParts] = profile.name.split(" ");
  const lastName = lastParts.join(" ");

  return {
    name: profile.name,
    overrides: {
      status: { label: faker.helpers.arrayElement(APPOINTMENT_STATUSES) },
      consult_date: { date: generateDate(-90, -1) },
      first_name: firstName,
      last_name: lastName,
      phone: generatePhone(),
      email: profile.email,
      address: generateAddress(),
      language: { label: language },
      description: faker.lorem.sentence(),
    },
  };
}

// =============================================================================
// Jail Intakes (separate entry point)
// =============================================================================

export function generateJailIntakeData(
  profileName?: string
): BoardGenResult {
  const name = profileName ?? faker.person.fullName();
  const facility = faker.helpers.arrayElement(DETENTION_FACILITIES);

  return {
    name: `${name} - Jail Intake`,
    overrides: {
      status: { label: faker.helpers.arrayElement(["New", "Scheduled", "Completed", "No Show"]) },
      detention_facility: { label: facility },
      alien_number: faker.string.numeric(9),
      date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: "age" }).toISOString().split("T")[0],
      country_of_birth: faker.location.country(),
      intake_created: { date: generateDate(-30, -1) },
      consult_date: { date: generateDate(-14, 14) },
      language: { label: faker.helpers.arrayElement(LANGUAGES) },
      is_this_your_first_interaction_with_ice: { label: faker.helpers.arrayElement(["Yes", "No"]) },
      have_you_seen_an_immigration_judge: { label: faker.helpers.arrayElement(["Yes", "No"]) },
      have_you_ever_been_ordered_removed: { label: faker.helpers.arrayElement(["Yes", "No"]) },
      have_you_ever_been_arrested: { label: faker.helpers.arrayElement(["Yes", "No"]) },
      do_you_have_an_attorney: { label: "No" },
    },
  };
}
