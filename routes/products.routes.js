const { Router } = require( 'express' );
const {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct 
} = require( '../controllers/products.controller' );
const validateAuth = require( '../middlewares/validateAuth' );

const router = Router();

router
  .route( '/' )
  .get( getAllProducts )
  .post( validateAuth, createProduct )
router
  .route( '/:id' )
  .get( getProductByID )
  .put( validateAuth, updateProduct )
  .delete( validateAuth, deleteProduct )

module.exports = router;