const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, getApplicantInfo, changeStatus, deleteAllUsers, createUserBlogHistory, createCreatorBlogHistory, updateVideoProgress } = require('../controllers/userController');
const { isAuthenticated, isAdmin, isCreator } = require('../middleware/auth');


//user routes

// /api/allusers
// router.get('/allusers', isAuthenticated, isAdmin, allUsers); //admin only
router.get('/allusers', allUsers); //admin only
// /api/user/id
// router.get('/user/:id', isAuthenticated, singleUser); //admin and user
router.get('/user/:id', singleUser); //admin and user
// /api/user/edit/id
// router.put('/user/edit/:id', isAuthenticated, editUser); //admin and user
router.put('/user/edit/:id', editUser); //admin and user
// /api/admin/user/delete/id
// router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser); //admin and user
router.delete('/admin/user/delete/:id', deleteUser); //admin and user
// /api/user/bloghistory
// router.post('/user/bloghistory', isAuthenticated, createUserblogHistory)
router.post('/user/bloghistory', createUserBlogHistory)
// /api/creator/blogcreatorhistory
// router.post('/creator/blogcreatorhistory', isAuthenticated, isCreator, createCreatorblogHistory)
router.post('/creator/blogcreatorhistory', createCreatorBlogHistory)
// /api/creator/getApplicantInfo
// router.get('/creator/getApplicantInfo', isAuthenticated, isCreator, getApplicantInfo)
router.get('/creator/getApplicantInfo', getApplicantInfo)
// /api/creator/getApplicantInfo
router.post('/creator/changeStatus', changeStatus)
// /api/user/delete
router.delete('/user/deleteAllUsers', deleteAllUsers)
// /api/user/updateVideoProgress
router.post('/user/updateVideoProgress', updateVideoProgress)

module.exports = router;