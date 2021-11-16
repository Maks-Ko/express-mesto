const router = require('express').Router();
const { createCard, getCards, deleteCardId } = require('../controllers/cards');

router.post('/cards', createCard);
router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCardId);

module.exports = router;