const mongoose = require( 'mongoose' );

const productSchema = mongoose.Schema ({
  name: {
    type: String,
    trim: true,
    required: [ true, 'Por favor teclea un nombre' ]
  },
  description: {
    type: String,
    trim: true,
    required: [ true, 'Ingrese una descripción del producto' ]
  },
  price: {
    type: String,
    trim: true,
    required: [ true, 'Ingresa el precio del producto' ]
  },
  stock: {
    type: String,
    trim: true,
    required: [ true, 'Ingresa la cantidad de productos disponibles para vender' ]
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  is_active: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);