const scrapeModule = require('website-scraper');
const scrape = scrapeModule.default || scrapeModule;

const options = {
  urls: ['https://www.vectrfl.com/'],
  directory: 'd:/Vectrfl/fresh_clone',
  recursive: true,
  maxDepth: 2,
  ignoreErrors: true,
  urlFilter: function(url) {
    return url.indexOf('https://www.vectrfl.com') === 0;
  }
};

scrape(options).then((result) => {
    console.log("Successfully downloaded site");
}).catch((err) => {
    console.error("Error scraping site", err);
});
