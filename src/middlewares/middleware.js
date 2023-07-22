exports.globalMiddleware = (req, res, next) => {
  next();
};

exports.CheckCsrfError = (err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') return res.render('404.ejs');
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
