// =============================================================================
// Real Profile Fixtures — Based on sampled Monday.com data
// =============================================================================
// These profiles are based on real data from data/samples/ and provide
// realistic test data for the 360 dashboard.

import type { Database } from "bun:sqlite";
import { seedFernando } from "./fernando";

// Deterministic IDs for fixture data (easily identifiable)
const ID = {
  // Profile 1: Ashik Dey RUPAK
  ashik: {
    profile: "fixture-ashik-profile",
    apptM: "fixture-ashik-appt-m",
    update1: "fixture-ashik-update-1",
    update2: "fixture-ashik-update-2",
    update3: "fixture-ashik-update-3",
  },
  // Profile 2: Jabez DARSI
  jabez: {
    profile: "fixture-jabez-profile",
    feeK: "fixture-jabez-feek",
    openForm: "fixture-jabez-openform",
    updateAuto: "fixture-jabez-update-auto",
    updateMention: "fixture-jabez-update-mention",
    updateReply: "fixture-jabez-update-reply",
  },
  // Profile 3: Karen MUNEVAR
  karen: {
    profile: "fixture-karen-profile",
    apptR: "fixture-karen-appt-r",
    updateConsult: "fixture-karen-update-consult",
  },
};

// =============================================================================
// Main entry point
// =============================================================================

