const mongoose = require( 'mongoose' );

const orderSchema = mongoose.Schema ({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  comprador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  cantidad: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);