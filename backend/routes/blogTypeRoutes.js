const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createBlogType, allBlogsType, updateBlogType, deleteBlogType } = require('../controllers/blogTypeController');
const router = express.Router();




//job type routes

// /api/type/create
// router.post('/type/create', isAuthenticated, isAdmin, createJobType)
router.post('/type/create', createBlogType)
// /api/type/jobs
router.get('/type/blogs', allBlogsType)
// /api//type/update/:_id
// router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateJobType)
router.put('/type/update/:type_id', updateBlogType)
// /api/type/delete/type_id
// router.delete('/type/delete/:type_id', isAuthenticated, isAdmin, deleteJobType)
router.delete('/type/delete/:type_id', deleteBlogType)

module.exports = router;