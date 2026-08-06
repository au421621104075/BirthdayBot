const { getExpenses } = require("./sheets");

// Today's Report
async function getTodayReport(sock, msg) {
    try {

        const rows = await getExpenses();

        if (rows.length <= 1) {
            await sock.sendMessage(msg.key.remoteJid, {
                text: "No expenses found."
            });
            return;
        }

        const today = new Date().toLocaleDateString("en-GB");

        let total = 0;
        let report = "📊 Today's Expense Report\n\n";

        for (let i = 1; i < rows.length; i++) {

            const [id,date, time, amount, category, notes] = rows[i];

            if (date === today) {

                total += Number(amount);

                report +=
`📂 ${category}   📝 ${notes} ==>💰 ₹${amount}
`;
            }
        }

        report += "-------------------------\n";
        report += `💵 Total : ₹${total}`;

        await sock.sendMessage(msg.key.remoteJid, {
            text: report
        });

    } catch (err) {

        console.log(err);

        await sock.sendMessage(msg.key.remoteJid, {
            text: "Unable to generate today's report."
        });

    }
}

// Weekly Report
// Weekly Report
async function getWeeklyReport(sock, msg) {
    try {

        const rows = await getExpenses();

        if (rows.length <= 1) {
            await sock.sendMessage(msg.key.remoteJid, {
                text: "No expenses found."
            });
            return;
        }

        const today = new Date();

        // Monday of this week
        const firstDay = new Date(today);
        firstDay.setDate(today.getDate() - today.getDay() + 1);

        // Sunday of this week
        const lastDay = new Date(firstDay);
        lastDay.setDate(firstDay.getDate() + 6);

        let total = 0;
        let report = "📅 Weekly Expense Report\n\n";

        for (let i = 1; i < rows.length; i++) {

            const [id,date, time, amount, category, notes] = rows[i];

            const [day, month, year] = date.split("/");

            const expenseDate = new Date(year, month - 1, day);

            if (expenseDate >= firstDay && expenseDate <= lastDay) {

                total += Number(amount);

                report +=
`📅 ${date}    📂 ${category}   📝${notes} ==> 💰 ₹${amount}
`;
            }
        }

        report += "--------------------------\n";
        report += `💵 Weekly Total : ₹${total}`;

        await sock.sendMessage(msg.key.remoteJid, {
            text: report
        });

    } catch (err) {

        console.log(err);

        await sock.sendMessage(msg.key.remoteJid, {
            text: "Unable to generate weekly report."
        });

    }
}

// Monthly Report
// Monthly Report
async function getMonthlyReport(sock, msg) {

    try {

        const rows = await getExpenses();

        if (rows.length <= 1) {
            await sock.sendMessage(msg.key.remoteJid, {
                text: "No expenses found."
            });
            return;
        }

        const today = new Date();

        const currentMonth = today.getMonth() + 1;
        const currentYear = today.getFullYear();

        let total = 0;
        let report = "📊 Monthly Expense Report\n\n";

        for (let i = 1; i < rows.length; i++) {

            const [id,date, time, amount, category, notes] = rows[i];

            const [day, month, year] = date.split("/");

            if (
                Number(month) === currentMonth &&
                Number(year) === currentYear
            ) {

                total += Number(amount);

                report +=
`📅 ${date}
📂 ${category} ==> 💰 ₹${amount}
📝 ${notes}

`;
            }

        }

        report += "--------------------------\n";
        report += `💵 Monthly Total : ₹${total}`;

        await sock.sendMessage(msg.key.remoteJid, {
            text: report
        });

    } catch (err) {

        console.log(err);

        await sock.sendMessage(msg.key.remoteJid, {
            text: "Unable to generate monthly report."
        });

    }

}

module.exports = {
    getTodayReport,
    getWeeklyReport,
    getMonthlyReport
};