var express = require('express');
var app = express();
var server = app.listen(4000);
// const chalk = require('chalk');


app.use(express.static('public'));
app.use( express.static('../assets/chars/Stick Swordman/PNG/PNG Sequences/Small')); 
console.log("Socket Server runnig");

var socket = require('socket.io');
var io = socket(server);
var players = [];

io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log("newConnection" + socket.id);
	let data = {
		id: socket.id,
		p: players
	}
	socket.emit("serverMessage",data);
	socket.broadcast.emit('newplayer',socket.id);

	socket.on('moving', move);
	function move(data){
		//console.log("["+chalk.blue(data.x) +"-"+ chalk.blue(data.y)+"]");
		socket.broadcast.emit('moving', data);
	}

	socket.on('jumping',jump);
	function jump(id){
		socket.broadcast.emit('jumping', id);
	}
	socket.on('gleft',left);
	function left(data){
		socket.broadcast.emit('gleft', data);
	}
	socket.on('gright',right);
	function right(data){
		socket.broadcast.emit('gright', data);
	}
	socket.on('stop', stop);
	function stop(data){
		socket.broadcast.emit('stop', data);
	}

	socket.on('playersupdate', newupdate);
	function newupdate(p){
		socket.broadcast.emit('playersupdate', p);
	}
}