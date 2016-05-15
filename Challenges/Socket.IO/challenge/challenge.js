/*
 Create a web app that displays a live twitter feed.
 Use the twitter api package - npm install twitter
 Connect to the statuses/filter stream.
 You can use the implmentation below.
 Send the incoming tweets to the client using socket.io - npm install socket.io.
 See client implementation at scripts/twitter.js
 See layout&home jade files on the views folder.
 */
var express = require('express')
var http = require('http');
var io = require("socket.io");
var twitter = require('twitter');
var app = express();


app.set('view engine', 'jade');
app.set('views', __dirname + "/views");
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;
/*
 don't forget to add the express,http,socket.io module here
 */

// Twitter implementation
var twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'pHLKFCHfgOKGRXCrdXtHn48k8',
    consumer_secret: 'CqgbQMzKk5NM8VvKzwIvHTH49B6wHaddgnUrwvJ5PupPKgdcqi',
    access_token_key: '2839809097-mCNf8FjVqroKijNd0pjUfPHUTqMHHMeglnxl5np',
    access_token_secret: 'ZQIglQ5XNIskkiQUyoIqrcNhgti06V5j6gKdcfd8TBtvP'
});


app.get("/", function(req, res) {
    res.render("home");
})

var server = http.createServer(app).listen(port, function() {
    console.log("server starter on " + port);
});

twit.stream('statuses/filter', {
    track: 'node,nodejs,javascript,html5,angular,angularjs',
    language: 'en'
}, function(stream) {
    stream.on('data', function(data) {
        if (data && data.user) {
            var tweet = {
                text: data.text,
                imageUrl: data.user.profile_image_url
            }
            console.log(tweet);
        }

    });
    stream.on('error', function(data) {
        console.log("Error:" + data);
    });
});















