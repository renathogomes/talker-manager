const express = require('express');

const router = express.Router();
const cripto = require('crypto');

const token = () => cripto.randomBytes(8).toString('hex');

const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const validatePassword = (password) => {
  const regex = /\d{6,}/;
  return regex.test(password);
};

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'O campo "email" deve ter o formato "}@{.com}"' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'O campo "password" deve ter pelo menos 6 dígitos' });
  }
  res.status(200).json({ token });
});

module.exports = router;