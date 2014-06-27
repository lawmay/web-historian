var path = require('path');
var archive = require('../helpers/archive-helpers');

// require more modules/folders here!
var url = require('url');
var hh = require('./http-helpers');
var fs = require('fs');             // me: do this in http-helpers.js
var qs = require('querystring');
var request = require('request');   // me: do this in http-helpers.js???

exports.handleRequest = function (req, res) {
  var path = url.parse(req.url).pathname;
  var method = req.method;

  
  // var data = '';

  if (method === 'GET') {
    if (path === '/' || path === '') {
      hh.serveAssets(res, (archive.paths.siteAssets + '/index.html'));
    } else if (archive.isUrlInList(path)) {
      hh.serveAssets(res, (archive.paths.archivedSites + path));
    } else {
      hh.sendResponse(res, 404);
    }
  } else if (method === 'POST') {
    handlePost(req, res);
  } else {
    hh.sendResponse(res, 404);
  }
};

var handlePost = function(req, res) {
    var body = '';
    req.on('data', function (data) {
      body += data;
      // Too much POST data, kill the connection!
      if (body.length > 1e6)
          req.connection.destroy();
    });
    req.on('end', function () {
      var post = qs.parse(body);
      var formURL = post['url'];

       // post['url'];
      console.log('path to sites.txt: ' + archive.paths.list);
      console.log('inside post: ' + formURL);
      console.log('appending to file...');

    // if (isValidURL(formURL)) {
      var newFilePath = archive.paths.archivedSites + '/' + formURL;

        request('http://' + formURL, function (error, response, body) {
          if (!error && response.statusCode == 200) {

            fs.writeFile(newFilePath, "", function (err) {
              console.log("The new web page file was saved!");

              fs.appendFile(newFilePath, body, function (err) {
                console.log("The new web page file was appended!");

                fs.appendFile(archive.paths.list, (formURL + "\n"), function (err) {
                  console.log("The list file was appended!");

                  res.writeHead(302, {
                    "location" : 'http://127.0.0.1:8080/' + formURL
                   });
                  // console.log('redirecting....');
                  res.end();                  
                });
              });
            });

          } else {
            // console.log("URL NOT VALID");

            // res.writeHead(404, hh.headers);
            // res.end(data);
          }
        });
      // } else {
      //   console.log()
      // }
    });
}




