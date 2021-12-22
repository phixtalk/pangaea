const express = require('express');
const { subscribeRoute, publishRoute } = require('./routes');
const cors = require("cors");

const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// publisher routes
app.use("/subscribe", subscribeRoute);
app.use("/publish", publishRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Publisher server is running on port ${PORT}.`);
});