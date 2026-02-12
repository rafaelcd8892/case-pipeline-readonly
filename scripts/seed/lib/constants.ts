// =============================================================================
// Constants for Monday.com seeding
// =============================================================================

import { loadBoardsConfig } from "../../../lib/config";

// Board IDs - loaded from config/boards.yaml
export interface BoardIds {
  profilesBoardId: string;
  feeKsBoardId: string;
}

export async function loadBoardIds(): Promise<BoardIds> {
  const boards = await loadBoardsConfig();
  const profilesBoard = boards.profiles;
  const feeKsBoard = boards.fee_ks;

  if (!profilesBoard) {
    throw new Error("Missing 'profiles' board configuration in config/boards.yaml");
  }
  if (!feeKsBoard) {
    throw new Error("Missing 'fee_ks' board configuration in config/boards.yaml");
  }

  return {
    profilesBoardId: profilesBoard.id,
    feeKsBoardId: feeKsBoard.id,
  };
}

// Name generation data
export const FIRST_NAMES = [
  "James", "Maria", "Robert", "Linda", "Michael", "Barbara", "William", "Elizabeth",
  "David", "Jennifer", "Carlos", "Patricia", "Jose", "Susan", "Ahmed", "Sarah",
  "Wei", "Karen", "Raj", "Nancy", "Yuki", "Lisa", "Omar", "Margaret", "Ivan", "Rafael"
];

export const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson"
];

export const EMAIL_DOMAINS = [
  "gmail.com", "yahoo.com", "outlook.com", "company.com", "business.org"
];

// Monday.com column values

export interface CaseFee {
  caseType: string;
  fee: number;
}

/**
 * Case-fee schedule — each case type is paired with its fee.
 * Source: firm fee schedule spreadsheet.
 */
