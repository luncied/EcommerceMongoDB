const jwt = require( 'jsonwebtoken' );
const asyncHandler = require( 'express-async-handler' );
const User = require( '../models/user.model' );

const validateAuth = asyncHandler( async ( req, res, next ) => {
  let token
  if ( req.headers.authorization && req.headers.authorization.startsWith( 'Bearer' ) ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify( token, process.env.JWT_SECRET )
      req.user = await User.findById( decoded.id ).select( '-password' ) // almacena la información del usuario autenticado
      return next()

    } catch ( error ) {
      console.log( error )
      res.status( 401 )
      throw new Error( 'Acceso no autorizado' )
    }
  }
  if ( !token ) {
    res.status( 401 )
    throw new Error( 'Acceso no autorizado, No se proporcionó el Token' )
  }
  next()
});

module.exports = validateAuth;