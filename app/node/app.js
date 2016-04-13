var express = require('express');
var request = require('request');
var app = express();
var cors = require('cors');

app.use(cors()); //allows overriding cross origin policy (use npm install if needed)

// app.get('/api', function(req, res){ // listens for request on /api route
//   var lat = req.query.lat; // grabs lat and lng queries from the request object
//   var lng = req.query.lng;
//   request('https://api.brewerydb.com/v2/search/geo/point?lat=' + lat + '&lng=' + lng + '&type=beer&hasImages=Y&key=9b561e70ba317f8d99aaa277053fe0fd', function (error, response, body) { // api url
//     if (!error && response.statusCode === 200) {
//       console.log('beer');
//       res.send(body); // if no errors, send the body of data back to front end
//     }
//    });
// });
//p is the query param for pagination
app.get('/breweries', function(req, res){ // listens for request on /breweries route
  var p;
  if(req.query.p){
    p = req.query.p
  }else{
    p = 1;
  }
  request('http://api.brewerydb.com/v2/breweries/?key=9b561e70ba317f8d99aaa277053fe0fd&p=' + p + '&name=*', function (error, response, body) { // api url
    if (!error && response.statusCode === 200) {
      res.send(body); // if no errors, send the body of data back to front end
    }else{
      console.log(error);
      res.send(response);
    }
   });
});

app.get('/brewery/:breweryId/beers', function(req, res){ // listens for request on /breweries route
  request('http://api.brewerydb.com/v2/brewery/' + req.params.breweryId + '?key=9b561e70ba317f8d99aaa277053fe0fd&withBreweries=' + 'withBreweries=Y', function (error, response, body) { // api url
    if (!error && response.statusCode === 200) {
      res.send(body); // if no errors, send the body of data back to front end
    }else{
      console.log(error);
      res.send(response);
    }
   });
});


app.get('/search', function(req, res){ // listens for request on /search route
  var type = req.query.type;
  var withLocations = req.query.withLocations;
  request('https://api.brewerydb.com/v2/search/?key=9b561e70ba317f8d99aaa277053fe0fd&type=' + type + '&withLocations=Y' + withLocations, function (error, response, body) { // api url
    if (!error && response.statusCode === 200) {
      console.log('beer');
      res.send(body); // if no errors, send the body of data back to front end
    }
   });
});

// app.get('/test', function(req, res){ // listens for request on /api route
//  console.log('working!');
//  res.send('working!'); // if no errors, send the body of data back to front end
// });

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server running on port %d');
