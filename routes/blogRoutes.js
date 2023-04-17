const express = require('express');
const router = express.Router();
const Blog = require('../modules/blog');
const blogController = require('../controllers/blogController');
router.get('/all', blogController.blogAll)
router.post('/add', blogController.blogAdd )
router.delete('/delete/:id', blogController.blogDelete)
router.get('/create', blogController.blogCreate)
router.get('/:id', blogController.blog )

module.exports = router;