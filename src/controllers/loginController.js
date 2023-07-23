const Login = require('../models/LoginModel');

exports.index = (req, res, next) => {
  if (req.session.user) return res.render('private');

  return res.render('login');
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
  try {
    const loginUser = new Login(req.body);

    await loginUser.login();

    if (loginUser.errors.length > 0) {
      req.flash('errors', loginUser.errors);

      req.session.save(function () {
        res.redirect('/login/index');
      });

      return;
    }

    req.flash('success', 'Login efetuado com sucesso.');

    req.session.user = loginUser.user;

    req.session.save(function () {
      res.redirect('/login/index');
    });
  } catch (e) {
    console.error(e);
    return res.render('404');
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect('/');
  } catch (e) {
    console.error(e);
    return res.render('404');
  }
};
