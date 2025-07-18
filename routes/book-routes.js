const express = require('express');
const { createAuthor, createBook, getBooksByAuthor } = require('../controllers/book-controller');

const router = express.Router();

router.post('/author', createAuthor);
router.post('/book', createBook);
router.get('/book/:id', getBooksByAuthor);

module.exports = router;