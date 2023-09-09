const express = require('express');
const router = express.Router();
const GenShort = require('../controllers/urls');
router.post('/', GenShort);
module.exports = router;