'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

var rootPath = path.join(__dirname, '..', '..');

var publicPath = path.join(rootPath, 'public');

var browserPath = path.join(rootPath, 'browser');

var nodeModulesPath = path.join(rootPath, 'node_modules');

router.use(express.static(publicPath));

router.use(express.static(browserPath));

router.use(express.static(nodeModulesPath));

module.exports = router;
