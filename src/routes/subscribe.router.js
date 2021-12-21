const express = require('express');
const { createSubscription } = require('../controllers/subscribe.controller');
const router = express.Router();

router.post("/:topic", createSubscription);

module.exports = router;