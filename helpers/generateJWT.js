require( 'dotenv' ).config({ path:__dirname+'./../.env' });
const jwt = require( 'jsonwebtoken' );

//funcion para generar el JWT
function generateJWT( id ) {
  return jwt.sign( { id }, process.env.JWT_SECRET, { 
    expiresIn: '24h', 
  } )
}

module.exports = generateJWT;