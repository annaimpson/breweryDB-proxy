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

app.get('/breweries', function(req, res){ // listens for request on /api route
  var lat = req.query.lat; // grabs lat and lng queries from the request object
  var lng = req.query.lng;
  request('https://api.brewerydb.com/v2/breweries&hasImages=Y&key=9b561e70ba317f8d99aaa277053fe0fd', function (error, response, body) { // api url
    if (!error && response.statusCode === 200) {
      res.send(body); // if no errors, send the body of data back to front end
    }else{
      res.send(error);
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
