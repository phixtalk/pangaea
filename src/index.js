const express = require('express');
const { subscribeRoute, publishRoute, subscribers } = require('./routes');
const cors = require("cors");

const app = express();
const app1 = express();

app.use(cors());
app1.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
app1.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app1.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app1.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// publisher routes
app.use("/subscribe", subscribeRoute);
app.use("/publish", publishRoute);
//subscriber routes
app1.use("/test1", subscribers);
app1.use("/test2", subscribers);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app1.listen(9000, () => {
  console.log("Server 2 is up and running on port 9000");
});
