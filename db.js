const { MongoClient, Db } = require("mongodb");

/**
 * @type {Db}
 */
exports.db = null;

/**
 * @param {string} uri
 */
exports.connect = async (uri) => {
  const client = await new MongoClient(uri).connect();

  exports.db = client.db();
};
