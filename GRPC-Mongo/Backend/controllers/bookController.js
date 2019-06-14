const {
  CONTENT_TYPE,
  APP_JSON,
  RES_SUCCESS,
  RES_INTERNAL_SERVER_ERROR
} = require("../constants/iconstants");

const client = require("../client");
module.exports.getBooks = (req, res) => {
  try {
    client.list({}, (error, books) => {
      if (!error) {
        res.setHeader(CONTENT_TYPE, APP_JSON);
        res.status(RES_SUCCESS).end(JSON.stringify(books));
      } else {
        throw error;
      }
    });
  } catch (error) {
    res.status(RES_INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
};

module.exports.postBook = (req, res) => {
  client.insert(req.body, (error, book) => {
    if (!error) {
      res.setHeader(CONTENT_TYPE, APP_JSON);
      res.status(RES_SUCCESS).end(JSON.stringify(book));
    } else {
      throw error;
    }
  });
};
