const rateValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk.rate) {
    return res.status(400)
      .json({ message: 'O campo "rate" é obrigatório' }); 
  }
  next();
};

module.exports = rateValidation;