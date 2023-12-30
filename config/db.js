const mongoose = require('mongoose');

async function dataBaseConnection(){
  try{
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch(error){
    console.log(error);
    throw new Error('No se pudo conectar a la base de datos') && process.exit(1)
  }
}

module.exports = dataBaseConnection