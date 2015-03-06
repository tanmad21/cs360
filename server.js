var fs = require('fs');
var http = require('http');
var url = require('url');

var ROOT_DIR = "html";

http.createServer(function(req,res) {
  var urlObj = url.parse(req.url,true,false);
  if(urlObj.pathname.indexOf("getcity") != -1) {	//getcity api route
    var query = urlObj.query.q;
    //open file with cities
    fs.readFile(ROOT_DIR + "/utahCities.txt", function(err, data) {
      if(err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      } 
      //search for requested city
      var temp = data.toString();
      var citiesArray = temp.split("\n");
      var foundCities = [];
      for(var index in citiesArray) {
        if(citiesArray[index].indexOf(query) != -1) {
          foundCities.push(citiesArray[index]);
        }
      }
      res.writeHead(200,{"Access-Control-Allow-Origin":"*"});
      res.end(JSON.stringify(foundCities));
    });
  }
  else {
    fs.readFile(ROOT_DIR + urlObj.pathname, function(err, data) {
      if(err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      } 
      res.writeHead(200);
      res.end(data);
    });
  }
}).listen(8080);
