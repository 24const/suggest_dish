'use strict';

var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var fs = require('fs');
var config = require('../config/environment');

router.post('/', multipart(), function(req, res) {
  var fileName = req.body['flowFilename'];
  var filePath = req.files.file.path;

  fs.readFile(filePath, function (err, data) {
    var newPath = __dirname + '/../../files/' + fileName;
    fs.writeFile(newPath, data, function (err) {
      //remove temporary file
      fs.unlink(filePath);
      var responseOjb = {
        url: config.appUrl + '/file/' + fileName,
        fileName: fileName
      };
      res.json(responseOjb);
    });
  });

});

router.get('/', function(req, res) {
  res.status(404).end()
});

module.exports = router;