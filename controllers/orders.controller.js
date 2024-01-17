const asyncHandler = require( 'express-async-handler' )
const Order = require( '../models/order.model' )


const getCart = asyncHandler( async ( req, res ) => {
  const products = await Order.find();
  res.json( products )
})

const getOrderById = asyncHandler( async ( req, res ) => {
  const { id } = req.params;
  const order = await Order.findById( id );

  if( !order ) {
    res.status(404)
    throw new Error( 'Producto no encontrado' )
  }
  return res.status(200).json( order );

})

const createOrder = asyncHandler( async ( req, res ) => {
  // desactivamos la posibilidad de crear un articulo si el usuario tiene una cuenta normal
  if ( req.user.rol === 'default' ){
    res.status( 403 )
    throw new Error( 'No tienes los permisos necesarios para crear un producto' )
  }

  // validación de correcto llenado de formulario
  const { cantidad } = req.body
  if ( !cantidad ) {
    cantidad = 1;
  }

  // // validación de producto existente 
  // const productExist = await Order.findOne({ name })
  // if ( productExist ) {
  //   res.status( 400 )
  //   throw new Error( 'Ese usuario ya fué registrado en la aplicación' )
  // }

  //creamos el producto
  const order = await Order.create({
    cantidad
  })

  //si se creó correctamente, muestra los datos, de lo contrario manda mensaje de error
  if ( product ) {
    res.status( 201 ).json({
      _id : product._id,
      name : product.name,
      description : product.description,
      price : product.price,
      stock : product.stock
    })
  } else {
    res.status( 400 )
    throw new Error( 'No fue posible crear el producto' )
  }

})

const updateProduct = asyncHandler( async ( req, res ) => {
  const { id } = req.params;
  const product = await Product.findById( id );

  if ( !product ) {
    res.status(404)
    throw new Error( 'Producto no encontrado' )
  }

  if ( req.user.id.toString() !== product.seller.toString() || req.user.rol !== 'admin' ) {
    res.status( 401 )
    throw new Error( 'No autorizado' )
  }

  const updatedProduct = await Product.findByIdAndUpdate( id, req.body, { new: true })
  res.status( 200 ).json( updatedProduct )
})

const deleteProduct = asyncHandler( async ( req, res ) => {
  const { id } = req.params;
  const product = await Product.findById( id );

  if ( !product ) {
    res.status(404)
    throw new Error( 'Producto no encontrado' )
  }

  if ( req.user.id.toString() !== product.seller.toString() || req.user.rol !== 'admin' ) {
    res.status( 401 )
    throw new Error( 'No autorizado' )
  }

  const deletedProduct = await Product.findByIdAndUpdate( id, { is_active : false })

  res.status(200).json( deletedProduct )
})
module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct
}