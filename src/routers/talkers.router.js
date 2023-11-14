const express = require('express');

const { readTalkerFile, findTalkerById, addTalker } = require('../utils/fs');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

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

router.post('/talker', async (req, res) => {
  const newTalker = req.body;
  await addTalker(newTalker);
  res.status(HTTP_CREATED_STATUS).json(newTalker);
});

module.exports = router;