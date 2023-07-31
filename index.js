// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
//{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  console.log(req.params);
  let unixFormat, utcFormat, dateObj;
  const regex = /^[0-9]+$/;

  isUnix = regex.test(date);

  if(!date){
    dateObj = new Date();
  }
  else if(isUnix && date){
    unixFormat = parseInt(date);
    dateObj = new Date(unixFormat);
  }else if(!isUnix && date){
    dateObj = new Date(date);
  }

  if(dateObj.toString() === 'Invalid date'){
    console.log("input error");
    res.json({ error : "Invalid Date" });
    return;
  }

  unixFormat = dateObj.getTime();
  utcFormat = dateObj.toUTCString();

  res.send({
    unix : unixFormat,
    utc: utcFormat
  })
})



app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(3000  , function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
