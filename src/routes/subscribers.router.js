const express = require('express');
const router = express.Router();
const Response = require('../utils/response.utils');

router.post("/", (req, res) => {
    console.log("Subscriber server:", req.body);
    Response.Success(res, req.body); 
});

module.exports = router;