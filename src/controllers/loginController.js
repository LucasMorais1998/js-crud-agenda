const Login = require('../models/LoginModel');

exports.index = (req, res, next) => {
  res.render('login');
  return;
};

exports.register = async (req, res, next) => {
  try {
    const newUser = new Login(req.body);

    await newUser.register();

    if (newUser.errors.length > 0) {
      req.flash('errors', newUser.errors);

      req.session.save(function () {
        res.redirect('/login/index');
      });

      return;
    }

    req.flash('success', 'Usuário criado com sucesso.');

    req.session.save(function () {
      res.redirect('/login/index');
    });
  } catch (e) {
    console.error(e);
    return res.render('404');
  }
};

exports.login = async (req, res, next) => {
  const userLogin = new Login(req.body);
  await userLogin.login();
  res.send(userLogin.body);
};
