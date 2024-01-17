const mongoose = require( 'mongoose' );

const userSchema = mongoose.Schema ({
  name: {
    type: String,
    trim: true,
    required: [ true, 'Por favor teclea un nombre' ]
  },
  email: {
    type: String,
    trim: true,
    required: [ true, 'Por favor teclea un email' ],
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: [ true, 'Por favor teclea un password' ]
  },
  rol: {
    type: String,
    trim: true,
    enum: ['default', 'seller', 'admin'],
    default: 'default',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);