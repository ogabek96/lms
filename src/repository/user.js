const uuidv4 = require('uuid').v4;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accountType: { type: String, enum: ['student', 'teacher'] },
  firstName: { type: String },
  lastName: { type: String },
});

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

userSchema.methods.createUser = async function () {
  this.password = await bcrypt.hash(this.password, 4);
  return this.save();
};

userSchema.methods.comparePassword = async function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (e) {
    console.error(e);
    return false;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
