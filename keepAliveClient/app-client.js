console.log("Starting app-client.js (id=2013-01-26T21:16:46.741Z).")

var config = require('./config');

function handler (req, res) {
  console.log("The url of the request is "+req.url);
}

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , port = process.env.PORT || 80;

app.listen(port);
console.log("Listening (unnecessarily) on port "+port);

// FROM STACKOVERFLOW
var io = require('socket.io-client'),

//socket = io.connect('localhost', {port:5000});

//[] 
socket = io.connect(config.keepAliveServer);

socket.on('connect', function () { 
	console.log("This is the app-client, and my socket is connected"); 
	console.log("socket is ",socket);
});

socket.on('disconnect', function () {
	console.log("OMG, for some reason I was disconnected! It is now "+ new Date().toJSON());
});

socket.emit('private message', { user: 'me', msg: 'whazzzup?' });

