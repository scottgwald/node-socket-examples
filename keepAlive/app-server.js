console.log("Starting app-server.js (id=2013-01-26T21:17:37.171Z).")

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , port = process.env.PORT || 80;

app.listen(port);
console.log("Listening on port "+port);

function handler (req, res) {
  console.log("The url of the request is "+req.url);
}

io.sockets.on('connection', function (socket) {
  console.log("This is app-server, and I'm connected to someone.");
});
