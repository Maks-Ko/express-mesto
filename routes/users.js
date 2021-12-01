const router = require('express').Router();
const { getUsers, getUserId, updateUser, updateAvatar, getCurrentUser } = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

router.get('/user/me', getCurrentUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserId);

router.get('/users', getUsers); //

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);


module.exports = router;