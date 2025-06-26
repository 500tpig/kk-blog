const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  
  // Sets the download host for Puppeteer.
  downloadHost: 'https://npmmirror.com/mirrors',
  
  // Specifies a path to a browser executable to run instead of the bundled one.
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
}; 