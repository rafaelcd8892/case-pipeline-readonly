// =============================================================================
// Fernando QUEZADA CEBALLOS — Notes-intensive real profile fixture
// =============================================================================
// Auto-generated from data/samples/profile-fernando_quezada_ceballos.json
// 42-B COR case, 50 court case updates + replies, address changes, fee K

import type { Database } from "bun:sqlite";

const ID = {
  profile: "fixture-fernando-profile",
  apptM: "fixture-fernando-appt-m",
  apptLB: "fixture-fernando-appt-lb",
  feeK: "fixture-fernando-feek",
  courtCase: "fixture-fernando-courtcase",
  addrChange: "fixture-fernando-addrchange",
};

export function seedFernando(db: Database, batchId: number): void {
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

  // Profile
  insertProfile.run(
    batchId,
    ID.profile,
    "Fernando QUEZADA CEBALLOS",
    "fernandoquezada1965@gmail.com",
    "816-547-2302",
    "Active Client. 42-B COR case. DMS #18112. A#076-237-761.",
    "2026-03-19",
    "High",
    "2547 Cherry St. Apartment B, Kansas City, MO 64108",
    "{\"case_type\":{\"label\":\"42-B COR\"},\"status\":{\"label\":\"Active Client\"},\"country_of_birth\":\"\",\"date_of_birth\":\"10/16/1965\",\"a_number\":\"076237761\",\"dms_number\":\"18112\",\"attorney\":{\"label\":\"Michael Sharma-Crawford\"}}"
  );

  // Appointment M
  insertBoardItem.run(
    batchId, ID.apptM, "appointments_m", "Past Consults",
    "Fernando QUEZADA CEBALLOS", "To be rescheduled", null, "M", ID.profile,
    "{\"status\":{\"label\":\"To be rescheduled\"}}"
  );
  insertRel.run(batchId, "board_items", ID.apptM, "profiles", ID.profile, "profile", "profiles");

  // Appointment LB
  insertBoardItem.run(
    batchId, ID.apptLB, "appointments_lb", "Past Consults",
    "Fernando QUEZADA CEBALLOS", "Hire", null, "LB", ID.profile,
    "{\"status\":{\"label\":\"Hire\"}}"
  );
  insertRel.run(batchId, "board_items", ID.apptLB, "profiles", ID.profile, "profile", "profiles");

  // Fee K
  insertContract.run(
    batchId, ID.feeK, ID.profile,
    "Fernando QUEZADA CEBALLOS",
    "Motion", 850, "FQ-42B-2023", "Not going forward",
    "{\"contract_stage\":{\"label\":\"Not going forward\"},\"contract_for\":{\"labels\":[\"Motion\"]},\"af\":\"850\",\"attorney\":{\"label\":\"Michael Sharma-Crawford\"},\"paralegal\":{\"label\":\"Luis Morales\"}}"
  );
  insertRel.run(batchId, "contracts", ID.feeK, "profiles", ID.profile, "profile", "link_to_profiles");

  insertUpdate.run(
    batchId,
    "fixture-fernando-feek-update-1",
    ID.profile,
    null,
    "fee_ks",
    "Luis Morales",
    "receptionist02@sharma-crawford.com",
    "Contract for Motion to Set for Trial ready for review, @Lucy Betteridge , FEE K'S",
    "<p>﻿Contract for Motion to Set for Trial ready for review, <a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32109233-lucy-betteridge\" data-mention-type=\"User\" data-mention-id=\"32109233\" target=\"_blank\" rel=\"noopener noreferrer\">@Lucy Betteridge</a>﻿ ﻿, ﻿<a href=\"https://sharmacrawford.sharepoint.com/:f:/s/scalefiles/EqPetlVb9JVQmEHrCKUi2DgBokUgEWRWu4INRlJh9Vun9g?e=XrTl3X\" target=\"_blank\" rel=\"noopener noreferrer\">FEE K'S</a>﻿﻿﻿</p>",
    "update",
    null,
    "2025-10-24T18:50:52.000Z"
  );

  // Court Case
  insertBoardItem.run(
    batchId, ID.courtCase, "court_cases", "Court Case",
    "LB - Fernando QUEZADA CEBALLOS [A076-237-761]", "Set for Hearing", "2026-03-19", "LB", ID.profile,
    "{\"status\":{\"label\":\"Set for Hearing\"},\"x_next_hearing_date\":{\"date\":\"2026-03-19\"},\"judge\":\"Jayme Salinardi\",\"tags\":{\"labels\":[\"E42B\"]},\"hearing_type\":{\"label\":\"MCH\"},\"attorney\":{\"label\":\"Lucy Betteridge\"},\"paralegal\":{\"label\":\"Mayra Ruiz\"}}"
  );
  insertRel.run(batchId, "board_items", ID.courtCase, "profiles", ID.profile, "profile", "profiles");
  insertRel.run(batchId, "board_items", ID.courtCase, "contracts", ID.feeK, "fee_k", "link_to_fee_ks");

  // Court case updates (50 updates)
  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-1",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Its confirmed, since all 4 MCHs on 3/19/26 are w Salinardi, M will take all 4 in the AM - VIA WEBEX DA lets make sure all notices of webex are filed pls (Im 99.9% sure they are but just in case)\n\n&&& FA KV can we pls notify clients to come to the office IN THE AM\n\nso the 2 in the afternoon will need to show up at 8am",
    "<p>Its confirmed, since all 4 MCHs on 3/19/26 are w Salinardi, M will take all 4 in the AM - VIA WEBEX DA lets make sure all notices of webex are filed pls (Im 99.9% sure they are but just in case)<br><br>&amp;&amp;&amp; FA  KV can we pls notify clients to come to the office IN THE AM<br><br>so the 2 in the afternoon will need to show up at 8am</p>",
    "update",
    null,
    "2026-02-12T23:02:41.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-2",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Per LT, eserviced E33\n\nAsked @Quynh Vo to pls take to court\n\n2-6-26 - E33 F. QUEZADA _ eservice.pdf",
    "<p>﻿Per LT, eserviced E33 </p><p>﻿Asked <a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/72064715-quynh-vo\" data-mention-type=\"User\" data-mention-id=\"72064715\" target=\"_blank\" rel=\"noopener noreferrer\">@Quynh Vo</a>﻿ ﻿to pls take to court </p><p>﻿﻿﻿<a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/2742279109/2-6-26%20-%20E33%20F.%20QUEZADA%20_%20eservice.pdf\" target=\"_blank\" data-asset_id=\"2742279109\" rel=\"noopener noreferrer\">2-6-26 - E33 F. QUEZADA _ eservice.pdf</a>﻿</p>",
    "update",
    null,
    "2026-02-06T20:53:25.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-3",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "@David Arterburn this one doesnt pop up on WHs ECAS, can we pls file E28 for him ",
    "<p><a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/79964547-david-arterburn\" data-mention-type=\"User\" data-mention-id=\"79964547\" target=\"_blank\" rel=\"noopener noreferrer\">@David Arterburn</a> ﻿this one doesnt pop up on WHs ECAS, can we pls file E28 for him ﻿</p>",
    "update",
    null,
    "2026-01-26T15:50:12.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-4",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "MASTER CALENDAR HEARING\n\n**Back from OFF DOCKET**\n\nDate: Thursday, March 19, 2026\n\nTime: 1:00PM\n\nJudge: Salinardi\n\nMethod: In Person\n\n\n\nIC - HEARING NOTICE - 3-19-26 (KCMO) - Fernando QUEZADA-CEBALLOS.pdf",
    "<p><strong><span style=\"font-size:32px;color:rgb(0, 133, 255)\" data-redactor-style-cache=\"font-size: 32px; color: rgb(0, 133, 255);\">﻿MASTER CALENDAR HEARING </span></strong></p><p><strong><span style=\"color:rgb(252, 184, 0)\" data-redactor-style-cache=\"color: rgb(252, 184, 0);\">﻿**Back from  OFF DOCKET** </span></strong></p><p>﻿<strong>Date</strong>: Thursday, March 19, 2026</p><p>﻿<strong>Time</strong>: 1:00PM </p><p>﻿<strong>Judge</strong>: Salinardi</p><p>﻿<strong>Method</strong>: In Person </p><p>﻿﻿﻿</p><p>﻿﻿﻿<a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/2292392015/IC%20-%20HEARING%20NOTICE%20-%203-19-26%20%28KCMO%29%20-%20Fernando%20QUEZADA-CEBALLOS.pdf\" target=\"_blank\" data-asset_id=\"2292392015\" rel=\"noopener noreferrer\">IC - HEARING NOTICE - 3-19-26 (KCMO) - Fernando QUEZADA-CEBALLOS.pdf</a>﻿</p>",
    "update",
    null,
    "2025-07-16T17:05:00.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-4-1",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Court Calendar Bot APP 11:53 AM\nHi. LB - IN PERSON MASTER: Fernando QUEZADA-CEBALLOS [A076-237-761] has been successfuly added to the calendar:\n\nHearing Date: 03-19-2026 at 01:00 PM\n\nMaster Fees: 02-20-2026\n\nInitial Meeting: 12-17-2025\n\nPlease check calendar\n\n07/16/25 11:53AM",
    "<p>Court Calendar Bot <strong>APP</strong> <a href=\"https://scaal.slack.com/archives/C092DU6JZ6G/p1752684825601159\" target=\"_blank\" rel=\"noopener noreferrer\">11:53 AM</a><br>Hi. LB - IN PERSON MASTER: Fernando QUEZADA-CEBALLOS [A076-237-761] has been successfuly added to the calendar:</p><p>Hearing Date: 03-19-2026 at 01:00 PM</p><p>Master Fees: 02-20-2026</p><p>Initial Meeting: 12-17-2025</p><p>Please check calendar</p><p>07/16/25 11:53AM</p>",
    "reply",
    "fixture-fernando-cc-update-4",
    "2025-07-16T17:50:39.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-4-2",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "@David Diaz Montenegro pls schedule them for a follow up to discuss case being placed back on docket. & pls remember to come back on this note & confirm once scheduled. 🙏\n\n\nP.S. If I remember correctly, this guy was hard to get a hold of. So our paper trail of notes are especially important for these people. They will be needed if we have to WD from the case. ",
    "<p><a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/72945186-david-diaz-montenegro\" data-mention-type=\"User\" data-mention-id=\"72945186\" target=\"_blank\" rel=\"noopener noreferrer\">@David Diaz Montenegro</a> ﻿pls schedule them for a follow up to discuss case being placed back on docket. &amp; pls remember to come back on this note &amp; confirm once scheduled. 🙏<br>﻿<br>﻿<br>﻿P.S. If I remember correctly, this guy was hard to get a hold of. So our paper trail of notes are especially important for these people. They will be needed if we have to WD from the case. ﻿</p>",
    "reply",
    "fixture-fernando-cc-update-4",
    "2025-07-18T14:58:01.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-4-3",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "David Diaz Montenegro",
    "david@sharma-crawford.com",
    "Done,  this was scheduled for August 18th at 1 pm.",
    "<p>﻿Done, ﻿ this was scheduled for August 18th at 1 pm.  </p>",
    "reply",
    "fixture-fernando-cc-update-4",
    "2025-07-24T22:01:49.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-4-4",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "needs correction on calendar @David Arterburn ",
    "<p>﻿needs correction on calendar <a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/79964547-david-arterburn\" data-mention-type=\"User\" data-mention-id=\"79964547\" target=\"_blank\" rel=\"noopener noreferrer\">@David Arterburn</a>﻿ ﻿﻿﻿﻿﻿</p><img src=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/2581720231/big-image.png\" data-asset_id=\"2581720231\" >",
    "reply",
    "fixture-fernando-cc-update-4",
    "2025-11-26T17:27:01.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-4-5",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "David Arterburn",
    "d.arterburn@sharma-crawford.com",
    "fixed @Mayra Ruiz ",
    "<p>﻿fixed <a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32109227-mayra-ruiz\" data-mention-type=\"User\" data-mention-id=\"32109227\" target=\"_blank\" rel=\"noopener noreferrer\">@Mayra Ruiz</a>﻿ ﻿﻿</p>",
    "reply",
    "fixture-fernando-cc-update-4",
    "2025-11-26T19:27:46.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-5",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Laura Torres",
    "laura@sharma-crawford.com",
    "Paylink for ext letter: https://secure.lawpay.com/pages/scal/operating?reference=Attorneys%20fee%20EAD%20Extension%20Letter%20-%20Fernando%20Quezada&readOnlyFields=reference&amount=25",
    "<p>Paylink for ext letter: <a href=\"https://secure.lawpay.com/pages/scal/operating?reference=Attorneys%20fee%20EAD%20Extension%20Letter%20-%20Fernando%20Quezada&amp;readOnlyFields=reference&amp;amount=25\" target=\"_blank\" rel=\"noopener noreferrer\">https://secure.lawpay.com/pages/scal/operating?reference=Attorneys%20fee%20EAD%20Extension%20Letter%20-%20Fernando%20Quezada&amp;readOnlyFields=reference&amp;amount=25</a></p> <p><br></p>",
    "update",
    null,
    "2024-09-19T23:18:21.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-6",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "I met with him with AA interpreting. He's not the brightest man, so I kept it pretty simple. Let case go off docket, once VAWA granted we file for summary grant. He needs EAD letter for $25.00. He filed to renew his I-765 one day before it expired so he gets a little extension.",
    "<p>I met with him with AA interpreting. He's not the brightest man, so I kept it pretty simple. Let case go off docket, once VAWA granted we file for summary grant. He needs EAD letter for $25.00. He filed to renew his I-765 one day before it expired so he gets a little extension.</p>",
    "update",
    null,
    "2024-09-18T20:57:31.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-7",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Fernando Ayala",
    "fernandoav812@outlook.com",
    "Client requested a EAD extension letter today in appt with LB, entry created in non forms cases.",
    "<p>﻿Client requested a EAD extension letter today in appt with LB, entry created in non forms cases.</p>",
    "update",
    null,
    "2024-09-18T20:47:15.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-8",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Luis Morales",
    "receptionist02@sharma-crawford.com",
    "I scheduled him for Wednesday, September 18, 2024, at 2:30 PM, as he is currently out of town and may have difficulty attending the appointment this Friday.",
    "<p>I scheduled him for Wednesday, September 18, 2024, at 2:30 PM, as he is currently out of town and may have difficulty attending the appointment this Friday.</p>",
    "update",
    null,
    "2024-09-11T18:11:32.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-9",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Received TODD notice dated 8/30/24 via mail on 9/10/24\n\nApp: E42B + VAWA? I360 Prima Facie Determination dated 8/30/24\nFamily: USC Spouse + USC kid born 01/28/1998\nHearing: INDIV w Salinardi on 02/09/2026 at 1pm\n\nCriminal: Looks like he does have crim but Im unsure of what it is rn.\nOpp Deadline: 10/29/24\n\nSide Note: MTN to AC submitted 8/14/24\n\nIntent to take of Notice 08.30.24 - Fernando QUEZADA-CEBALLOS.pdf",
    "<p>﻿Received TODD notice dated 8/30/24 via mail on 9/10/24</p><p><strong>App</strong>: E42B + VAWA? I360 Prima Facie Determination dated 8/30/24<br><strong>Family: </strong>USC Spouse + USC kid born 01/28/1998<br><strong>Hearing: </strong>﻿INDIV w Salinardi on 02/09/2026 at 1pm </p><p><strong>Criminal: </strong>﻿Looks like he does have crim but Im unsure of what it is rn. <br><strong>Opp Deadline: </strong>10/29/24</p><p><strong>﻿Side Note: </strong>MTN to AC submitted 8/14/24 </p><p>﻿﻿﻿<a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/1667654741/Intent%20to%20take%20of%20Notice%2008.30.24%20-%20Fernando%20QUEZADA-CEBALLOS.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Intent to take of Notice 08.30.24 - Fernando QUEZADA-CEBALLOS.pdf</a>﻿</p>",
    "update",
    null,
    "2024-09-11T16:32:11.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-9-1",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "@Luis Morales @Jocelyn Johnson @Karina BRAVO ZAMORA pls call & schedule for Friday at 2pm ",
    "<p><a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/54131744-luis-morales\" data-mention-type=\"User\" data-mention-id=\"54131744\" target=\"_blank\" rel=\"noopener noreferrer\">@Luis Morales</a> ﻿<a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/56964190-jocelyn-johnson\" data-mention-type=\"User\" data-mention-id=\"56964190\" target=\"_blank\" rel=\"noopener noreferrer\">@Jocelyn Johnson</a>﻿ ﻿<a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/53856773-karina-bravo-zamora\" data-mention-type=\"User\" data-mention-id=\"53856773\" target=\"_blank\" rel=\"noopener noreferrer\">@Karina BRAVO ZAMORA</a>﻿ ﻿pls call &amp; schedule for Friday at 2pm ﻿﻿﻿</p>",
    "reply",
    "fixture-fernando-cc-update-9",
    "2024-09-11T16:32:45.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-10",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Luis Morales",
    "receptionist02@sharma-crawford.com",
    "Fernando called today. He would like to know if he has the option to travel to El Paso to visit his parents, as they are very old and he hasn't seen them in a long time. He wants to know if this could put him in trouble or if there is something he could request or apply for with us to be able to visit them. @Lucy Betteridge ",
    "<p>Fernando called today. He would like to know if he has the option to travel to El Paso to visit his parents, as they are very old and he hasn't seen them in a long time. He wants to know if this could put him in trouble or if there is something he could request or apply for with us to be able to visit them. <a href=\"https://scaltheclinic.monday.com/users/32109233-lucy-betteridge\" data-mention-type=\"User\" data-mention-id=\"32109233\" target=\"_blank\" rel=\"noopener noreferrer\">@Lucy Betteridge</a>﻿ ﻿﻿</p>",
    "update",
    null,
    "2024-07-02T16:00:27.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-10-1",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "He can if he does not cross the border. If he leaves, the will not let him back in the USA.",
    "<p>﻿He can if he does not cross the border. If he leaves, the will not let him back in the USA. </p>",
    "reply",
    "fixture-fernando-cc-update-10",
    "2024-07-02T17:37:42.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-10-2",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "The issue is that El Paso is within 100 miles of the US Border and there are a number of checkpoints down there for people driving. That is what he is asking about. He should bring his documents.",
    "<p>﻿The issue is that El Paso is within 100 miles of the US Border and there are a number of checkpoints down there for people driving. That is what he is asking about. He should bring his documents.</p>",
    "reply",
    "fixture-fernando-cc-update-10",
    "2024-07-02T19:12:35.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-10-3",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Luis Morales",
    "receptionist02@sharma-crawford.com",
    "I called Fernando back to give him the good news and he asked if he could have some issues due to his expired driver's license and EAD. He has already received a receipt for his EAD renewal. I asked if he had a passport, and he said yes, it is not expired. Is that enough for him to be able to visit his parents, or could he still have issues because of the expired IDs? I checked the TSA website, and it says that the passport should be valid, also the other IDs if they haven't been expired for more than one year, but I wanted to make sure.",
    "<p>I called Fernando back to give him the good news and he asked if he could have some issues due to his expired driver's license and EAD. He has already received a receipt for his EAD renewal. I asked if he had a passport, and he said yes, it is not expired. Is that enough for him to be able to visit his parents, or could he still have issues because of the expired IDs? I checked the TSA website, and it says that the passport should be valid, also the  other IDs if they haven't been expired for more than one year, but I wanted to make sure.</p>",
    "reply",
    "fixture-fernando-cc-update-10",
    "2024-07-02T18:41:53.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-11",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Luis Arellano",
    "luis@sharma-crawford.com",
    "Client signed and for EAD Contract (AF 500 + FF 410 + PF 100) = $1,010 Cash. Also paid for address change $25 Cash. @Laura Torres",
    "<p>Client signed and for EAD Contract (AF 500 + FF 410 + PF 100) = $1,010 Cash. Also paid for address change $25 Cash. <a href=\"https://scaltheclinic.monday.com/users/32138066-laura-torres\" data-mention-type=\"User\" data-mention-id=\"32138066\" target=\"_blank\" rel=\"noopener noreferrer\">@Laura Torres</a>﻿</p>",
    "update",
    null,
    "2023-12-11T22:34:35.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-12",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "MTAC DEINED ON 08/21/23\n\nWe need prima facie determination to redo, I believe.\n\nOrder of IJ 8.21.23-Fernando QUEZADA CEBALLOS.pdf",
    "<p>﻿MTAC DEINED ON 08/21/23 </p><p>We need prima facie determination to redo, I believe. </p><p>﻿﻿﻿<a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/1875236051/Order%20of%20IJ%208.21.23-Fernando%20QUEZADA%20CEBALLOS.pdf\" target=\"_blank\" data-asset_id=\"1875236051\" rel=\"noopener noreferrer\">Order of IJ 8.21.23-Fernando QUEZADA CEBALLOS.pdf</a>﻿</p>",
    "update",
    null,
    "2023-08-28T19:59:22.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-13",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "I did motion to admin close, placed it to go with court run tomorrow, E-serviced ICE.",
    "<p>I did motion to admin close, placed it to go with court run tomorrow, E-serviced ICE.</p>",
    "update",
    null,
    "2023-08-14T21:34:19.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-13-1",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "I was JUST about to ask you about this lol.",
    "<p>﻿I was JUST about to ask you about this lol.</p>",
    "reply",
    "fixture-fernando-cc-update-13",
    "2023-08-14T21:44:24.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-14",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "SCAL Team KV/NA",
    "scalteam@sharma-crawford.com",
    "Client paid for MTNTAC with cash.\n\n@Mayra Ruiz @Lucy Betteridge\n\nAF 750",
    "<p>Client paid for MTNTAC with cash. </p> <p><a href=\"https://scaltheclinic.monday.com/users/32109227-mayra-ruiz\" data-mention-type=\"User\" data-mention-id=\"32109227\" target=\"_blank\" rel=\"noopener noreferrer\">@Mayra Ruiz</a> <a href=\"https://scaltheclinic.monday.com/users/32109233-lucy-betteridge\" data-mention-type=\"User\" data-mention-id=\"32109233\" target=\"_blank\" rel=\"noopener noreferrer\">@Lucy Betteridge</a></p><p></p> <p>AF 750</p>",
    "update",
    null,
    "2023-08-11T23:12:09.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-15",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "@Laura Torres Can you make him a contract for $750.00 to do a motion to admin close, please? Thank you.",
    "<p><a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32138066-laura-torres\" data-mention-type=\"User\" data-mention-id=\"32138066\" target=\"_blank\" rel=\"noopener noreferrer\">@Laura Torres</a> ﻿Can you make him a contract for $750.00 to do a motion to admin close, please? Thank you.﻿</p>",
    "update",
    null,
    "2023-08-02T18:57:40.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-16",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "I met with him with MR Interpreting. He thought his VAWA was already approved for some reason? I was like no, I never told you that. We are waiting for your VAWA to be approved, if they approve your VAWA the DHS has to agree that you have been a victim of spousal abuse.\n\nSo I told him that we can try to admin close his case now if he wants to take it off the docket for 2026, and he can continue to renew his EAD.\n\nTold him once the VAWA is approved he can file a motion to recalendar his case because only the immigration judge can grant him his LPR card because he's 212(a)(9)(C).\n\nTold him we charge $750.00 to file the motion with the court.\n\nWe need to make him a contract and get him a link\n\nReminded him again that processing times for VAWA is 36 months.\n\nAlso one of his ex-wife's friends reached out to him about how terrible she was. I was like great keep that in mind in case we get an RFE, we'll ask her to write a statement.",
    "<p>I met with him with MR Interpreting. He thought his VAWA was already approved for some reason? I was like no, I never told you that. We are waiting for your VAWA to be approved, if they approve your VAWA the DHS has to agree that you have been a victim of spousal abuse. </p> <p>So I told him that we can try to admin close his case now if he wants to take it off the docket for 2026, and he can continue to renew his EAD. </p> <p>Told him once the VAWA is approved he can file a motion to recalendar his case because only the immigration judge can grant him his LPR card because he's 212(a)(9)(C). </p> <p>Told him we charge $750.00 to file the motion with the court.</p><p>﻿We need to make him a contract and get him a link</p><p>﻿Reminded him again that processing times for VAWA is 36 months.</p><p>﻿Also one of his ex-wife's friends reached out to him about how terrible she was. I ﻿was like great keep that in mind in case we get an RFE, we'll ask her to write a statement.</p>",
    "update",
    null,
    "2023-08-02T18:57:18.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-17",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Called client to schedule him to meet w LB to discuss MTNAC\n\n\n\nScheduled on 08/02/23 @ 1pm. KNOWS OVER THE PHONE. ",
    "<p>﻿Called client to schedule him to meet w LB to discuss MTNAC </p> <p><span data-redactor-style-cache=\"color: rgb(226, 68, 92);\" style=\"color: rgb(226, 68, 92);\">﻿</span></p> <p>Scheduled on 08/02/23 <span>@ 1pm. KNOWS OVER THE PHONE. </span>﻿</p>",
    "update",
    null,
    "2023-07-28T19:49:55.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-18",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "E-33 in court bin + E-serviced.\n\nCC in E-File + Drive\n\nE-33 - QUEZADA_ Fernado - FILING _ E-Service.pdf",
    "<p>﻿E-33 in court bin + E-serviced. </p><p>﻿CC in E-File + Drive﻿</p><p>﻿<a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/1875236046/E-33%20-%20QUEZADA_%20Fernado%20-%20FILING%20_%20E-Service.pdf\" target=\"_blank\" data-asset_id=\"1875236046\" rel=\"noopener noreferrer\">E-33 - QUEZADA_ Fernado - FILING _ E-Service.pdf</a>﻿</p>",
    "update",
    null,
    "2023-04-24T19:10:04.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-19",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "(UPCOMING) TRIALAssignee(s): lucy (admin), michael (admin)date_range02/09/2026access_time1:00 PM - 3:00 PMCreated by mayra on 04/14/2023\n\nIJ - SALINARDI, on cal.\n\nDEADLINES\n\nAll Evid: Updated App + Witness List due to IC\n\n* 15 Days: 11/24/25\n* OUR: 12/09/25\n* REAL: 01/09/26\nFEES\n\n* TP: 11/09/25\n* T: 01/09/26",
    "<p>(UPCOMING) TRIAL<strong>Assignee(s): </strong>lucy (admin), michael (admin)<em>date_range</em>02/09/2026<em>access_time</em>1:00 PM - 3:00 PMCreated by mayra on 04/14/2023</p><p>IJ - SALINARDI, on cal.</p> <p><strong>DEADLINES</strong></p> <p>All Evid: Updated App + Witness List due to IC</p> <ul><li>15 Days: 11/24/25</li><li>OUR: 12/09/25</li><li>REAL: 01/09/26</li></ul> <p><strong>FEES</strong></p> <ul><li>TP: 11/09/25</li><li>T: 01/09/26</li></ul> <p><br></p>",
    "update",
    null,
    "2023-04-14T17:25:46.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-20",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "CALL LOG:\n\nYN\n\n11:47\n\n(816) 547-2302\n\nFernando QUEZADA\n\n* You asked for too many things\n\n* I have nothing else\n\n* Would you see if that’s enough?\n\n* - Called him back, I need to see what we have & what we are missing. His ex-wife will make it impossible for him to get any other docs.",
    "<p>﻿CALL LOG:</p><table><tbody><tr><td><p dir=\"ltr\">YN</p></td><td><p dir=\"ltr\">11:47</p></td><td><p dir=\"ltr\">(816) 547-2302</p><p dir=\"ltr\">Fernando QUEZADA</p></td><td><ul><li dir=\"ltr\"><p dir=\"ltr\">You asked for too many things</p></li><li dir=\"ltr\"><p dir=\"ltr\">I have nothing else</p></li><li dir=\"ltr\"><p dir=\"ltr\">Would you see if that’s enough?</p></li><li dir=\"ltr\"><p dir=\"ltr\">- Called him back, I need to see what we have &amp; what we are missing. His ex-wife will make it impossible for him to get any other docs. </p></li></ul></td></tr></tbody></table>",
    "update",
    null,
    "2023-03-29T21:09:01.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-20-1",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "We need to start working on this we have the documents from this other filing. I have a therapy report for him documenting the abuse.",
    "<p>﻿We need to start working on this we have the documents from this other filing. I have a therapy report for him documenting the abuse. </p>",
    "reply",
    "fixture-fernando-cc-update-20",
    "2023-03-29T21:10:23.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-21",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Yuri Navarrete",
    "receptionist01@sharma-crawford.com",
    "@Lucy Betteridge \n\nFernando has sent some papers about his divorce for your review, and further consideration:\n\nFERNANDO 2.pdf\n\n20230320143948.pdf",
    "<p><a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32109233-lucy-betteridge\" data-mention-type=\"User\" data-mention-id=\"32109233\" target=\"_blank\" rel=\"noopener noreferrer\">@Lucy Betteridge</a> ﻿</p><p>﻿﻿Fernando has sent some papers about his divorce for your review, and further consideration:</p><p>﻿﻿﻿<a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/1875236043/FERNANDO%202.pdf\" target=\"_blank\" data-asset_id=\"1875236043\" rel=\"noopener noreferrer\">FERNANDO 2.pdf</a></p><p>﻿﻿﻿<a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/1875236048/20230320143948.pdf\" target=\"_blank\" data-asset_id=\"1875236048\" rel=\"noopener noreferrer\">20230320143948.pdf</a>﻿</p>",
    "update",
    null,
    "2023-03-20T20:25:45.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-22",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Yuri Navarrete",
    "receptionist01@sharma-crawford.com",
    "@Laura Torres was this contract sent to Nick's email?",
    "<p><a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32138066-laura-torres\" data-mention-type=\"User\" data-mention-id=\"32138066\" target=\"_blank\" rel=\"noopener noreferrer\">@Laura Torres</a> ﻿was this contract sent to Nick's email?﻿</p>",
    "update",
    null,
    "2023-03-20T20:17:30.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-22-1",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Laura Torres",
    "laura@sharma-crawford.com",
    "yuri i haven't sent it yet, i haven't even created it",
    "<p>﻿yuri i haven't sent it yet, i haven't even created it </p>",
    "reply",
    "fixture-fernando-cc-update-22",
    "2023-03-20T20:18:39.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-23",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Jennifer Lopez de Gonzalez AKA JLO",
    "jennifer@theclinickc.org",
    "Fernando called and wanted to know if he can sign some kind of agreement with his \"ex-wife\" Told him LB cannot tell him if he should or should NOT sign without first understanding and seeing what it is that they want him to sign.\n\nHe wants to know how is it for VAWA per LB's notes \"I told him we charge $2000AF/$100 Postage for VAWA\" He now wants to know if he has a credit. I have confirmed he paid $535 FF + $100 Postage Fee - and it looks like he had a $150 credit that we never used. For when he is ready for VAWA he will need to pay $1,215.00. He is ready for Fee K please send to nick_moore8712@yahoo.com @Laura Torres ",
    "<p>Fernando called and wanted to know if he can sign some kind of agreement with his \"ex-wife\" Told him LB cannot tell him if he should or should NOT sign without first understanding and seeing what it is that they want him to sign.</p> <p>He wants to know how is it for VAWA per LB's notes \"I told him we charge $2000AF/$100 Postage for VAWA\" He now wants to know if he has a credit. I have confirmed he paid $535 FF + $100 Postage Fee - and it looks like he had a $150 credit that we never used. For when he is ready for VAWA he will need to pay $1,215.00. He is ready for Fee K please send to <a href=\"mailto:nick_moore8712@yahoo.com\" target=\"_blank\" rel=\"noopener noreferrer\">nick_moore8712@yahoo.com</a> <a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32138066-laura-torres\" data-mention-type=\"User\" data-mention-id=\"32138066\" target=\"_blank\" rel=\"noopener noreferrer\">@Laura Torres</a>﻿ ﻿﻿﻿</p>",
    "update",
    null,
    "2023-03-17T21:30:25.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-24",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "@Mayra Ruiz Let's reach back out to this guy and ask if he is ready to hire us to affirmatively file VAWA for him.",
    "<p><a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32109227-mayra-ruiz\" data-mention-type=\"User\" data-mention-id=\"32109227\" target=\"_blank\" rel=\"noopener noreferrer\">@Mayra Ruiz</a> ﻿Let's reach back out to this guy and ask if he is ready to hire us to affirmatively file VAWA for him.﻿</p>",
    "update",
    null,
    "2023-03-11T00:41:50.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-24-1",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "Yes call him and ask him where the fees are for VAWA cause he said he was going to hire us for it.",
    "<p>﻿Yes call him and ask him where the fees are for VAWA cause he said he was going to hire us for it. </p>",
    "reply",
    "fixture-fernando-cc-update-24",
    "2023-03-17T20:22:31.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-24-2",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "But then we decided to do VAWA instead, right? So he owes the remaining fees",
    "<p>﻿But then we decided to do VAWA instead, right? So he owes the remaining fees </p>",
    "reply",
    "fixture-fernando-cc-update-24",
    "2023-03-17T20:21:18.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-24-3",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Mayra RuizJan 9\n\nClient has PAID +$535 FF+ $100PF\n\n@Walter Taborda @Claudya Taborda sos this is an emergency as we need to do a MTC his trial.\n\n@Hilton Galyean will be scanning in evid received. JLO says its in expando & he's looking for it now.\n\n",
    "<img src=\"https://files.monday.com/use1/photos/32109227/thumb_small/32109227-user_photo_2022_07_15_13_46_30.png?1657892790\"> <p><a href=\"http://production-monday-app-active.monday:3000/users/32109227-mayra-ruiz\" target=\"_blank\" rel=\"noopener noreferrer\">Mayra Ruiz</a><a href=\"https://scaltheclinic.monday.com/boards/2947577874/pulses/3346788406/posts/1906772179\" target=\"_blank\" rel=\"noopener noreferrer\">Jan 9</a></p><p>Client has PAID +$535 FF+ $100PF</p> <p></p> <p><a href=\"https://scaltheclinic.monday.com/users/32109235-walter-taborda\" data-mention-type=\"User\" data-mention-id=\"32109235\" target=\"_blank\" rel=\"noopener noreferrer\">@Walter Taborda</a> <a href=\"https://scaltheclinic.monday.com/users/32109234-claudya-taborda\" data-mention-type=\"User\" data-mention-id=\"32109234\" target=\"_blank\" rel=\"noopener noreferrer\">@Claudya Taborda</a> sos this is an emergency as we need to do a MTC his trial.</p><p></p> <p></p> <p></p> <p><a href=\"https://scaltheclinic.monday.com/users/37163284-hilton-galyean\" data-mention-type=\"User\" data-mention-id=\"37163284\" target=\"_blank\" rel=\"noopener noreferrer\">@Hilton Galyean</a> will be scanning in evid received. JLO says its in expando &amp; he's looking for it now.</p><p>﻿</p>",
    "reply",
    "fixture-fernando-cc-update-24",
    "2023-03-17T20:20:47.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-24-4",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "LT found a payment for FF + PF for an I-130😶\n\nPAID +$535 AF + $100PF on 01/09/23\n\nPaid by Martha TAYLOR",
    "<p>﻿LT found a payment for FF + PF for an I-130😶</p><p>﻿PAID +$535 AF + $100PF on 01/09/23 </p><p>﻿Paid by Martha TAYLOR </p>",
    "reply",
    "fixture-fernando-cc-update-24",
    "2023-03-17T20:19:13.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-25",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "I met with Fernando speaking in English, but YN was in the background in case he needs an interpreter. Told him his case is continued to February 2026. I told him he should hire us to file VAWA within about 60 Days. I told him we charge $2000AF/$100 Postage for VAWA. Told him to talk to Nicholas Moore and tell him to write down everything that happened so that we can use that as an affidavit. Told him to keep in touch with Kathy Julio, she can help you write a personal statement for a VAWA filing.\n\nA few life updates for him. He is going to talk to an attorney to get divorced. Apparently his wife asked him for money to hire an attorney to get divorced. Kathy J. was like no, if she wants it let her pay for it. I was like that is right also even if you give her the money if she hires the attorney, they will see her as the client and they may not work for your best interest. If you want to get divorced talk to an attorney yourself and hire them, because then they are working in your best interest.\n\nAlso he says he plans to move from Arkansas. I told him to keep us informed, so we can update his address with the court etc. Also advised him that if he moves to MO he can file for divorce here after living here for 6 weeks. That might be preferable. He is looking at moving in May so that might be too long for him. According to him he is walking away from everything. I was like if you want to do that, you can probably just get divorced quickly in Arkansas. I think, however, that you probably technically have a marital interest in the property she purchased in Arkansas (even though her son owns the property, but it sounds like a classic straw man thing). It really depends on how much he wants to get into it, walking away might be smarter, but I'm not your family law attorney.\n\nAnyway he's going to hire us within 60 days to file affirmative VAWA and we should have enough time to get a response by the time that his next court date rolls around.",
    "<p>I met with Fernando speaking in English, but YN was in the background in case he needs an interpreter. Told him his case is continued to February 2026. I told him he should hire us to file VAWA within about 60 Days. I told him we charge $2000AF/$100 Postage for VAWA. Told him to talk to Nicholas Moore and tell him to write down everything that happened so that we can use that as an affidavit. Told him to keep in touch with Kathy Julio, she can help you write a personal statement for a VAWA filing. </p> <p>A few life updates for him. He is going to talk to an attorney to get divorced. Apparently his wife asked him for money to hire an attorney to get divorced. Kathy J. was like no, if she wants it let her pay for it. I was like that is right also even if you give her the money if she hires the attorney, they will see her as the client and they may not work for your best interest. If you want to get divorced talk to an attorney  yourself and hire them, because then they are working in your best interest.</p> <p>Also he says he plans to move from Arkansas. I told him to keep us informed, so we can update his address with the court etc. Also advised him that if he moves to MO he can file for divorce here after living here for 6 weeks. That might be preferable. He is looking at moving in May so that might be too long for him. According to him he is walking away from everything. I was like if you want to do that, you can probably just get divorced quickly in Arkansas. I think, however, that you probably technically have a marital interest in the property she purchased in Arkansas (even though her son owns the property, but it sounds like a classic straw man thing). It really depends on how much he wants to get into it, walking away might be smarter, but I'm not your family law attorney. </p> <p>Anyway he's going to hire us within 60 days to file affirmative VAWA and we should have enough time to get a response by the time that his next court date rolls around.</p>",
    "update",
    null,
    "2023-02-01T16:42:02.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-26",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "Your upcoming Individual hearing is on February 9, 2026 at 1:00 PM.JudgeSalinardi, JaymeCourt Address2345 GRAND BLVD., STE 525\nKANSAS CITY, MO 64108",
    "<p>Your upcoming <strong>Individual</strong> hearing is on <strong>February 9, 2026</strong> at <strong>1:00 PM</strong>.JudgeSalinardi, JaymeCourt Address2345 GRAND BLVD., STE 525<br>KANSAS CITY, MO 64108</p>",
    "update",
    null,
    "2023-02-01T15:57:36.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-27",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Deleted member",
    "32138054@deleted.user",
    "Sent a txt to Fernando, explaining he does not need to come to office on 02/21. We are keeping his appt for 02/01 at 10 am by phone with LB. I have cancelled the appt on 02/21.",
    "<p>Sent a txt to Fernando, explaining he does not need to come to office on 02/21. We are keeping his appt for 02/01 at 10 am by phone with LB. I have cancelled the appt on 02/21.</p>",
    "update",
    null,
    "2023-01-31T02:47:21.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-28",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Deleted member",
    "32138054@deleted.user",
    "01/30/23 LC: Call reminder, he aware appt is by phone. He asked about the appt he has for 02/21/23. I explained to him that we might need to have both appts because they're for different matters and the one for 02/21 is in person as per LB's notes. He understood.",
    "<p>01/30/23 LC: Call reminder, he aware appt is by phone. He asked about the appt he has for 02/21/23. I explained to him that we might need to have both appts because they're for different matters and the one for 02/21 is in person as per LB's notes. He understood.<br></p>",
    "update",
    null,
    "2023-01-30T20:01:53.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-28-1",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "This is incorrect. I don't know what notes you are referring to her but I would not have told him that I'm meeting with him in person and I have no idea why he has two appointments with me. Do not make this man drive her from Strawberry, Arkansas for an in person meeting that is not going to happen. Please check with me if you if you have questions.",
    "<p>﻿This is incorrect. I don't know what notes you are referring to her but I would not have told him that  I'm meeting with him in person and I ﻿have no idea why he has two appointments with me. Do not make this man drive her from Strawberry, Arkansas for an in person meeting that is not going to happen. Please check with me if you if you have questions. </p>",
    "reply",
    "fixture-fernando-cc-update-28",
    "2023-01-30T20:04:35.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-28-2",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Deleted member",
    "32138054@deleted.user",
    "Yes ma'am you're right. I read that on the cal entry for 02/21 and I read too fast. That's a note from Hilton when he scheduled the appt on 02/21. As I was not completely sure if he needed both appts, I explained to him that you will confirm/explain this at the appt on 02/01 which is by phone. Should I delete the appt for 02/21 and explain he only needs to attend the one on 02/01 by phone correct?",
    "<p>﻿Yes ma'am you're right. I read that on the cal entry for 02/21 and I read too fast. That's a note from Hilton when he scheduled the appt on 02/21. As I was not completely sure if he needed both appts, I explained to him that you will confirm/explain this at the appt on 02/01 which is by phone. Should I delete the appt for 02/21 and explain he only needs to attend the one on 02/01 by phone correct?</p>",
    "reply",
    "fixture-fernando-cc-update-28",
    "2023-01-30T23:50:32.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-28-3",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "Yeah that sounds right. Thanks.",
    "<p>﻿Yeah that sounds right. Thanks.</p>",
    "reply",
    "fixture-fernando-cc-update-28",
    "2023-01-31T00:07:04.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-29",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "@Michael Sharma-Crawford @Lucy Betteridge \n\n\n\nEOIR Auto Case Info doesnt show any future hearings for him. Maybe they're still searching for a date to reschedule?\n\n\n\nEOIR AUTO CASE INFO - QUEZADA_ Fernando.pdf",
    "<p><a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32109226-michael-sharma-crawford\" data-mention-type=\"User\" data-mention-id=\"32109226\" target=\"_blank\" rel=\"noopener noreferrer\">@Michael Sharma-Crawford</a> ﻿<a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32109233-lucy-betteridge\" data-mention-type=\"User\" data-mention-id=\"32109233\" target=\"_blank\" rel=\"noopener noreferrer\">@Lucy Betteridge</a>﻿ ﻿</p><p>﻿</p><p>﻿EOIR Auto Case Info doesnt show any future hearings for him. Maybe they're still searching for a date to reschedule?</p><p>﻿</p><p>﻿﻿﻿<a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/1875236030/EOIR%20AUTO%20CASE%20INFO%20-%20QUEZADA_%20Fernando.pdf\" target=\"_blank\" data-asset_id=\"1875236030\" rel=\"noopener noreferrer\">EOIR AUTO CASE INFO - QUEZADA_ Fernando.pdf</a>﻿</p>",
    "update",
    null,
    "2023-01-27T18:23:17.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-30",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Deleted member",
    "37163284@deleted.user",
    "I called Fernando to schedule a follow up to discuss i360 application per LB note below. He has been scheduled for 2/21 @ 930a",
    "<p>I called Fernando to schedule a follow up to discuss i360 application per LB note below. He has been scheduled for 2/21 @ 930a</p>",
    "update",
    null,
    "2023-01-25T22:20:45.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-31",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "Fernando and his friend/co-worker Nicholas came to court today but his hearing was postponed due to judge's illness.\n\nFernando is going to take steps to leave his spouse. I talked to him about making sure he has a witness to go with him to get stuff, steer clear of her, you don't want her to contact law enforcement and lie about you.\n\nFernando came to the office and I gave him a letter to give to his job about court.\n\nWe need to schedule a follow up with him to see about filing an I-360 with Vermont now while we can so the IJ doesn't have to make an abuse finding.\n\nHe wants to update his address to\n\nFernando Quezada, c/o\n\nNicholas Moore\n\n1117 County Road 263\n\nCash, AR 72421\n\nAlso he states that his email is broken and we shouldn't email anything to his wife. Nicholas Moore gave us his email address: nick_moore8712@yahoo.com\n\nI am updating it here and I have filled out a change of address form to file with the court. I have e-serviced ICE.",
    "<p>Fernando and his friend/co-worker Nicholas came to court today but his hearing was postponed due to judge's illness.</p> <p>Fernando is going to take steps to leave his spouse. I talked to him about making sure he has a witness to go with him to get stuff, steer clear of her, you don't want her to contact law enforcement and lie about you. </p> <p>Fernando came to the office and I gave him a letter to give to his job about court. </p> <p>We need to schedule a follow up with him to see about  filing an I-360 with Vermont now while we can so the IJ doesn't have to make an abuse finding. </p> <p>He wants to update his address to </p> <p>Fernando Quezada, c/o</p> <p>Nicholas Moore</p> <p>1117 County Road 263</p> <p>Cash, AR 72421</p> <p>Also he states that his email is broken and we shouldn't email anything to his wife. Nicholas Moore gave us his email address: nick_moore8712@yahoo.com</p> <p>I am updating it here and I have filled out a change of address form to file with the court. I have e-serviced ICE.</p>",
    "update",
    null,
    "2023-01-23T16:07:16.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-32",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "I received a therapy report from Kathy Julio. I have printed three copies for court tomorrow and I emailed a copy of it to Goodchild.",
    "<p>﻿I received a therapy report from Kathy Julio. I have printed three copies for court tomorrow and I emailed a copy of it to Goodchild. </p>",
    "update",
    null,
    "2023-01-23T00:00:35.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-33",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Trial file completed w Exh TOC. Put in LB's box.",
    "<p>﻿Trial file completed w Exh TOC. Put in LB's box. </p>",
    "update",
    null,
    "2023-01-20T22:21:16.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-34",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Completed MTN out of time - app updates.\n\nPut in court bin, E-serviced. Saved in e-file + cc drive. \n\nMTN ACCEPT OUT OF TIME - APP UPDATES - A076-237-761 QUEZADA CEBALLO_ Ferrnando - CC.pdf",
    "<p>﻿Completed MTN out of time - app updates. </p><p>﻿Put in court bin, E-serviced. Saved in e-file + cc drive. ﻿</p><p>﻿<a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/1875236027/MTN%20ACCEPT%20OUT%20OF%20TIME%20-%20APP%20UPDATES%20-%20A076-237-761%20QUEZADA%20CEBALLO_%20Ferrnando%20-%20CC.pdf\" target=\"_blank\" data-asset_id=\"1875236027\" rel=\"noopener noreferrer\">MTN ACCEPT OUT OF TIME - APP UPDATES - A076-237-761 QUEZADA CEBALLO_ Ferrnando - CC.pdf</a>﻿</p>",
    "update",
    null,
    "2023-01-20T21:17:41.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-35",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Talked to LB about the app edits, she said she would like for it to go today but if hes not available then Salinardi might be chill about us taking it to court w us.\n\n\n\nPut MTN accept out of time + witness list in bin for court run + E-serviced. Added CC to drive + saved in E-file.MTN ACCEPT OUT OF TIME - QUEZADA_ Fernando - CC.pdf\n\nWITNESS LIST - QUEZADA_ Fernando - CC.pdf",
    "<p>Talked to LB about the app edits, she said she would like for it to go today but if hes not available then Salinardi might be chill about us taking it to court w us. </p><p>﻿</p><p>﻿﻿Put MTN accept out of time + witness list in bin for court run + E-serviced. Added CC to drive + saved in E-file.﻿﻿<a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/1875236026/MTN%20ACCEPT%20OUT%20OF%20TIME%20-%20QUEZADA_%20Fernando%20-%20CC.pdf\" target=\"_blank\" data-asset_id=\"1875236026\" rel=\"noopener noreferrer\">MTN ACCEPT OUT OF TIME - QUEZADA_ Fernando - CC.pdf</a></p><p> <a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/1875236032/WITNESS%20LIST%20-%20QUEZADA_%20Fernando%20-%20CC.pdf\" target=\"_blank\" data-asset_id=\"1875236032\" rel=\"noopener noreferrer\">WITNESS LIST - QUEZADA_ Fernando - CC.pdf</a>﻿﻿</p>",
    "update",
    null,
    "2023-01-17T20:59:07.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-36",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Finished off MTN to accept out of time for LB.\n\n\n\nCompleted app update sheet - called him to try & get info from him/get confirmation on some things. No answer, unable to leave VM.",
    "<p>﻿Finished off MTN to accept out of time for LB. </p><p>﻿</p><p>﻿Completed app update sheet - called him to try &amp; get info from him/get confirmation on some things. No answer, unable to leave VM. </p>",
    "update",
    null,
    "2023-01-17T19:55:28.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-37",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "@Lucy Betteridge did Kathy JULIO send you his therapy letter?",
    "<p><a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32109233-lucy-betteridge\" data-mention-type=\"User\" data-mention-id=\"32109233\" target=\"_blank\" rel=\"noopener noreferrer\">@Lucy Betteridge</a> ﻿did Kathy JULIO send you his therapy letter?﻿</p>",
    "update",
    null,
    "2023-01-17T18:05:27.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-37-1",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "I'm probably not going to get it until Friday. According to him he's meeting with her twice this week, and I think she has to meet with him a minimum of 3 times to write the letter.",
    "<p>﻿I'm probably not going to get it until Friday. According to him he's meeting with her twice this week, and I think she has to meet with him a minimum of 3 times to write the letter. </p>",
    "reply",
    "fixture-fernando-cc-update-37",
    "2023-01-17T18:06:15.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-38",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "I talked to Nicolas Moore who is his witness. He has known him for about a year. They are both maintenance people at the Pico Chicken plant. He has never met the wife. This is because he wife does not want to meet him. However, he has overheard many phone conversations they have had and looked at their text messages. He once went to their house when he learned that Fernando has been sleeping on the porch. When he got there all of Fernando's belongings were strewn around the yard. Allegedly she told him to talk to her 24 year old son who lives with him and he threw Fernando's belongings out in the yard. Nicholas helped him and took him to a hotel. He said he noticed the difference in Fernando immediately when he was able to get sleep and to have time to himself during the hotel stay. He says that she makes Fernando do work for her the moment he gets home and that she doesn't listen to any of his ideas or want him to get any help from anyone else. He says he specifically heard her say that \"no one cares about you, no one will help you.\"\n\nAccording to Nicolas, from what he knows, his wife is trying to keep Fernando's name off of property etc. She rages at Fernando but then tries to get him to come back because he is the only one working. He has heard about her taking $1000s of dollars from Fernando, who has also told me he had to get a separate account.\n\nWe need to make a witness list and add Nicholas Moore and state that he is going to testify about abuse that he has witnessed in their relationship. He will testify in English.",
    "<p>I talked to Nicolas Moore who is his witness. He has known him for about a year. They are both maintenance people at the Pico Chicken plant. He has never met the wife. This is because he wife does not want to meet him. However, he has overheard many phone conversations they have had and looked at their text messages. He once went to their house when he learned that Fernando has been sleeping on the porch. When he got there all of Fernando's belongings were strewn around the yard. Allegedly she told him to talk  to her 24 year old son who lives with him and he threw Fernando's belongings out in the yard. Nicholas helped him and took him to a hotel. He said he noticed the difference in Fernando immediately when he was able to get sleep and to have time to himself during the hotel stay. He says that she makes Fernando do work for her the moment he gets home and that she doesn't listen to any of his ideas or want him to get any help from anyone else. He says he specifically heard her say that \"no one cares about you, no one will help you.\"</p> <p>According to Nicolas, from what he knows, his wife is trying to keep Fernando's name off of property etc. She rages at Fernando but then tries to get him to come back because he is the only one working. He has heard about her taking $1000s of dollars from Fernando, who has also told me he had to get a separate account.</p> <p>We need to make a witness list and add Nicholas Moore and state that he is going to testify about abuse that he has witnessed in their relationship. He will testify in English.</p>",
    "update",
    null,
    "2023-01-17T17:56:54.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-39",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Cynthia de La Cruz",
    "cynthia@sharma-crawford.com",
    "FYI I just saw a pic of Fernando QUEZADA so I have worked on his case before, idk what is all going on but in the past the reason his wife wanted us to contact her with his case is cause he would always wait last minute and would suffer the consequences (one time he filed an EAD late). Idk if there is abuse or not but I believe he is not eligible for CVP. I believe he is 212a9c",
    "<p>FYI I just saw a pic of Fernando QUEZADA so I have worked on his case before, idk what is all going on but in the past the reason his wife wanted us to contact her with his case is cause he would always wait last minute and would suffer the consequences (one time he filed an EAD late). Idk if there is abuse or not but I believe he is not eligible for CVP. I believe he is 212a9c</p>",
    "update",
    null,
    "2023-01-13T22:29:51.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-40",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "SCAL Team KV/NA",
    "scalteam@sharma-crawford.com",
    "Called to have him pick up his EAD. He will try to come to the office after seeing Kathy Julio. If he doesn't get here tomorrow before 5, he will call back to go over shipping and payment.\n\nHe went on a bit of a rant of wife. Knows that Martha tried calling MR, upset at the whole therapist and help thing.",
    "<p>Called to have him pick up his EAD. He will try to come to the office after seeing Kathy Julio. If he doesn't get here tomorrow before 5, he will call back to go over shipping and payment.</p> <p>He went on a bit of a rant of wife. Knows that Martha tried calling MR, upset at the whole therapist and help thing.</p>",
    "update",
    null,
    "2023-01-12T16:34:18.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-41",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "VM:\n\nYN\n\n9:45\n\n(870) 528-6136\n\nMy name is Martha. I'm Fernando QUEZADA’s wife. I need to speak to MRy and I'd appreciate a call back. My number is 870-528-6136. Thank you.\"\n\n* Called back, no answer. VM box not set up. - MR 3:56\n\nI was a lil scared that she was going to yell at me bc we're tryna get her husband some help in THERAPY. Honestly she's probably angry at the fact that hes going to be traveling to KC to talk to the therapist.",
    "<p>﻿VM:</p><table><tbody><tr><td><p dir=\"ltr\">YN</p></td><td><p dir=\"ltr\">9:45</p></td><td><p dir=\"ltr\">(870) 528-6136</p></td><td><p dir=\"ltr\">My name is Martha. I'm Fernando QUEZADA’s wife. I need to speak to MRy and I'd appreciate a call back. My number is 870-528-6136. Thank you.\"</p><ul><li dir=\"ltr\"><p dir=\"ltr\">Called back, no answer. VM box not set up. - MR 3:56</p></li></ul></td></tr></tbody></table><p>﻿I was a lil scared that she was going to yell at me bc we're tryna get her husband some help in THERAPY. Honestly she's probably angry at the fact that hes going to be traveling to KC to talk to the therapist. </p>",
    "update",
    null,
    "2023-01-10T21:58:44.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-42",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Client called\n\nYN\n\n9:57\n\n(816) 547-2302\n\nFernando QUEZADA\n\nCalling in for MR\n\nHe says you told him he needed to call you about Kathy JULIO\n\nHe also wants you to know (through a tragic marriage story) that he does not have a bank account\n\nAre you open on Saturdays? No, we are not\n\nDo I need to take my wife to my appointment? There are no notes about bringing his wife to the appointment.\n\n- Per note below, LB was aware that they spoke yesterday.\n\nHe has an appt w her on Sat. He will be coming to KC to meet w her.\n\nRegarding the bank statement thing, I was like whos asking for this? He said \"un muchacho\" Ohh, WT. Yes, sorry scratch that. We're on plan B now that your wife is useless in this. He understood.\n\nAsked if wife needs to be on appt w LB on Monday. Uhm, no no. Just you.",
    "<p>﻿Client called </p> <table><tbody><tr><td><p dir=\"ltr\">YN</p></td><td><p dir=\"ltr\">9:57</p></td><td><p dir=\"ltr\">(816) 547-2302</p><p dir=\"ltr\">Fernando QUEZADA</p></td><td><p dir=\"ltr\">Calling in for MR</p><p dir=\"ltr\"> </p><p dir=\"ltr\">He says you told him he needed to call you about Kathy JULIO</p><p dir=\"ltr\">He also wants you to know (through a tragic marriage story) that he does not have a bank account</p><p dir=\"ltr\"> </p><p dir=\"ltr\">Are you open on Saturdays? No, we are not</p><p dir=\"ltr\">Do I need to take my wife to my appointment? There are no notes about bringing his wife to the appointment.</p></td></tr></tbody></table><p>- Per note below, LB was aware that they spoke yesterday. </p><p>﻿He has an appt w her on Sat. He will be coming to KC to meet w her. </p><p>﻿Regarding the bank statement thing, I was like whos asking for this? He said \"un muchacho\" Ohh, WT. Yes, sorry scratch that. We're on plan B now that your wife is useless in this. He understood. </p><p>﻿Asked if wife needs to be on appt w LB on Monday. Uhm, no no. Just you. </p>",
    "update",
    null,
    "2023-01-10T16:54:57.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-43",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "LB has contacted Kathy via email regarding client. So she should be expecting his call tomorrow..",
    "<p>﻿LB has contacted Kathy via email regarding client. So she should be expecting his call tomorrow.. </p>",
    "update",
    null,
    "2023-01-09T23:52:19.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-43-1",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Lucy Betteridge",
    "lucy@sharma-crawford.com",
    "She emailed me that he had already called and she thinks she can get a letter in time.",
    "<p>﻿She emailed me that he had already called and she thinks she can get a letter in time.</p>",
    "reply",
    "fixture-fernando-cc-update-43",
    "2023-01-10T00:11:24.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-44",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Per LB,\n\nHe needs a therapy letter like URGENTLY. We need to do MTC based on pending VAWA at this point.\n\nI asked Fernando WHYYYY his wife isnt willing to help. She doesnt give him reasons. She just wont give her info but shes wiling to sign forms. He says that wife told him LB said that was ok.\n\nI said \"No, thats incorrect. The attorney wouldnt agree to send a blank application.\" His wife is delusional. Shes no use.\n\n\n\nEmailed him Kathys info. He will do whatever it takes to get in to talk to her.",
    "<p>﻿Per LB, </p><p>﻿He needs a therapy letter like URGENTLY. We need to do MTC based on pending VAWA at this point. </p><p>﻿I asked Fernando WHYYYY his wife isnt willing to help. She doesnt give him reasons. She just wont give her info but shes wiling to sign forms. He says that wife told him LB said that was ok. </p><p>﻿I said \"No, thats incorrect. The attorney wouldnt agree to send a blank application.\" His wife is delusional. Shes no use. </p><p>﻿</p><p>﻿Emailed him Kathys info. He will do whatever it takes to get in to talk to her. </p>",
    "update",
    null,
    "2023-01-09T23:17:43.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-45",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "@Lucy Betteridge \n\nWT called him to get bios & the wife was basically like \"Im not giving you any of my info\".......",
    "<p><a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32109233-lucy-betteridge\" data-mention-type=\"User\" data-mention-id=\"32109233\" target=\"_blank\" rel=\"noopener noreferrer\">@Lucy Betteridge</a> ﻿</p><p>﻿WT called him to get bios &amp; the wife was basically like \"Im not giving you any of my info\"....... </p>",
    "update",
    null,
    "2023-01-09T23:05:38.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-46",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Mayra Ruiz",
    "mayra@sharma-crawford.com",
    "Client has PAID +$535 FF+ $100PF\n\n@Walter Taborda @Claudya Taborda sos this is an emergency as we need to do a MTC his trial.\n\n\n\nDeleted member will be scanning in evid received. JLO says its in expando & he's looking for it now. ",
    "<p>﻿Client has PAID +$535 FF+ $100PF </p> <p>﻿<a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32109235-walter-taborda\" data-mention-type=\"User\" data-mention-id=\"32109235\" target=\"_blank\" rel=\"noopener noreferrer\">@Walter Taborda</a>﻿ ﻿<a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32109234-claudya-taborda\" data-mention-type=\"User\" data-mention-id=\"32109234\" target=\"_blank\" rel=\"noopener noreferrer\">@Claudya Taborda</a>﻿ ﻿sos this is an emergency as we need to do a MTC his trial. </p> <p>﻿</p> <p>﻿<a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/37163284-hilton-galyean\" data-mention-type=\"User\" data-mention-id=\"37163284\" target=\"_blank\" rel=\"noopener noreferrer\">Deleted member</a>﻿ ﻿will be scanning in evid received. JLO says its in expando &amp; he's looking for it now. ﻿</p>",
    "update",
    null,
    "2023-01-09T20:59:11.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-reply-46-1",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Deleted member",
    "37163284@deleted.user",
    "Evidence is scanned in, moved to eFile and put in drive under Walter's folder.",
    "<p>﻿Evidence is scanned in, moved to eFile and put in drive under Walter's folder.</p>",
    "reply",
    "fixture-fernando-cc-update-46",
    "2023-01-09T21:27:15.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-47",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Yuri Navarrete",
    "receptionist01@sharma-crawford.com",
    "Client called in:\n\n* My name is Fernando Quezada and I would like to know if you received what I sent.\n\n* Yes, we have received your docs.\n\n* Well, I was talking to this young girl, Laura, and she told me that she was going to send me some links to pay.\n\n* Oh yes, We just sent it almost a minute ago. —checks his email— Yes, I got them. 535 and 100\n\n* Yes,sir. That is correct.\n\n* I want to pay.\n\n* Sure — I guide him through the process.\n\n* Wife takes the phone and says: Ok, I don't have money, I'm going to put them on monday because i have to go to the bank first.\n\nEnd of conversation",
    "<p>﻿Client called in:</p><ul><li dir=\"ltr\"><p dir=\"ltr\">My name is Fernando Quezada and I would like to know if you received what I sent. </p></li><li dir=\"ltr\"><p dir=\"ltr\">Yes, we have received your docs.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Well, I was talking to this young girl, Laura, and she told me that she was going to send me some links to pay.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Oh yes, We just sent it almost a minute ago. —checks his email— Yes, I got them. 535 and 100</p></li><li dir=\"ltr\"><p dir=\"ltr\">Yes,sir. That is correct.</p></li><li dir=\"ltr\"><p dir=\"ltr\">I want to pay.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Sure — I guide him through the process.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Wife takes the phone and says: Ok, I don't have money, I'm going to put them on monday because i have to go to the bank first.</p></li></ul><div>End of conversation</div>",
    "update",
    null,
    "2023-01-06T22:35:28.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-48",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Laura Torres",
    "laura@sharma-crawford.com",
    "Payment links sent to clients thru lawpay, sent with wife's email:\n\n\n\nhttps://secure.lawpay.com/pages/scal/operating?reference=Payment%20for%20Postage%20Fee%20I-130%20%2F...\n\nhttps://secure.lawpay.com/pages/scal/trust?reference=Payment%20for%20Filling%20Fees%20ONLY%20I-130%2...",
    "<p>Payment links sent to clients thru lawpay, sent with wife's email:</p><p>﻿</p><p><a href=\"https://secure.lawpay.com/pages/scal/operating?reference=Payment%20for%20Postage%20Fee%20I-130%20%2F%20Fernando%20QUEZADA%20&amp;readOnlyFields=reference&amp;amount=100\" target=\"_blank\" rel=\"noopener noreferrer\">https://secure.lawpay.com/pages/scal/operating?reference=Payment%20for%20Postage%20Fee%20I-130%20%2F...</a>﻿</p><p><br></p><p>﻿﻿<a href=\"https://secure.lawpay.com/pages/scal/trust?reference=Payment%20for%20Filling%20Fees%20ONLY%20I-130%20%2F%20Fernando%20QUEZADA%20&amp;readOnlyFields=reference&amp;amount=535\" target=\"_blank\" rel=\"noopener noreferrer\">https://secure.lawpay.com/pages/scal/trust?reference=Payment%20for%20Filling%20Fees%20ONLY%20I-130%2...</a>﻿</p>",
    "update",
    null,
    "2023-01-06T22:19:49.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-49",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Yuri Navarrete",
    "receptionist01@sharma-crawford.com",
    "@Laura Torres  Signed xontract has been sent to recep01 email\n\nContract_I-130_-_Fernando_QUEZADA_CEBALLOS.pdf\n\n\n\n",
    "<p><a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/1875236011/Contract_I-130_-_Fernando_QUEZADA_CEBALLOS.pdf\" target=\"_blank\" data-asset_id=\"1875236011\" rel=\"noopener noreferrer\"></a><a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32138066-laura-torres\" data-mention-type=\"User\" data-mention-id=\"32138066\" target=\"_blank\" rel=\"noopener noreferrer\">@Laura Torres</a>﻿ ﻿ Signed xontract has been sent to recep01 email</p><p><a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/1875236011/Contract_I-130_-_Fernando_QUEZADA_CEBALLOS.pdf\" target=\"_blank\" data-asset_id=\"1875236011\" rel=\"noopener noreferrer\">﻿Contract_I-130_-_Fernando_QUEZADA_CEBALLOS.pdf</a></p><p>﻿</p><p>﻿</p>",
    "update",
    null,
    "2023-01-06T22:11:59.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-cc-update-50",
    ID.profile,
    ID.courtCase,
    "court_cases",
    "Laura Torres",
    "laura@sharma-crawford.com",
    "Sent contract + doc list again in english as per Fernando & wife's request:\n\nhttps://pipefile.com/request/b151d794f0944840918d321d3be70e10\n\n\n\nI had them on the phone and spoke to both of them, wife wanted to read docs needed for tyhe process and she doesn't speak english so had to creaate a new pipefile request in english and send it to them again. They were complaining about the docs too because they claim we should have all of the docs already. Told him ok we should have them we're gonna review them but we really need the K and the payment ASAP, they we're dowloading contract to sign it when call ended.",
    "<p>Sent contract + doc list again in english as per Fernando &amp; wife's request:</p> <p><br></p> <p><a href=\"https://pipefile.com/request/b151d794f0944840918d321d3be70e10\" target=\"_blank\" rel=\"noopener noreferrer\">https://pipefile.com/request/b151d794f0944840918d321d3be70e10</a></p><p>﻿</p><p>﻿I had them on the phone and spoke to both of them,  wife wanted to read docs needed for tyhe process and she doesn't speak english so had to creaate a new pipefile request in english and send it to them again. They were complaining about the docs too because they claim we should have all of the docs already. Told him ok we should have them we're gonna review them but we really need the K and the payment ASAP, they we're dowloading contract to sign it when call ended. </p>",
    "update",
    null,
    "2023-01-06T20:29:37.000Z"
  );

  // Address Change
  insertBoardItem.run(
    batchId, ID.addrChange, "address_changes", "Completed Changes of Address",
    "Fernando QUEZADA CEBALLOS", "Sent Out", null, null, ID.profile,
    "{\"status\":{\"label\":\"Sent Out\"}}"
  );
  insertRel.run(batchId, "board_items", ID.addrChange, "profiles", ID.profile, "profile", "profiles");

  // Address change updates (4)
  insertUpdate.run(
    batchId,
    "fixture-fernando-addr-update-1",
    ID.profile,
    ID.addrChange,
    "address_changes",
    "Monday.com Automation",
    "importantdocuments@sharma-crawford.com",
    "Outgoing Email\n\nFrom: scalteam@sharma-crawford.com\nTo: quynh@sharma-crawford.com\nSent At: Thursday, February 5th 2026, 10:36:18 UTC\nHey! Fernando QUEZADA CEBALLOS ADDRESS CHANGE has been set as PRINT AND SEND. Please proceed\n\nHey! Fernando QUEZADA CEBALLOS ADDRES CHANGE has been set as PRINT AND SEND.\nPlease proceed",
    "<br> <div><b><u>Outgoing Email</u></b></div><br> <br><br> <b>From: </b>scalteam@sharma-crawford.com<br> <b>To: </b>quynh@sharma-crawford.com<br> <b>Sent At: </b>Thursday, February 5th 2026, 10:36:18 UTC<br> <b><u>Hey! Fernando QUEZADA CEBALLOS ADDRESS CHANGE has been set as PRINT AND SEND. Please proceed </u></b><br><br>      Hey! Fernando QUEZADA CEBALLOS ADDRES CHANGE has been set as PRINT AND SEND.<br>Please proceed",
    "update",
    null,
    "2026-02-05T22:36:19.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-addr-update-2",
    ID.profile,
    ID.addrChange,
    "address_changes",
    "Laura Torres",
    "laura@sharma-crawford.com",
    "E33 signed by M, this is not ECAS so asked @David Arterburn and @Mayra Ruiz to help w E-service 02-05-26 EOIR-33 QUEZADA CEBALLOS.pdf",
    "<p>﻿E33 signed by M, this is not ECAS so asked <a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/79964547-david-arterburn\" data-mention-type=\"User\" data-mention-id=\"79964547\" target=\"_blank\" rel=\"noopener noreferrer\">@David Arterburn</a>﻿ and ﻿<a class=\"user_mention_editor router\" href=\"https://scaltheclinic.monday.com/users/32109227-mayra-ruiz\" data-mention-type=\"User\" data-mention-id=\"32109227\" target=\"_blank\" rel=\"noopener noreferrer\">@Mayra Ruiz</a>﻿ ﻿﻿to help w E-service <a href=\"https://scaltheclinic.monday.com/protected_static/12511907/resources/2739656669/02-05-26%20EOIR-33%20QUEZADA%20CEBALLOS.pdf\" target=\"_blank\" data-asset_id=\"2739656669\" rel=\"noopener noreferrer\">02-05-26 EOIR-33 QUEZADA CEBALLOS.pdf</a>﻿﻿</p>",
    "update",
    null,
    "2026-02-05T22:33:47.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-addr-update-3",
    ID.profile,
    ID.addrChange,
    "address_changes",
    "Laura Torres",
    "laura@sharma-crawford.com",
    "new address: 2547 Cherry St. Apartment B, Kansas City, MO 64108\n\nold address 7202 Olive St Kansas City, MO 64132",
    "<p>new address: 2547 Cherry St. Apartment B, Kansas City, MO 64108</p> <p>old address ﻿7202 Olive St Kansas City, MO 64132</p>",
    "update",
    null,
    "2026-02-05T17:20:35.000Z"
  );

  insertUpdate.run(
    batchId,
    "fixture-fernando-addr-update-4",
    ID.profile,
    ID.addrChange,
    "address_changes",
    "Claire McKeon",
    "claire@sharma-crawford.com",
    "new address: 2547 Cherry St. Apartment B, Kansas City, MO 64108\n\nhe paid for this in office via cash",
    "<p>﻿new address: ﻿2547 Cherry St. Apartment B, Kansas City, MO 64108</p><p>﻿he paid for this in office via cash</p>",
    "update",
    null,
    "2026-01-14T23:07:44.000Z"
  );

}
