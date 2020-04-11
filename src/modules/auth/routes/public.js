const router = require('express').Router();
const publicController = require('../controllers/public');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', publicController.register);

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', publicController.login);

module.exports = router;
