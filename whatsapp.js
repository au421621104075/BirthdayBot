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


    const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text;


    if (!text) return;


    console.log("Message :", text);
    await handleCommand(sock, msg, text);



});


return sock;

}

module.exports = startWhatsApp;