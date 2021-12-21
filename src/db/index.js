require("dotenv").config();
const mongoose = require('mongoose');

let conn = null;

const uri=process.env.DB_CONNECT;

module.exports.connectToDB = async () => {
  if (conn == null) {
    conn = mongoose.createConnection(uri, {
      serverSelectionTimeoutMS: 5000
    });    
    await conn;   
  }
  console.log("mongo_db", "connected to db");
  return conn; 
}