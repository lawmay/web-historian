// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var request = require('request');   // me: do this in http-helpers.js???

  var websiteList = fs.readFileSync(archive.paths.list);
  websiteList = websiteList.toString().split('\n');
  // console.log(websiteList);
  
  for (var i = 0; i < websiteList.length; i++) {
    if (websiteList[i] === '') { continue; }
    var siteURL = websiteList[i];
    console.log(siteURL);

    archive.downloadUrls(siteURL);
  }
