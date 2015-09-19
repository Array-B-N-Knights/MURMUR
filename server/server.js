
var express = require('express'),
    querystring = require('querystring'),
    mongoose    = require('mongoose'),
    bodyParser = require('body-parser');
    // MongoWatch = require('mongo-watch');


var helpers = require('./helpers')
// See http://www.yelp.com/developers/documentation/v2/search_api

var app = express();

var mongoURI = "mongodb://localhost:27017";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

// var watcher = new MongoWatch({format: 'pretty'});

// watcher.watch('rooms', function(event) {
//   console.log('event');
// });

app.use(express.static(__dirname + '/../client'));
// http://127.0.0.1:3000/?firstname=Restaurant&lastname=Location
// {"searchTerm":"Restaurant","location":"Location"}
// app.use(parser.json());

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.use(bodyParser.json());


app.post('/', helpers.addMessage);

app.post('/checkroom', helpers.checkRoomExists);

app.post('/signin', helpers.signin);

app.post('/create', helpers.createRoom);

app.post('/signup', helpers.signup);

app.post('/comment', function(request, response){ //request.body.url = 'newPost'
  firebase.comment(request, response);
})

app.post('/vote', function(request,response){ //request.body.url = 'newPost'
  firebase.votePost(request, response);
})

app.post('/voteComment', function(request,response){ //request.body.url = 'newPost'
  firebase.voteComment(request, response);
})

app.post('/favorite', function(request,response){ //request.body.url = 'newPost'
  firebase.toggleFavorite(request, response);
})
