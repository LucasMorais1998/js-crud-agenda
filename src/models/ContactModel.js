const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  tel: { type: String, required: true, default: '' },
  createdAt: { type: Date, default: Date.now() },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  async register() {
    this.validate();

    if (this.errors.length > 0) return;

    this.contact = await ContactModel.create(this.body);
  }

  static async getContact(id) {
    if (typeof id !== 'string') return;

    const contact = await ContactModel.findById(id);

    return contact;
  }

  static async getContacts() {
    const contacts = await ContactModel.find().sort({ createdAt: -1 });

    return contacts;
  }

  static async deleteContact(id) {
    if (typeof id !== 'string') return;

    const contact = await ContactModel.findOneAndDelete({ _id: id });
    
    return contact;
  }

  async editContact(id) {
    if (typeof id !== 'string') return;

    this.validate();

    if (this.errors.length > 0) return;

    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  validate() {
    this.cleanUp();

    if (this.body.email && !validator.isEmail(this.body.email))
      this.errors.push('E-mail inválido.');

    if (!this.body.name) this.errors.push('Nome é um campo obrigatório.');

    if (!this.body.email && !this.body.tel)
      this.errors.push('É necessário e-mail e/ou telefone no cadastro.');
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      name: this.body.name,
      lastName: this.body.lastName,
      email: this.body.email,
      tel: this.body.tel,
    };
  }
}

module.exports = Contact;
