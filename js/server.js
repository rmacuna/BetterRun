var express = require('express');
var app = express();
var server = app.listen(3000, '0.0.0.0');
const chalk = require('chalk');


app.use(express.static('public'));
console.log("Socket Server runnig");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log("newConnection" + socket.id);
	socket.on('moving', move);

	function move(data){
		console.log("["+chalk.blue(data.x) +"-"+ chalk.blue(data.y)+"]");
		socket.broadcast.emit('moving', data);
	}
}