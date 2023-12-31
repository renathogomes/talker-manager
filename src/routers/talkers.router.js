const express = require('express'); 

const router = express.Router();

const {
  readTalkerFile,
  findTalkerById,
  addTalker,
  updateTalker,
  deleteTalker,
} = require('../utils/fs');

const authorizationValidation = require('../middleware/authorization.validation');
const nameValidation = require('../middleware/name.validation');
const ageValidate = require('../middleware/age.validation');
const talkValidation = require('../middleware/talk.validation');
const watchedAtValidation = require('../middleware/watchedAt.validation');
const rateValidation = require('../middleware/rate.validation');
const rateZeroValidation = require('../middleware/rate.zero.validation');
const rateRangeValidation = require('../middleware/rate.range.validation');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_NOT_FOUND_STATUS = 404;

router.get('/talker', async (_req, res) => {
  const talkers = await readTalkerFile();
  res.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await findTalkerById(id);
  if (!talker) {
    return res.status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' }); 
  }
  res.status(HTTP_OK_STATUS).json(talker);
});

router.post('/talker',
  talkValidation,
  rateZeroValidation,
  rateValidation,
  rateRangeValidation,
  authorizationValidation,
  nameValidation,
  ageValidate,
  watchedAtValidation,
  async (req, res) => {
    const newTalker = req.body;
    const n = await addTalker(newTalker);
    res.status(HTTP_CREATED_STATUS).json(n);
  });

router.put('/talker/:id',
  talkValidation,
  rateZeroValidation,
  rateValidation,
  rateRangeValidation,
  authorizationValidation,
  nameValidation,
  ageValidate,
  watchedAtValidation,
  async (req, res) => {
    const { id } = req.params;
    const talker = req.body;
    talker.id = parseInt(id, 10);
    try {
      await updateTalker(talker);
      res.status(HTTP_OK_STATUS).json(talker);
    } catch (error) {
      res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
    }
  });

router.delete('/talker/:id', authorizationValidation, async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTalker(id);
    res.status(HTTP_NO_CONTENT_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

module.exports = router;