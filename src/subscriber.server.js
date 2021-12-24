const express = require('express');
const subscribers = require('./routes/subscribers.router');
const cors = require("cors");

const app1 = express();
app1.use(cors());

// parse requests of content-type - application/json
app1.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app1.use(express.urlencoded({ extended: true }));

app1.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//subscriber routes
app1.use("/test1", subscribers);
app1.use("/test2", subscribers);

const nodeEnv = process.env.NODE_ENV || 'dev';

if(nodeEnv != "test"){
  app1.listen(9000, () => {
    console.log("Subscriber server is running on port 9000");
  });
}

module.exports.app1 = app1;
