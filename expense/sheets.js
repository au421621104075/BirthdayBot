require("dotenv").config();

const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = process.env.EXPENSE_SHEET;

// Add Expense
async function addExpense(date, time, amount, category, notes) {

      // Get existing expenses
    const expenses = await getExpenses();

    // Generate next ID
    const id = expenses.length; // Header is row 1

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:F`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[id,date, time, amount, category, notes]],
    },
  });
}

//update expense
async function updateExpense(id, amount, category, notes) {

    const rows = await getExpenses();

    for (let i = 1; i < rows.length; i++) {

        if (Number(rows[i][0]) === Number(id)) {

            await sheets.spreadsheets.values.update({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!A${i + 1}:F${i + 1}`,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [[
                        id,
                        rows[i][1], // Date
                        rows[i][2], // Time
                        amount,
                        category,
                        notes
                    ]]
                }
            });

            return true;
        }
    }

    return false;
}
// Get All Expenses
async function getExpenses() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:F`,
  });

  return response.data.values || [];
}

module.exports = {
    addExpense,
    getExpenses,
    updateExpense
};