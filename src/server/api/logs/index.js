'use strict';

var express = require('express');
var controller = require('./logs.controller');

var router = express.Router();

function logplexParse (req, res, next){
   /*
     req.body =  (req.body || '').split(/\r*\n/).filter(function(line) {
      return line.length !== 0;
    }).map(function(line) {
      line = line.replace(/^\d+\s+/, '');
      line = line.replace(/sample#/g, ''); 

      return line.split(' ');
    });
*/
    next();
}

router.post('/', logplexParse, controller.create);
router.get('/', controller.index);

module.exports = router;
