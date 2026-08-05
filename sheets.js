const { google } = require("googleapis");
require("dotenv").config();

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: [
        "https://www.googleapis.com/auth/spreadsheets"
    ]
});

const sheets = google.sheets({
    version: "v4",
    auth
});

const spreadsheetId = process.env.SPREADSHEET_ID;
const sheetName = process.env.SHEET_NAME;

async function addUser(user) {

    await sheets.spreadsheets.values.append({

        spreadsheetId,

        range: `${sheetName}!A:F`,

        valueInputOption: "RAW",

        requestBody: {

            values: [[

                user.name,

                user.date,

                user.month,

                user.year,

                user.relation,

                user.phone

            ]]
        }

    });

    console.log("User Added");
}

async function getUsers() {

    const response = await sheets.spreadsheets.values.get({

        spreadsheetId,

        range: `${sheetName}!A:F`

    });

    return response.data.values || [];

}

module.exports = {

    addUser,

    getUsers

};