var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var showsObj = {"response": []}; // obj to return as JSON
var shows = []; // var to store filtered JSON

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res) {

  // get JSON
  var showsJSON = req.body.payload;
  // loop each object
  showsJSON.forEach(function(item) {
    if (item.drm == true) { // requirement, drm must be true
      if (item.episodeCount > 0) { // requirement, episodeCount > 0
        shows.push({"image": item.image.showImage,"slug": item.slug, "title": item.title});
      }
    }
  });

  showsObj.response = shows; // add shows array
  res.end(JSON.stringify(showsObj, null, 2)); // convert to JSON

});

// error handling
app.use(function(err, req, res, next) {
    res.status(err.status || 400);
    res.send({"error": "Could not decode request: JSON parsing failed"});
});

app.listen(process.env.PORT || 4000);
