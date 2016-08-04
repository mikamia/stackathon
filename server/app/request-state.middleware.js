'use strict';

var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


//this would be where the session stuff would go

module.exports = router;
