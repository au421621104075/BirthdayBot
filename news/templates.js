async function shortURL(longURL) {

    try {

        const response = await fetch(
            `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longURL)}`
        );

        const shortUrl = await response.text();

        return shortUrl;

    } catch (error) {

        console.log("Short URL Error:", error.message);

        return longURL;

    }

}


async function formatNews(category, newsItems) {

    if (!newsItems || newsItems.length === 0) {

        return `❌ No ${category} news found.`;

    }

    let message = `📰 ${category.toUpperCase()} NEWS\n\n`;

    for (const [index, item] of newsItems.entries()) {

        message += `${index + 1}. ${item.title}\n`;

        if (item.link) {

            const shortLink = await shortURL(item.link);

            message += `🔗 ${shortLink}\n`;

        }

        message += `\n`;

    }

    return message;

}


module.exports = {
    formatNews
};