export const CASE_FEE_SCHEDULE: CaseFee[] = [
  // Address Changes
  { caseType: "Address Change (Immig Court)", fee: 25 },
  { caseType: "Address Change (U/T/VAWA/751)", fee: 25 },
  { caseType: "USCIS Address Change", fee: 25 },
  { caseType: "BIA Address Change", fee: 25 },

  // Affidavits & Appeals
  { caseType: "Affidavit", fee: 750 },
  { caseType: "BIA Appeal", fee: 5000 },
  { caseType: "Case Status Update", fee: 500 },
  { caseType: "Circuit Appeal", fee: 7500 },

  // Consular & Criminal
  { caseType: "Consular Processing", fee: 4000 },
  { caseType: "Criminal Consequence Letter", fee: 500 },

  // DACA
  { caseType: "DACA Renewal (not client)", fee: 800 },
  { caseType: "DACA Renewal (client)", fee: 800 },
  { caseType: "DACA Initial", fee: 3000 },
  { caseType: "Deferred Action (non DACA)", fee: 1000 },

  // DS-160 / EOIR
  { caseType: "DS-160 (NVC)", fee: 1500 },
  { caseType: "EOIR 42A (emergency)", fee: 3500 },
  { caseType: "EOIR 42A (non emergency)", fee: 2000 },
  { caseType: "EOIR 42B (emergency)", fee: 3500 },
  { caseType: "EOIR 42B (non emergency)", fee: 2000 },

  // Extensions & Misc
  { caseType: "EAD Extension Letters", fee: 25 },
  { caseType: "Extension I-539", fee: 800 },
  { caseType: "File Copy", fee: 50 },
  { caseType: "Fingerprints Only", fee: 25 },

  // FOIA
  { caseType: "FOIA (EOIR)", fee: 600 },
  { caseType: "FOIA (G639)", fee: 600 },
  { caseType: "FOIA (OBIM + FBI)", fee: 750 },

  // Full Packets
  { caseType: "Full Packet w/ Travel Doc", fee: 4000 },
  { caseType: "Full Packet", fee: 4000 },
  { caseType: "Full Packet (complex)", fee: 4500 },
  { caseType: "Full Packet (needs J5)", fee: 4300 },
  { caseType: "Full Packet (in proceedings)", fee: 4000 },
  { caseType: "Full Packet 245i (I-485A)", fee: 4300 },
  { caseType: "Full Packet (child under 14)", fee: 4000 },

  // I-129F
  { caseType: "I-129F (K-1)", fee: 3500 },
  { caseType: "I-129F (K-3)", fee: 3000 },

  // I-130
  { caseType: "I-130 (Online)", fee: 3000 },
  { caseType: "I-130 (Paper)", fee: 3000 },

  // I-131
  { caseType: "I-131", fee: 1000 },
  { caseType: "I-131 Re-entry Permit", fee: 900 },
  { caseType: "I-131 Travel Doc (Refugee)", fee: 900 },
  { caseType: "I-131 Travel Doc (Asylee/LPR)", fee: 900 },
  { caseType: "I-131 Advance Parole", fee: 1000 },
  { caseType: "I-131F Family/PP", fee: 3000 },
  { caseType: "I-131 PP (Military)", fee: 2500 },

  // I-539 / I-192 / I-212
  { caseType: "I-539 (Multi Status Change)", fee: 1000 },
  { caseType: "I-539 (Status Change)", fee: 1500 },
  { caseType: "I-192 (not U/T visa)", fee: 3500 },
  { caseType: "I-212", fee: 4000 },
  { caseType: "I-212 (form only)", fee: 1000 },
  { caseType: "I-290B", fee: 4800 },

  // I-485
  { caseType: "I-485 (Family Based)", fee: 3800 },
  { caseType: "I-485 (Adjustment in Court)", fee: 4500 },
  { caseType: "I-485 (Refugee/SIJ)", fee: 2800 },
  { caseType: "I-485 (Asylum)", fee: 2800 },
  { caseType: "I-485 (child under 14)", fee: 3800 },
  { caseType: "I-485 (U-Visa)", fee: 4000 },

  // I-589 / I-601
  { caseType: "I-589 (Asylum)", fee: 4000 },
  { caseType: "I-601", fee: 4000 },
  { caseType: "I-601 (EOIR)", fee: 5000 },
  { caseType: "I-601A Waiver", fee: 6000 },

  // I-730 / I-751
  { caseType: "I-730", fee: 3000 },
  { caseType: "I-751 (Removal of Conditions)", fee: 4000 },

  // I-765
  { caseType: "I-765 (online c08+c11)", fee: 800 },
  { caseType: "I-765 (c09, paid FF)", fee: 800 },
  { caseType: "I-765 (U visa c14/SIJ)", fee: 800 },
  { caseType: "I-765", fee: 800 },

  // I-824 / I-864 / I-881
  { caseType: "I-824", fee: 800 },
  { caseType: "I-864 (Affidavit of Support)", fee: 1500 },
  { caseType: "I-881", fee: 3000 },
  { caseType: "I-881 (EOIR)", fee: 8000 },

  // I-90 / I-944
  { caseType: "I-90", fee: 1000 },
  { caseType: "I-944 (or similar)", fee: 500 },

  // I-914 / I-918
  { caseType: "I-914/I-192 (T-Visa)", fee: 4500 },
  { caseType: "I-918/I-192 (U-Visa)", fee: 4500 },
  { caseType: "I-918/I-192 (U-Visa Complex)", fee: 6000 },
  { caseType: "I-918B", fee: 600 },
  { caseType: "I-929", fee: 3000 },

  // Infopass / Interviews
  { caseType: "Infopass (not our client)", fee: 500 },
  { caseType: "Interview (KC complex)", fee: 2000 },
  { caseType: "Interview (KC only)", fee: 900 },
  { caseType: "Interview (not our forms)", fee: 2800 },
  { caseType: "Interview (out of town)", fee: 2500 },
  { caseType: "Interview Prep", fee: 750 },
  { caseType: "Investigation Fee", fee: 750 },

  // Background Checks
  { caseType: "KBI Criminal History Check", fee: 35 },
  { caseType: "Lexis Criminal History Check", fee: 150 },
  { caseType: "Missouri Criminal History Check", fee: 25 },

  // Mandamus / Master Hearing
  { caseType: "Mandamus", fee: 7500 },
  { caseType: "Master Hearing", fee: 850 },
  { caseType: "Master Hearing (late hire)", fee: 1500 },
  { caseType: "Mendez-Rojas Motion", fee: 1500 },

  // Motions
  { caseType: "Motion to Consolidate", fee: 1500 },
  { caseType: "Motion to Admin Close", fee: 1500 },
  { caseType: "Motion to Reopen/Terminate", fee: 2000 },
  { caseType: "Motion for Bond (emergency)", fee: 5000 },
  { caseType: "Motion for Bond (non emergency)", fee: 3500 },
  { caseType: "Motion to Change Venue", fee: 3000 },
  { caseType: "Motion to Continue Master", fee: 1000 },
  { caseType: "Motion for VD for Crp", fee: 1000 },
  { caseType: "Motion to Set for Trial", fee: 1800 },
  { caseType: "Motion to Re-Open In-Absentia", fee: 5000 },

  // N-400 / N-600
  { caseType: "N-400", fee: 3000 },
  { caseType: "N-600 (complex)", fee: 4000 },
  { caseType: "N-600 (simple)", fee: 2500 },

  // NOID
  { caseType: "NOID (messy case)", fee: 4500 },
  { caseType: "NOID (simple)", fee: 3500 },

  // Misc Services
  { caseType: "NRC FOIA", fee: 800 },
  { caseType: "Office Visit", fee: 125 },
  { caseType: "Ombudsman Inquiry", fee: 800 },
  { caseType: "Oral Argument", fee: 3000 },
  { caseType: "PD Requests (Immig Court)", fee: 2000 },
  { caseType: "Postage (FedEx)", fee: 100 },
  { caseType: "Request to Schedule USCIS", fee: 800 },

  // RFE
  { caseType: "RFE (not our forms)", fee: 1500 },
  { caseType: "RFE", fee: 800 },
  { caseType: "RFE for U Visas", fee: 1500 },

  // SIJ / TPS
  { caseType: "SIJ (I-360)", fee: 1500 },
  { caseType: "TPS (initial/late initial)", fee: 2500 },
  { caseType: "TPS (EOIR)", fee: 1500 },
  { caseType: "TPS (renewal)", fee: 1000 },

  // Translations
  { caseType: "Translations (complex)", fee: 50 },
  { caseType: "Translations (simple)", fee: 20 },

  // Trial
  { caseType: "Trial", fee: 4500 },
  { caseType: "Trial Briefs (complex)", fee: 4800 },
  { caseType: "Trial Briefs/Motion to Terminate", fee: 4000 },
  { caseType: "Trial Prep", fee: 3500 },

  // VAWA
  { caseType: "VAWA (I-360)", fee: 3000 },
  { caseType: "VAWA Full Packet (I-360+I-485)", fee: 4000 },
];

