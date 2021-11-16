const router = require('express').Router();
const { getUsers, getUserId, createUser } = require('../controllers/users');

router.post('/users', createUser);
router.get('/users/:userId', getUserId);
router.get('/users', getUsers);

module.exports = router;