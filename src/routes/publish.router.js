const express = require('express');
const { publisher } = require('../controllers/publish.controller');
const router = express.Router();

router.post("/:topic", publisher);

module.exports = router;