// Derived arrays for backward compatibility
export const CASE_TYPES = CASE_FEE_SCHEDULE.map((c) => c.caseType);
export const CONTRACT_VALUES = [...new Set(CASE_FEE_SCHEDULE.map((c) => c.fee))].sort((a, b) => a - b);

export const PRIORITIES = ["High", "Medium", "Low", "No priority"];

export const CONTRACT_STATUSES = ["To be sent", "Sent", "Signed", "Paid"];

export const SAMPLE_NOTES = [
  "Initial consultation completed. Client is responsive and engaged.",
  "Awaiting documentation from client. Follow up scheduled.",
  "Case review in progress. Strong documentation provided.",
  "Client requested expedited timeline. Prioritizing accordingly.",
  "All paperwork received. Moving to next phase.",
  "Meeting scheduled to discuss strategy and next steps.",
  "Client has questions about timeline. Need to clarify expectations.",
];

// Default configuration
export const DEFAULT_CONFIG = {
  profileCount: 5,
  contractsPerProfile: { min: 1, max: 3 },
};

// =============================================================================
// Case Type → Board Mapping
// =============================================================================
// Maps each case type to the work board(s) it creates items on.
// Case types not in this map only generate a Fee K (standalone services).

export type BoardTarget =
  | "court_cases"
  | "_cd_open_forms"
  | "motions"
  | "appeals"
  | "foias"
  | "litigation"
  | "_lt_i918b_s";

/**
 * Maps case types to the board(s) they create entries on.
 * Motions always also create a court_cases entry.
 * Types not listed here are standalone (Fee K only, no work board).
 */
