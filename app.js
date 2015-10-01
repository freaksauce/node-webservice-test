var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var showsObj = {"response": []};
var shows = [];

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res) {

  var showsJSON = req.body.payload;
  showsJSON.forEach(function(item) {
    if (item.drm) {
      if (item.episodeCount > 0) {
        shows.push({"image": item.image.showImage,"slug": item.slug, "title": item.title});
      }
    }
  });
  console.log(shows.length);
  showsObj.response = shows;
  res.end(JSON.stringify(showsObj, null, 2))
})

app.listen(process.env.PORT || 4000);
