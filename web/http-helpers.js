var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset) {
  fs.readFile(asset, function (err, data) {
    sendResponse(res, 200, data);
  });
};

exports.sendResponse = sendResponse = function(response, statusCode, data) {
  var statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);

  if (statusCode === 404) {
    response.end('Not Found');
  }
  response.end(data);
};
