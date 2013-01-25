var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , nu = 0 // number of users connected

app.listen(80);
console.log("An example console message33.")

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  //console.log(new Date().toJSON());
  console.log(new Date().toJSON()+"\nIncrementing number of users. \nBefore: "+nu);
  nu += 1;
  console.log("After: "+nu);
  socket.emit('updateUserCount',nu);
  socket.broadcast.emit('updateUserCount', nu);
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  //   socket.broadcast.emit('updateUserCount', nu);
  // });
  socket.on('disconnect', function() {
    nu -= 1
    socket.broadcast.emit('updateUserCount', nu);
    console.log(new Date().toJSON()+"\nDecrementing number of users.")
  });
  //socket.on('getNumberOfUsers', function() {socket.emit(nu)});
});
