const Hypercore = require("hypercore");
// Imports Hypercore, which provides an append-only log for distributed storage.

const Hyperbee = require("hyperbee");
// Imports Hyperbee, a key-value store built on top of Hypercore.

const hyperswarm = require("hyperswarm");
// Imports Hyperswarm, which handles peer-to-peer networking (discovery and replication).

const { hypercoreDataPath } = require("./env");
// Imports the hypercoreDataPath value from the environment configuration.

let db;
// Declares a variable to hold the Hyperbee instance. It will be initialized later.

async function initDB() {
  return new Promise(async (resolve, reject) => {
    // Returns a new Promise that will resolve when the database is ready or reject on error.
    try {
      const feed = new Hypercore(hypercoreDataPath, {
        valueEncoding: "json",
      });
      // Creates a new Hypercore feed using the specified data path.
      // The feed is configured to encode values in JSON format.

      db = new Hyperbee(feed, {
        keyEncoding: "utf-8",
        valueEncoding: "json",
      });
      // Wraps the Hypercore feed with Hyperbee to provide key-value store functionality.
      // Keys are encoded as UTF-8 strings, and values are stored in JSON format.

      await db.ready();
      // Waits for the Hyperbee instance to finish initializing.

      const swarm = new hyperswarm();
      // Creates a new Hyperswarm instance for peer-to-peer networking.

      swarm.join(feed.discoveryKey, {
        lookup: true,
        announce: true,
      });
      // Joins the swarm using the feed's discovery key.
      // `lookup: true` searches for peers, and `announce: true` advertises this node to peers.

      console.log("Database initialized and swarm joined.");
      // Logs a message indicating successful database initialization and swarm join.

      resolve(db);
      // Resolves the promise with the initialized database.
    } catch (error) {
      reject(error);
      // Rejects the promise if an error occurs during initialization.
    }
  });
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call initDB first.");
    // Throws an error if someone tries to access the database before it’s initialized.
  }
  return db;
  // Returns the Hyperbee instance.
}

module.exports = {
  initDB,
  getDB,
};
// Exports the initDB and getDB functions so other parts of the application can initialize and access the database.
