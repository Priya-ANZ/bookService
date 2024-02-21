const BookController = require('../controllers/book.controller.js')
const authenticate = require("../middleware/authenticate.js");
const auth = require("../middleware/authorize.js");
const express = require('express');

const router = express.Router()

router.get('/',[authenticate, auth], BookController.getBooks)

module.exports = router