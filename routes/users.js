const router = require('express').Router();
const { getUsers, getUserId, createUser, updateUser, updateAvatar } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);
router.get('/users/:userId', getUserId);
router.get('/users', getUsers);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;