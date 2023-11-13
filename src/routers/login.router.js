const express = require('express');

const router = express.Router();
const cripto = require('crypto');
const emailValidation = require('../middleware/email.validation');

const HTTP_OK_STATUS = 200;

const token = () => cripto.randomBytes(8).toString('hex');

router.post('/login', emailValidation, (_req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: token() });
});

module.exports = router;