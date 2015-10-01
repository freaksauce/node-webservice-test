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
    // console.log(item.title)
    shows.push({"image": item.image,"slug": item.slug, "title": item.title});
  });

  showsObj.response = shows;
  res.end(JSON.stringify(showsObj, null, 2))
})

app.listen(process.env.PORT || 4000);
