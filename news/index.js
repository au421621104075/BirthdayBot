const { getNews } = require("./news");
const { formatNews } = require("./templates");


async function handleNewsCommand(sock, msg, message) {

    try {

        const parts = message.trim().split(/\s+/);

        const category = parts[1]
            ? parts[1].toLowerCase()
            : "tamil";

        const validCategories = [
            "tamil",
            "india",
            "world",
            "sports",
            "cinema",
            "tech",
            "technology",
            "business"
        ];


        if (!validCategories.includes(category)) {

            await sock.sendMessage(msg.key.remoteJid, {

                text:
`❌ Unknown news category.

Available:

news tamil
news india
news world
news sports
news cinema
news tech
news business`

            });

            return;
        }


        let actualCategory = category;

        if (category === "tech") {

            actualCategory = "technology";

        }


        await sock.sendMessage(msg.key.remoteJid, {

            text: "📰 Fetching latest news..."

        });


        const newsItems = await getNews(actualCategory);


        const formattedMessage =
            formatNews(actualCategory, newsItems);


        await sock.sendMessage(msg.key.remoteJid, {

            text: formattedMessage

        });


    } catch (error) {

        console.log("News Command Error:", error);

        await sock.sendMessage(msg.key.remoteJid, {

            text: "❌ Unable to fetch news right now."

        });

    }

}


module.exports = handleNewsCommand;