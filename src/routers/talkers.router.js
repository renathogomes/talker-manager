const express = require('express');

const { readTalkerFile, findTalkerById } = require('../utils/fs');

const router = express.Router();

const HTTP_OK_STATUS = 200;

router.get('/talker', async (_req, res) => {
  const talkers = await readTalkerFile();
  res.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await findTalkerById(id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(talker);
});

module.exports = router;