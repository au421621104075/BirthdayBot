const { addExpenseCommand,updateExpenseCommand } = require("./expense");
const {
  getTodayReport,
  getWeeklyReport,
  getMonthlyReport,
} = require("./report");

async function handleExpenseCommand(sock, msg, message, username,phoneNumber) {
  if (message.toLowerCase().startsWith("expense")) {
    return await addExpenseCommand(sock, msg, message, username,phoneNumber);
  }
  if (message.toLowerCase().startsWith("update")) {
    return await updateExpenseCommand(sock, msg, message);
}

  if (message.toLowerCase() === "today") {
    return await getTodayReport(sock, msg);
  }

  if (message.toLowerCase() === "week") {
    return await getWeeklyReport(sock, msg);
  }

  if (message.toLowerCase() === "month") {
    return await getMonthlyReport(sock, msg);
  }
  
}

module.exports = {
  handleExpenseCommand,
};