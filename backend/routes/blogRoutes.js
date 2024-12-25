const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin, isCreator } = require('../middleware/auth');
const { createBlog, singleBlog, updateBlog, showBlogs, deleteAllBlogs, deleteBlog } = require('../controllers/blogController');




//blog routes

// /api/blog/create
// router.post('/blog/create', isAuthenticated, isCreator, createblog)
router.post('/blog/create', createBlog)
// /api/blog/id
router.get('/blog/:id', isAuthenticated, singleBlog)
// /api/blog/update/blog_id
// router.put('/blog/update/:blog_id', isAuthenticated, isCreator, updateblog);
router.put('/blog/update/:blog_id', updateBlog);
// /api/blogs/show
router.get('/blogs/show', showBlogs);
// /api/blogs/deleteBlogs
router.delete('/blog/delete/:blog_id', deleteBlog);
// /api/blogs/deleteAllblogs
router.delete('/blogs/deleteAllblogs', deleteAllBlogs);


module.exports = router;