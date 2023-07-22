const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  title: { type: String, required: true },
  description: String,
});

const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;
