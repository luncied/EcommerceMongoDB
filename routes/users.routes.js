const { Router } = require( 'express' );
const { registerUser, loginUser, getUserData, updateRol } = require( '../controllers/user.controller' );
const validateAuth = require( '../middlewares/validateAuth' );

const router = Router();

router
  .route( '/' )
  .post( registerUser )
  .get( validateAuth, getUserData )
  .put( validateAuth, updateRol )

router.post( '/login', loginUser );

module.exports = router;