const { addExpense } = require("./sheets");
const { updateExpense } = require("./sheets");

//add the expense commands
async function addExpenseCommand(sock, msg, message,username,phoneNumber) {
  try {
    // Remove the word "expense"
    const data = message.replace(/^expense\s+/i, "").trim();

    // Split by comma
    const parts = data.split(",");

    if (parts.length < 3) {
      await sock.sendMessage(msg.key.remoteJid, {
        text:
          "❌ Invalid format.\n\nUse this:\nexpense amount,Category,Notes",
      });
      return;
    }

    const amount = Number(parts[0].trim());
    const category = parts[1].trim();
    const notes = parts.slice(2).join(",").trim();

    if (isNaN(amount)) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Amount must be a number.",
      });
      return;
    }

    // Current Date & Time
    const now = new Date();

    const date = now.toLocaleDateString("en-GB");

    const time = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Save to Google Sheet
await addExpense(
    date,
    time,
    amount,
    category,
    notes,
    username,
    phoneNumber
);
    // Reply
    await sock.sendMessage(msg.key.remoteJid, {
      text:
`✅ Expense Added Successfully

📅 Date : ${date}
🕒 Time : ${time}

📂 Category : ${category}
📝 Notes : ${notes}

💰 Amount : ₹${amount}`,
    });

  } catch (error) {
    console.log(error);

    await sock.sendMessage(msg.key.remoteJid, {
      text: "❌ Failed to save expense.",
    });
  }
}



//update the commands
async function updateExpenseCommand(sock, msg, message) {

    const data = message.replace(/^update\s+/i, "").trim();

    const parts = data.split(",");

    if (parts.length < 4) {

        await sock.sendMessage(msg.key.remoteJid, {
            text: "Usage:\nupdate 2,700,Shopping,Nike Shoes"
        });

        return;
    }

    const id = parts[0].trim();
    const amount = Number(parts[1].trim());
    const category = parts[2].trim();
    const notes = parts.slice(3).join(",").trim();

    const updated = await updateExpense(id, amount, category, notes);

    if (updated) {

        await sock.sendMessage(msg.key.remoteJid, {
            text: "✅ Expense Updated Successfully"
        });

    } else {

        await sock.sendMessage(msg.key.remoteJid, {
            text: "❌ Expense ID Not Found"
        });

    }

}

module.exports = {
    addExpenseCommand,
    updateExpenseCommand
};