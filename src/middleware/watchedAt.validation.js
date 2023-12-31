const watchedAtValidation = (req, res, next) => {
  const { talk } = req.body;
  const regex = /\d{2}\/\d{2}\/\d{4}/;
  if (!regex.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = watchedAtValidation;