export const CASE_TYPE_BOARD_MAP: Record<string, BoardTarget[]> = {
  // Court Cases (EOIR / court representation)
  "EOIR 42A (emergency)": ["court_cases"],
  "EOIR 42A (non emergency)": ["court_cases"],
  "EOIR 42B (emergency)": ["court_cases"],
  "EOIR 42B (non emergency)": ["court_cases"],
  "I-589 (Asylum)": ["court_cases"],
  "I-601 (EOIR)": ["court_cases"],
  "I-881 (EOIR)": ["court_cases"],
  "TPS (EOIR)": ["court_cases"],
  "Master Hearing": ["court_cases"],
  "Master Hearing (late hire)": ["court_cases"],
  "Trial": ["court_cases"],
  "Trial Prep": ["court_cases"],
  "Trial Briefs (complex)": ["court_cases"],
  "Trial Briefs/Motion to Terminate": ["court_cases"],
  "Oral Argument": ["court_cases"],

  // Motions (always paired with court_cases)
  "Motion to Consolidate": ["motions", "court_cases"],
  "Motion to Admin Close": ["motions", "court_cases"],
  "Motion to Reopen/Terminate": ["motions", "court_cases"],
  "Motion for Bond (emergency)": ["motions", "court_cases"],
  "Motion for Bond (non emergency)": ["motions", "court_cases"],
  "Motion to Change Venue": ["motions", "court_cases"],
  "Motion to Continue Master": ["motions", "court_cases"],
  "Motion for VD for Crp": ["motions", "court_cases"],
  "Motion to Set for Trial": ["motions", "court_cases"],
  "Motion to Re-Open In-Absentia": ["motions", "court_cases"],
  "Mendez-Rojas Motion": ["motions", "court_cases"],

  // Open Forms (USCIS / NVC track)
  "Full Packet w/ Travel Doc": ["_cd_open_forms"],
  "Full Packet": ["_cd_open_forms"],
  "Full Packet (complex)": ["_cd_open_forms"],
  "Full Packet (needs J5)": ["_cd_open_forms"],
  "Full Packet (in proceedings)": ["_cd_open_forms"],
  "Full Packet 245i (I-485A)": ["_cd_open_forms"],
  "Full Packet (child under 14)": ["_cd_open_forms"],
  "I-129F (K-1)": ["_cd_open_forms"],
  "I-129F (K-3)": ["_cd_open_forms"],
  "I-130 (Online)": ["_cd_open_forms"],
  "I-130 (Paper)": ["_cd_open_forms"],
  "I-131": ["_cd_open_forms"],
  "I-131 Re-entry Permit": ["_cd_open_forms"],
  "I-131 Travel Doc (Refugee)": ["_cd_open_forms"],
  "I-131 Travel Doc (Asylee/LPR)": ["_cd_open_forms"],
  "I-131 Advance Parole": ["_cd_open_forms"],
  "I-131F Family/PP": ["_cd_open_forms"],
  "I-131 PP (Military)": ["_cd_open_forms"],
  "I-539 (Multi Status Change)": ["_cd_open_forms"],
  "I-539 (Status Change)": ["_cd_open_forms"],
  "I-192 (not U/T visa)": ["_cd_open_forms"],
  "I-212": ["_cd_open_forms"],
  "I-212 (form only)": ["_cd_open_forms"],
  "I-290B": ["_cd_open_forms"],
  "I-485 (Family Based)": ["_cd_open_forms"],
  "I-485 (Adjustment in Court)": ["_cd_open_forms", "court_cases"],
  "I-485 (Refugee/SIJ)": ["_cd_open_forms"],
  "I-485 (Asylum)": ["_cd_open_forms"],
  "I-485 (child under 14)": ["_cd_open_forms"],
  "I-485 (U-Visa)": ["_cd_open_forms"],
  "I-601": ["_cd_open_forms"],
  "I-601A Waiver": ["_cd_open_forms"],
  "I-730": ["_cd_open_forms"],
  "I-751 (Removal of Conditions)": ["_cd_open_forms"],
  "I-765 (online c08+c11)": ["_cd_open_forms"],
  "I-765 (c09, paid FF)": ["_cd_open_forms"],
  "I-765 (U visa c14/SIJ)": ["_cd_open_forms"],
  "I-765": ["_cd_open_forms"],
  "I-824": ["_cd_open_forms"],
  "I-864 (Affidavit of Support)": ["_cd_open_forms"],
  "I-881": ["_cd_open_forms"],
  "I-90": ["_cd_open_forms"],
  "I-944 (or similar)": ["_cd_open_forms"],
  "I-914/I-192 (T-Visa)": ["_cd_open_forms"],
  "I-918/I-192 (U-Visa)": ["_cd_open_forms"],
  "I-918/I-192 (U-Visa Complex)": ["_cd_open_forms"],
  "I-929": ["_cd_open_forms"],
  "N-400": ["_cd_open_forms"],
  "N-600 (complex)": ["_cd_open_forms"],
  "N-600 (simple)": ["_cd_open_forms"],
  "DACA Renewal (not client)": ["_cd_open_forms"],
  "DACA Renewal (client)": ["_cd_open_forms"],
  "DACA Initial": ["_cd_open_forms"],
  "Deferred Action (non DACA)": ["_cd_open_forms"],
  "DS-160 (NVC)": ["_cd_open_forms"],
  "Consular Processing": ["_cd_open_forms"],
  "EAD Extension Letters": ["_cd_open_forms"],
  "Extension I-539": ["_cd_open_forms"],
  "SIJ (I-360)": ["_cd_open_forms"],
  "TPS (initial/late initial)": ["_cd_open_forms"],
  "TPS (renewal)": ["_cd_open_forms"],
  "VAWA (I-360)": ["_cd_open_forms"],
  "VAWA Full Packet (I-360+I-485)": ["_cd_open_forms"],

  // Appeals (BIA)
  "BIA Appeal": ["appeals"],
  "Circuit Appeal": ["appeals"],

  // FOIAs
  "FOIA (EOIR)": ["foias"],
  "FOIA (G639)": ["foias"],
  "FOIA (OBIM + FBI)": ["foias"],
  "NRC FOIA": ["foias"],

  // Litigation
  "Mandamus": ["litigation"],

  // I918B
  "I-918B": ["_lt_i918b_s"],
};

