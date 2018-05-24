const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: { type: String, required: true },
  picture: { type: String }
});

//Gives pre-made validation errors for authentication.
userSchema.plugin(require('mongoose-unique-validator'));

//Prevents hashed passwords getting sent in the response made in auth.js.
userSchema.set('toJSON',{
  transform(doc, json){
    delete json.password;
    return json;
  }
});

//This is a prototype function. This is how you can append methods to models.
userSchema.methods.validatePassword = function validatePassword(password){
  //Compares the user's stored hashed password to the entered text password.
  return bcrypt.compareSync(password, this.password);
};

//Virtual temporarily stores an attribute.
//The set function dictates how it can be called.
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

//Before (pre) any function 'saves' something, run this function to
//encrypt the password before it is stored:
userSchema.pre('validate', function checkPassword(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