export function seedRealProfiles(db: Database, batchId: number): number {
  const insertProfile = db.prepare(`
    INSERT INTO profiles (
      batch_id, local_id, name, email, phone, notes,
      next_interaction, priority, address, raw_column_values
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertContract = db.prepare(`
    INSERT INTO contracts (
      batch_id, local_id, profile_local_id, name,
      case_type, value, contract_id, status, raw_column_values
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertBoardItem = db.prepare(`
    INSERT INTO board_items (
      batch_id, local_id, board_key, group_title, name,
      status, next_date, attorney, profile_local_id, column_values
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertUpdate = db.prepare(`
    INSERT INTO client_updates (
      batch_id, local_id, profile_local_id, board_item_local_id, board_key,
      author_name, author_email, text_body, body_html,
      source_type, reply_to_update_id, created_at_source
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertRel = db.prepare(`
    INSERT OR IGNORE INTO item_relationships (
      batch_id, source_table, source_local_id,
      target_table, target_local_id,
      relationship_type, column_key
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  let count = 0;

  // =========================================================================
  // Profile 1: Ashik Dey RUPAK — Criminal Consequences consult
  // =========================================================================
  insertProfile.run(
    batchId,
    ID.ashik.profile,
    "Ashik Dey RUPAK",
    "ashikdeyrupak03@gmail.com",
    "660-229-3900",
    "F-1 international student from Bangladesh at Truman State. Charged with trespassing. Emergency consult with Michael.",
    "2026-03-01",
    "High",
    "1009 S Mulanix St Kirksville MO 63501",
    JSON.stringify({
      case_type: { label: "Criminal Consequences" },
      pronouns: { label: "He/Him" },
      country_of_birth: "Bangladesh",
      date_of_birth: "09/14/2002",
      attorney: { label: "Michael Sharma-Crawford" },
    })
  );
  count++;

  // Appointment on appointments_m board
  insertBoardItem.run(
    batchId,
    ID.ashik.apptM,
    "appointments_m",
    "Past Consults",
    "Ashik Dey RUPAK",
    "No Hire",
    "2026-02-16",
    "M",
    ID.ashik.profile,
    JSON.stringify({
      status: { label: "No Hire" },
      consult_date: { date: "2026-02-16", time: "17:00" },
      consult_type: { label: "Zoom" },
      country_of_birth: "Bangladesh",
      date_of_birth: "09/14/2002",
      phone: "660-229-3900",
      email: "ashikdeyrupak03@gmail.com",
      address: "1009 S Mulanix St Kirksville MO 63501",
      attorney: { label: "Michael Sharma-Crawford" },
      consult_notes: "Feb 16, 2026, 3:00 PM\nMichael Sharma-Crawford\n30 min\n\nCharged with tresspassing not an issue\nbut waiting on OPT or CPT could it result in discretionary denial yes\ncould it cause issues renewing a visa overseas yes\nprobably not re-entering the US because not inadm or remo\nhas pub defender - she needs to contact me - mspd\nhas already been through school disciplinary process and is ok with school\nschool does nto know he was charged need to let them know to see if they will seek to dismiss\nunk who actually authorized charges\nlots of hypothetical questions\nlots of questions for pub defender",
    })
  );

  insertRel.run(batchId, "board_items", ID.ashik.apptM, "profiles", ID.ashik.profile, "profile", "profiles");

  // Updates on the appointment
  insertUpdate.run(
    batchId,
    ID.ashik.update1,
    ID.ashik.profile,
    ID.ashik.apptM,
    "appointments_m",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Scheduled by CD\n\nEmergency Appt\n\nZoom: https://us06web.zoom.us/j/82460300845\n\nDocs: RUPAK, Ashik Dey\n\nDetails:\n\nHi,\n\nThank you for confirming the emergency consultation on Monday. I am an F-1 international student from Bangladesh, currently studying Computer Science at Truman State University. I am scheduled for a consultation at 2:00 PM on Monday, and I am sending the requested documents ahead of time for your review. Attached are my immigration documents and the criminal charge documents related to my case.\n\nPlease let me know if you need anything else before the appointment.\n\nThank you,\nAshik Dey Rupak",
    '<p>Scheduled by CD</p><p>Emergency Appt</p><p>Zoom: <a href="https://us06web.zoom.us/j/82460300845" target="_blank">https://us06web.zoom.us/j/82460300845</a></p><p>Docs: RUPAK, Ashik Dey</p><p><strong>Details:</strong></p><p>Hi,</p><p>Thank you for confirming the emergency consultation on Monday. I am an F-1 international student from Bangladesh, currently studying Computer Science at Truman State University.</p><p>Please let me know if you need anything else before the appointment.</p><p>Thank you,<br>Ashik Dey Rupak</p>',
    "update",
    null,
    "2026-02-16T16:14:09.000Z"
  );

  insertUpdate.run(
    batchId,
    ID.ashik.update2,
    ID.ashik.profile,
    ID.ashik.apptM,
    "appointments_m",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "M has spoken to public defender",
    "<p>M has spoken to public defender</p>",
    "update",
    null,
    "2026-02-17T17:20:11.000Z"
  );

  insertUpdate.run(
    batchId,
    ID.ashik.update3,
    ID.ashik.profile,
    ID.ashik.apptM,
    "appointments_m",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Gave info to M via slack",
    "<p>Gave info to M via slack</p>",
    "update",
    null,
    "2026-02-17T15:14:23.000Z"
  );

  // =========================================================================
  // Profile 2: Jabez DARSI — File Copy with Fee K + Open Forms
  // =========================================================================
  insertProfile.run(
    batchId,
    ID.jabez.profile,
    "Jabez DARSI",
    "gobarbiswa@gmail.com",
    "913-563-2242",
    null,
    null,
    "Medium",
    null,
    JSON.stringify({})
  );
  count++;

  // Fee K: File Copy, $50
  insertContract.run(
    batchId,
    ID.jabez.feeK,
    ID.jabez.profile,
    "Jabez DARJI [file copy]",
    "File Copy",
    50,
    "FC-2025-1013",
    "Create Project",
    JSON.stringify({
      contract_stage: { label: "Create Project" },
      contract_for: { labels: ["File Copy"] },
      af: "50",
      attorney: { label: "Michael Sharma-Crawford" },
      paralegal: { label: "Luis Morales" },
      hire_date: { date: "2025-10-13" },
      payment_date: { date: "2025-10-16" },
      paid_date: { date: "2025-10-16" },
      sent_to_paralegal: { date: "2025-10-17" },
    })
  );

  // Relationship: contract → profile
  insertRel.run(batchId, "contracts", ID.jabez.feeK, "profiles", ID.jabez.profile, "profile", "link_to_profiles");

  // Open Forms board item
  insertBoardItem.run(
    batchId,
    ID.jabez.openForm,
    "_cd_open_forms",
    "Filed",
    "Jabez DARJI [file copy]",
    "Sent Out",
    "2025-10-17",
    "M",
    ID.jabez.profile,
    JSON.stringify({
      status: { label: "Sent Out" },
      project_status: { label: "Sent Out" },
      tags: { labels: ["FileCopy"] },
      attorney: { label: "Michael Sharma-Crawford" },
      paralegal: { label: "Natalia Arellano" },
      target_date: { date: "2025-10-17" },
      date_filed: { date: "2025-10-17" },
      rfe_flag: { label: "No" },
    })
  );

  insertRel.run(batchId, "board_items", ID.jabez.openForm, "profiles", ID.jabez.profile, "profile", "profiles");
  insertRel.run(batchId, "board_items", ID.jabez.openForm, "contracts", ID.jabez.feeK, "fee_k", "link_to_fee_ks");

  // Update on Fee K: automated email (creator=null in real data)
  insertUpdate.run(
    batchId,
    ID.jabez.updateAuto,
    ID.jabez.profile,
    null, // Fee K updates don't link to board_items, they're contract-level
    "fee_ks",
    "Monday.com Automation",
    "importantdocuments@sharma-crawford.com",
    "Outgoing Email\n\nFrom: importantdocuments@sharma-crawford.com\nTo: natalia@sharma-crawford.com\nSent At: Friday, October 17th 2025, 7:36:14 UTC\nJabez DARJI [file copy]'s status changed to OPEN E-FILE!\n\nHi! Jabez DARJI [file copy] has paid for his contract. check if needs to open\ne-file",
    '<br><div><b><u>Outgoing Email</u></b></div><br><br><b>From: </b>importantdocuments@sharma-crawford.com<br><b>To: </b>natalia@sharma-crawford.com<br><b>Sent At: </b>Friday, October 17th 2025, 7:36:14 UTC<br><b><u>Jabez DARJI [file copy]\'s status changed to OPEN E-FILE!</u></b><br><br>Hi! Jabez DARJI [file copy] has paid for his contract. check if needs to open<br>e-file',
    "update",
    null,
    "2025-10-17T19:36:15.000Z"
  );

  // Update on Open Forms: @mention + reply thread
  insertUpdate.run(
    batchId,
    ID.jabez.updateMention,
    ID.jabez.profile,
    ID.jabez.openForm,
    "_cd_open_forms",
    "Cynthia de La Cruz",
    "cynthia@sharma-crawford.com",
    "@Natalia Arellano Did you send this file copy/ ?",
    '<p><a class="user_mention_editor" href="#">@Natalia Arellano</a> Did you send this file copy/ ?</p>',
    "update",
    null,
    "2025-10-28T22:54:52.000Z"
  );

  insertUpdate.run(
    batchId,
    ID.jabez.updateReply,
    ID.jabez.profile,
    ID.jabez.openForm,
    "_cd_open_forms",
    "Natalia Arellano",
    "natalia@sharma-crawford.com",
    "@Cynthia de La Cruz Yes, I did. I forgot to CC you. Sent on 10/17/25",
    '<p><a class="user_mention_editor" href="#">@Cynthia de La Cruz</a> Yes, I did. I forgot to CC you. Sent on 10/17/25</p>',
    "reply",
    ID.jabez.updateMention,
    "2025-10-29T14:09:23.000Z"
  );

  // =========================================================================
  // Profile 3: Karen MUNEVAR — Detained, Habeas consult
  // =========================================================================
  insertProfile.run(
    batchId,
    ID.karen.profile,
    "Karen MUNEVAR (Detained at Karnes City)",
    "macnursick@yahoo.com",
    "(817) 470-7700",
    "Detained at Karnes City. VD case, was originally paroled then rearrested. Pending I-130.",
    null,
    "Urgent",
    null,
    JSON.stringify({
      case_type: { label: "Habeas" },
      country_of_birth: "Colombia",
      date_of_birth: "04/28/1995",
      a_number: "249128408",
      attorney: { label: "Rekha Sharma-Crawford" },
      secondary_email: "jaimelsolomon@aol.com",
      secondary_phone: "Jaime (917) 402-2291",
    })
  );
  count++;

  // Appointment on appointments_r board
  insertBoardItem.run(
    batchId,
    ID.karen.apptR,
    "appointments_r",
    "Past Consults",
    "Karen MUNEVAR (Detained at Karnes City)",
    "No Hire",
    "2026-02-02",
    "R",
    ID.karen.profile,
    JSON.stringify({
      status: { label: "No Hire" },
      consult_date: { date: "2026-02-02", time: "13:30" },
      country_of_birth: "Colombia",
      date_of_birth: "04/28/1995",
      a_number: "249128408",
      phone: "(817) 470-7700",
      email: "macnursick@yahoo.com",
      attorney: { label: "Rekha Sharma-Crawford" },
    })
  );

  insertRel.run(batchId, "board_items", ID.karen.apptR, "profiles", ID.karen.profile, "profile", "profiles");

  // Long consult note by Rekha
  insertUpdate.run(
    batchId,
    ID.karen.updateConsult,
    ID.karen.profile,
    ID.karen.apptR,
    "appointments_r",
    "Rekha Sharma-Crawford",
    "rekha@sharma-crawford.com",
    "Client is in custody with VD. She had been paroled into the US and then rearrested. It could have been a habeas. But now has VD. The husband works for Tesla and is thinking about moving to Colombia. Was here as a J-1 but not subject to the 2-year foreign residency requirement.\n\nWent over the pending I-130, converting it to a CVP, the time delays, bona fides and went over the whole process. They said they had no more questions.",
    "<p>Client is in custody with VD. She had been paroled into the US and then rearrested. It could have been a habeas. But now has VD. The husband works for Tesla and is thinking about moving to Colombia. Was here as a J-1 but not subject to the 2-year foreign residency requirement.</p><p></p><p>Went over the pending I-130, converting it to a CVP, the time delays, bona fides and went over the whole process. They said they had no more questions.</p>",
    "update",
    null,
    "2026-02-02T20:18:55.000Z"
  );

  // =========================================================================
  // Profile 4: Fernando QUEZADA CEBALLOS — Notes-intensive 42-B COR case
  // =========================================================================
  seedFernando(db, batchId);
  count++;

  console.log(`  Seeded ${count} real profiles (Ashik, Jabez, Karen, Fernando) with board items and updates`);
  return count;
}
