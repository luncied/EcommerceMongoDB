// require( 'dotenv' ).config({ path:__dirname+'/../.env' });
const { dataBaseConnection } = require( '../config/db' )
// const { errors } = require('celebrate');
const colors = require( 'colors' );
const express = require( 'express' );
const cors = require( 'cors' );

class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.usersPath = '/api/users';
    this.productsPath = '/api/products';
    this.ordersPath= '/api/orders';
    this.dataBaseConnection()
    this.middlewares()
    this.routes()
  };

  async dataBaseConnection(){
    await dataBaseConnection()
  }

  middlewares(){
    this.app.use( cors() );
    this.app.use( express.json() );
    this.app.use( express.urlencoded({ extended: false }))
  };

  routes(){
    this.app.use( this.usersPath, require('../routes/users.routes') );
    this.app.use( this.productsPath, require('../routes/products.routes') );
    // this.app.use( this.ordersPath, require('../routes/orders.routes') );
  }

  listen(){
    this.app.listen( this.port, () => {
      console.log( `Server listening on port ${this.port}` )
    });
  };
}


module.exports = Server;