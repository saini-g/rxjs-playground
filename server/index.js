const express = require('express');
const bodyParsser = require('body-parser');

const errorHandler = require('./api/error-handler');
const userRouter = require('./api/user-router');

const app = express();

// #region middleware
app.use(bodyParsser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
// #endregion

// #region routes
app.use(userRouter);
// #endregion

// #region error handling
app.use(errorHandler.notFound);
app.use(errorHandler.unhandledException);
// #endregion

app.listen(3300, () => {
  console.log('server started');
});
