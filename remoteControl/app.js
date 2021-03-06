var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , sharedVar = 10 

app.listen(80);
console.log("Starting the app (id=2013-01-25T00:55:32.044Z).")

function handler (req, res) {
  console.log("The url of the request is "+req.url);
  if ((req.url === "/") || (req.url === "/index.html")) {
    fs.readFile(__dirname + '/index.html',
      function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
      });
  } else if (req.url === "/dashboard.html") {
    fs.readFile(__dirname + '/dashboard.html',
      function(err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading dashboard.html');
        }
        res.writeHead(200);
        res.end(data);
      }
    );
  }
}

function increment() {
  console.log("Calling increment33.");
  sharedVar +=1;
}

function decrement() {
  console.log("Calling decrement33.");
  sharedVar -=1;
}

io.sockets.on('connection', function (socket) {
  function updateAllSockets() {
    socket.emit('updateSharedVariable',sharedVar);
    socket.broadcast.emit('updateSharedVariable', sharedVar);
  }
  socket.on('upArrow', function() {increment(); updateAllSockets();});
  socket.on('downArrow',function() {decrement(); updateAllSockets();});
});
