function formatNews(category, newsItems) {

    if (!newsItems || newsItems.length === 0) {

        return `❌ No ${category} news found.`;

    }

    let message = `📰 ${category.toUpperCase()} NEWS\n\n`;

    newsItems.forEach((item, index) => {

        message += `${index + 1}. ${item.title}\n`;

        if (item.link) {

            message += `${item.link}\n`;

        }

        message += `\n`;

    });

    return message;
}


module.exports = {
    formatNews
};