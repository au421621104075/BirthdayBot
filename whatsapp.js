const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason
} = require("@whiskeysockets/baileys");
const handleCommand = require("./commands");

const qrcode = require("qrcode-terminal");

async function startWhatsApp() {

    const { state, saveCreds } = await useMultiFileAuthState("./auth");

    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        auth: state,
        version
    });

    // Show bot replies in terminal
const originalSendMessage = sock.sendMessage.bind(sock);

sock.sendMessage = async (jid, content, options) => {

    if (content?.text) {
        console.log("🤖 Bot Reply:", content.text);
    }

    return originalSendMessage(jid, content, options);
};

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ connection, qr, lastDisconnect }) => {

        if (qr) {
            console.log("📱 Scan this QR Code:");
            qrcode.generate(qr, { small: true });
        }

        if (connection === "open") {
            console.log("✅ WhatsApp Connected Successfully");
        }

        if (connection === "close") {

            console.log("❌ Connection Closed");

            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

            if (shouldReconnect) {

    console.log("🔄 Reconnecting...");

    setTimeout(() => {
        startWhatsApp()
        .catch(err => {
            console.log("Reconnect Error:", err);
        });

    }, 5000);

}
        }
    });
    // Message listener
sock.ev.on("messages.upsert", async ({ messages }) => {

    const msg = messages[0];

    if (!msg.message) return;

    // Get username
    const username = msg.pushName ;

    // Ignore messages without username
    if (!username) return;

    // Get phone number
    const phone =
        msg.key.participant || msg.key.remoteJid;

    const phoneNumber = phone.replace("@s.whatsapp.net", "");

    console.log("username :",username);
    console.log("phonenumber :",phoneNumber);

    // Check authorized username
const allowedUsername = process.env.ALLOWED_USERNAME || "";

if (
    !username ||
    username.trim().toLowerCase() !== allowedUsername.trim().toLowerCase()
) {
    console.log("❌ Unauthorized user:", username);
    return;
}

console.log("✅ Authorized user:", username);



    const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text;


    if (!text) return;


    console.log("Message :", text);
    await handleCommand(sock, msg, text,username,phoneNumber);



});


return sock;

}

module.exports = startWhatsApp;