const Contact = require('../models/ContactModel');

exports.index = (req, res, next) => {
  res.render('contact', {
    contact: {},
  });
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

exports.editContact = async (req, res, next) => {
  if (!req.params.id) return res.render('404');

  const contact = await Contact.getContact(req.params.id);

  if (!contact) return res.render('404');

  res.render('contact', {
    contact,
  });
};
