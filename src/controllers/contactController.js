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
    console.error(error);
    return res.render('404');
  }
};

exports.getContact = async (req, res, next) => {
  if (!req.params.id) return res.render('404');

  const contact = await Contact.getContact(req.params.id);

  if (!contact) return res.render('404');

  res.render('contact', {
    contact,
  });
};

exports.editContact = async (req, res, next) => {
  try {
    if (!req.params.id) return res.render('404');

    const contact = new Contact(req.body);

    await contact.editContact(req.params.id);

    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);

      req.session.save(() => res.redirect('/contact/index'));

      return;
    }

    req.flash('success', 'Contato editado com sucesso');

    req.session.save(() => res.redirect(`/contact/index/${contact.contact._id}`));

    return;
  } catch (error) {
    console.error(error);
    return res.render('404');
  }
};

exports.deleteContact = async (req, res, next) => {
  if (!req.params.id) return res.render('404');

  const contact = await Contact.deleteContact(req.params.id);

  if (!contact) return res.render('404');

  req.flash('success', 'Contato deletado com sucesso');

  req.session.save(() => res.redirect(`/`));

  return;
};
