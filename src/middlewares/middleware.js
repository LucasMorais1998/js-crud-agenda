exports.globalMiddleware = (req, res, next) => {
  next();
};

exports.CheckCsrfError = (err, req, res, next) => {
  if (err) return res.render('404.ejs');
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
