/**
 * Optional Google Apps Script starter for vendor/action follow-up reminders.
 *
 * EXPECTED SHEET: Action Tracker
 * Columns A:I: Initiative, Milestone, Owner, Due Date, Status, Priority,
 * Dependency, Evidence/Link, Notes.
 *
 * Safety: review the script, test on a copy, and explicitly authorize it before
 * use. It emails only the Owner email if column C contains an email address.
 * The portfolio workbook uses blank owners by default, so no emails are sent
 * until you populate owner emails and consciously run the function.
 */
function sendDueActionReminders() {
  const SHEET_NAME = 'Action Tracker';
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Missing sheet: ' + SHEET_NAME);

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sentCol = 11; // Optional column K: Reminder sent date; column J is the Flag formula
  if (sheet.getRange(1, sentCol).getValue() !== 'Reminder sent date') {
    sheet.getRange(1, sentCol).setValue('Reminder sent date');
  }

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const milestone = row[1];
    const ownerEmail = row[2];
    const dueDate = row[3];
    const status = String(row[4] || '').toLowerCase();
    const priority = row[5] || 'Unspecified';
    const reminderSent = sheet.getRange(i + 1, sentCol).getValue();

    if (!milestone || !ownerEmail || !String(ownerEmail).includes('@')) continue;
    if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) continue;
    if (status === 'done' || status === 'complete' || status === 'completed') continue;
    if (reminderSent) continue;

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const daysUntil = Math.round((due.getTime() - today.getTime()) / 86400000);
    if (daysUntil > 2) continue;

    const subject = (daysUntil === 0 ? 'Due today: ' : daysUntil < 0 ? 'Overdue: ' : 'Due soon: ') + milestone;
    const body = [
      'Hello,',
      '',
      'This is an action-tracker reminder.',
      'Initiative: ' + (row[0] || 'Not specified'),
      'Milestone: ' + milestone,
      'Due date: ' + Utilities.formatDate(due, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
      'Priority: ' + priority,
      'Status: ' + (row[4] || 'Not started'),
      'Dependency: ' + (row[6] || 'None listed'),
      'Evidence/link: ' + (row[7] || 'Not provided'),
      '',
      'Please update the tracker when the action is complete.',
      '',
      'Sent by a user-configured Google Sheets reminder script.'
    ].join('\n');

    MailApp.sendEmail(String(ownerEmail), subject, body);
    sheet.getRange(i + 1, sentCol).setValue(new Date());
  }
}
