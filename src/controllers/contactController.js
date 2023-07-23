const Contact = require('../models/ContactModel');

exports.index = (req, res, next) => {
  res.render('contact');
};

exports.register = async (req, res, next) => {
  try {
    const newContact = new Contact(req.body);

    await newContact.register();

    if (newContact.errors.length > 0) {
      req.flash('errors', newContact.errors);

      req.session.save(() => res.redirect('/contact/index'));

      return;
    }

    req.flash('success', 'Contato registrado com sucesso');

    req.session.save(() => res.redirect(`/contact/index/${newContact.contact._id}`));

    return;
  } catch (error) {
    console.error(e);
    return res.render('404');
  }
};
