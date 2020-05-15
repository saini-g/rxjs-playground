exports.notFound = function(req, res, next) {
  const err = new Error('not found!!');
  err.status = 404;
  next(err);
};

exports.unhandledException = function(error, req, res, next) {
  res.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message
  });
};
