const LRU = require("lru-cache"); // No `.default` needed

const blacklistCache = new LRU.LRUCache({
  // Use `LRUCache` instead of `new LRU()`
  max: 1000, // Store up to 1000 items
  ttl: 1000 * 60 * 60, // Expire items after 1 hour
});

module.exports = blacklistCache;