// =============================================================================
// Board-Specific Domain Constants
// =============================================================================

export const HEARING_TYPES = ["Master", "Individual", "Bond", "Trial"];

export const RELIEF_TYPES = [
  "Asylum", "Withholding of Removal", "CAT",
  "Cancellation of Removal", "Voluntary Departure", "Adjustment of Status",
];

export const COURT_STATUSES = [
  "Active", "Pending", "Terminated",
  "Administratively Closed", "Appeal Pending",
];

export const OPEN_FORM_STATUSES = [
  "Not Started", "In Progress", "Forms Sent",
  "Filed", "Approved", "Denied", "RFE Received",
];

export const MOTION_TYPES = [
  "MTR", "MTA", "Motion for Bond", "Motion to Admin Close",
  "Motion to Change Venue", "Motion to Terminate",
];

export const APPEAL_STATUSES = [
  "Pending", "Brief Due", "Brief Filed", "Decision Pending", "Granted", "Denied",
];

export const FOIA_TYPES = ["EOIR", "G639", "OBIM", "FBI", "NRC"];

export const LANGUAGES = ["English", "Spanish"];

export const APPOINTMENT_STATUSES = [
  "Scheduled", "Completed", "No Show", "Cancelled", "Rescheduled",
];

export const NVC_NOTICE_TYPES = [
  "Priority Date Current", "Case Created", "Documentarily Qualified",
  "Interview Scheduled", "Case Complete", "Refused",
];

export const RECEIPT_TYPES = [
  "Receipt Notice", "Approval Notice", "EAD Card",
  "Green Card", "Combo Card", "Travel Document",
];

export const RFE_TYPES = [
  "Evidence", "Biometrics", "Medical", "Translation",
  "Financial", "Relationship", "General",
];

export const DETENTION_FACILITIES = [
  "CCA Leavenworth", "CoreCivic", "GEO Group",
  "Butler County Jail", "Platte County Jail",
];

export const ATTORNEY_BOARDS = [
  "appointments_r", "appointments_m", "appointments_lb", "appointments_wh",
] as const;
