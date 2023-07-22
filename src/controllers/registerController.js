exports.index = (req, res, next) => {
  res.render('register');
  return;
};

exports.createAccount = (req, res, next) => {
  res.send('Olá!');

}