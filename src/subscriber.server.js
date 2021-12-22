const express = require('express');
const { subscribers } = require('./routes');
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

//subscriber routes
app.use("/test1", subscribers);
app.use("/test2", subscribers);

app.listen(9000, () => {
  console.log("Server 2 is up and running on port 9000");
});
