const express = require('express');

const { readTalkerFile } = require('../utils/fs');

const router = express.Router();

const HTTP_OK_STATUS = 200;

router.get('/talker', async (_req, res) => {
  const talkers = await readTalkerFile();
  res.status(HTTP_OK_STATUS).json(talkers);
});
