var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var request = require('request');   // me: do this in http-helpers.js???

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = readListOfUrls = function(){
  var websiteList = fs.readFileSync(paths.list);
  var websiteArray = websiteList.toString().split('\n');
  return websiteArray;
};

exports.isUrlInList = function(path){
  var websiteArray = readListOfUrls();
  for (var i = 0; i < websiteArray.length; i++) {
    if (('/' + websiteArray[i]) === path) {
      return true;
    }
  }
  return false;
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(formURL){
    var newFilePath = archive.paths.archivedSites + '/' + formURL;
    console.log(newFilePath);

    request('http://' + formURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('found website');
        console.log(newFilePath);

        fs.writeFile(newFilePath, '', function (err) {
          console.log("The new web page file was saved!");

          fs.appendFile(newFilePath, body, function (err) {
            console.log("The new web page file was appended!");
          });
        });

      }
    });
};
