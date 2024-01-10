const bcrypt = require( 'bcryptjs' );
const asyncHandler = require( 'express-async-handler' );
const User = require( '../models/users.model' );
const generateJWT = require( '../helpers/generateJWT' );

const registerUser = asyncHandler( async ( req, res ) => {
  //desestructuramos los datos que pasamos del body
  const { name, email, password, rol } = req.body
  if ( !name || !email || !password ) {
    res.status( 400 )
    throw new Error( 'Faltan datos' )
  }

  //verificamos si ese usuario existe
  const userExists = await User.findOne({ email })
  if ( userExists ) {
    res.status( 400 )
    throw new Error( 'Ese usuario ya fué registrado en la aplicación' )
  }

  //hash al password
  const salt = await bcrypt.genSalt( 10 )
  const hashedPassword = await bcrypt.hash( password, salt )
  var user ; 

  if ( rol === 'admin' ) {
    //creamos el usuario
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      rol
    })
  } else {
    //creamos el usuario
    user = await User.create({
      name,
      email,
      password: hashedPassword
    })
  }

  //si se creó correctamente, muestra los datos, de lo contrario manda mensaje de error
  if ( user ) {
    res.status( 201 ).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status( 400 )
    throw new Error( 'No se pudo registrar al usuario' )
  }

})

const loginUser = asyncHandler( async ( req, res ) => {
  //desestructuramos los datos del body
  const { email, password } = req.body
  if ( !email || !password ) {
    res.status( 400 )
    throw new Error( 'Faltan datos' )
  }

  //vamos a buscar a ese usuario
  const user = await User.findOne({ email })
  if ( !user ) {
    res.status(404)
    throw new Error( 'Usuario no encontrado' )
  }

  if ( user && ( await bcrypt.compare( password, user.password ) ) ) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT( user._id )
    })
  } else {
    res.status( 400 )
    throw new Error( 'Credenciales Incorrectas' )
  }
})

const getUserData = asyncHandler( async ( req, res ) => {
  res.json(req.user)
})

const updateRol = asyncHandler( async ( req, res ) => {
  const id = req.user.id;
  const seller = { rol : 'seller' }
  const user = await User.findById( id );

  if ( !user ) {
    res.status( 404 )
    throw new Error( 'Usuario no encontrado' )
  }

  if ( rol !== 'default' ) {
    res.status( 400 )
    throw new Error( 'Esta acción no puede realizarse si eres vendedor o administrador' )
  }

  const updatedRol = await User.findByIdAndUpdate( id, seller, { new: true })
  res.status( 200 ).json( updatedRol )
})

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  updateRol
}