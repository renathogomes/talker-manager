const rateValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk.rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  if (talk.rate < 1 || talk.rate > 5 || talk.rate % 1 !== 0) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

module.exports = rateValidation;