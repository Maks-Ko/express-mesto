const router = require('express').Router();
const { createCard, getCards, deleteCardId, likesCard, dislikesCard } = require('../controllers/cards');

router.post('/cards', createCard);
router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCardId);
router.put('/cards/:cardId/likes', likesCard);
router.delete('/cards/:cardId/likes', dislikesCard);

module.exports = router;