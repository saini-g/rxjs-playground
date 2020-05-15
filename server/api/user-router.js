const express = require('express');
const { promisify } = require('util');
const sleep = promisify(setTimeout);

const router = express.Router();

const users = [
  {
    id: '1',
    name: 'Gaurav Saini',
    email: 'gaurav.saini@gmail.com'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john.doe@gmail.com'
  }
];

router.get('/users/:id', function(req, res, next) {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    const err = new Error('user not found');
    err.status = 404;
    return next(err);
  }
  res.json(user);
});

module.exports = router;
