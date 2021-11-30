const router = require('express').Router();
const { getUsers, getUserId, updateUser, updateAvatar, getCurrentUser } = require('../controllers/users');

router.get('/user/me', getCurrentUser);
router.get('/users/:userId', getUserId);
router.get('/users', getUsers);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);


module.exports = router;