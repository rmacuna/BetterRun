var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));
console.log("Socket Server runnig");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log("newConneection" + socket.id);
	socket.on('moving', move);

	function move(data){
		console.log(data);
		socket.broadcast.emit('moving', data);
	}
}