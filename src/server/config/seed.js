'use strict';

var Stat = require('../model/statistic');
var StatData = require('../model/statistic.data');

StatData.find({}).remove().exec();

Stat.find({}).remove()
  .then(() => {
    Stat.create({
      name: 'stat 1',
      type: 'response-time',
      url: 'google.pl',
      unit: 'ms',
      enable: true        
    }, {
      name: 'stat 2',
      type: 'response-time',
      url: 'google.pl',
      unit: 'ms',
      enable: true  
    }, {
      name: 'stat 3',
      type: 'response-time',
      url: 'google.pl',
      unit: 'ms',
      enable: true  
    }, {
      name: 'stat 4',
      type: 'response-time',
      url: 'google.pl',
      unit: 'ms',
      enable: true  
    }, {
      name: 'stat 5',
      type: 'response-time',
      url: 'google.pl',
      unit: 'ms',
      enable: true  
    }, {
      name: 'stat 6',
      type: 'response-time',
      url: 'google.pl',
      unit: 'ms',
      enable: true  
    });
  });
