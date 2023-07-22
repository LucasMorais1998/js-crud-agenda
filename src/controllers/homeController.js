const HomeModel = require('../models/HomeModel');

exports.homePage = (req, res, next) => {
  res.render('index', {
    title: 'Title',
  });
  return;
};

exports.postPage = (req, res, next) => {
  res.send(req.body);
  return;
};
