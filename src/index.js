const express = require('express');

const loginRouter = require('./routers/login.router');
const talkersRouter = require('./routers/talkers.router');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(loginRouter);
app.use(talkersRouter);

app.listen(PORT, () => {
  console.log('Online');
});
