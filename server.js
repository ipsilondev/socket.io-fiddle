
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

io.on('connect', onConnect);
server.listen(port, () => console.log('server listening on port ' + port));

function onConnect(socket){
  console.log('connect ' + socket.id);
  socket.on("req", (o) => {
	 //disabling compression solves the problem
	 //socket.compression(false);
	 //all this combination produce a memory leak 
	 socket.emit('res', Buffer.allocUnsafe(35000)); 
	 //socket.emit('res', Buffer.allocUnsafe(10000).toString()); 
	 
	 //this does NOT produce a memory leak
	 //socket.emit('res', Buffer.alloc(35000)); 
	 //socket.emit('res', Buffer.allocUnsafe(25000)); 
  });

  socket.on('disconnect', () => console.log('disconnect ' + socket.id));
}
