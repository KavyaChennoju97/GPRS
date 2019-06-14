const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController.js");
const { GET_BOOKS_ROUTE, POST_BOOK_ROUTE } = require("../constants/iconstants");

router.route(GET_BOOKS_ROUTE).get(bookController.getBooks);
router.route(POST_BOOK_ROUTE).post(bookController.postBook);

module.exports = router;