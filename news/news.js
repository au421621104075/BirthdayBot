const Parser = require("rss-parser");

const parser = new Parser();

const newsFeeds = {

    tamil: "https://news.google.com/rss/search?q=Tamil%20Nadu&hl=ta&gl=IN&ceid=IN:ta",

    india: "https://news.google.com/rss/search?q=India&hl=en-IN&gl=IN&ceid=IN:en",

    world: "https://news.google.com/rss/search?q=World%20News&hl=en-IN&gl=IN&ceid=IN:en",

    sports: "https://news.google.com/rss/search?q=Sports&hl=en-IN&gl=IN&ceid=IN:en",

    cinema: "https://news.google.com/rss/search?q=Tamil%20Cinema&hl=ta&gl=IN&ceid=IN:ta",

    technology: "https://news.google.com/rss/search?q=Technology&hl=en-IN&gl=IN&ceid=IN:en",

    business: "https://news.google.com/rss/search?q=Business&hl=en-IN&gl=IN&ceid=IN:en"
};


// Get news from RSS
async function getNews(category) {

    try {

        const feedUrl = newsFeeds[category];

        if (!feedUrl) {

            return [];

        }

        const feed = await parser.parseURL(feedUrl);

        return feed.items.slice(0, 5);

    } catch (error) {

        console.log("News Error:", error.message);

        return [];

    }

}


module.exports = {
    getNews
};