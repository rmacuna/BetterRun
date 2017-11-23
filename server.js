var express = require('express');
var app = express();
var server = app.listen(4000);
// const chalk = require('chalk');

app.use(express.static('public'));
app.use( express.static('../assets/chars/Chibi Smaurai 01 (Conical Hat)/PNG/PNG Sequences/Small/')); 
console.log("Socket Server runnig");
var ordenIDS = [];

var startingPositions = [{x: 120,y: 130},{x: 580,y: 330},{x: 168,y: 710},{x: 1200,y: 530}];
var test = ["Roger","Roberto","Daniel","Andrea"];
// var socket = require('socket.io');
// var io = socket(server);
var io = require('socket.io')(server);
var index = 0;
var players = [];
io.use(function(socket, next) {
  var handshakeData = socket.request;
  let id = handshakeData._query['id'];
  //id = test[index];
  ordenIDS[index] = id;
  console.log("id:", id);
  let data = {	
  	x: startingPositions[index].x,
  	y: startingPositions[index].y,
  	id: id
  };
  players.push(data);
  console.log("32 "+ index);
  if (index < 3) {
  	 index++;
  }
  setTimeout(function(){
  	io.sockets.emit('startingPosition',players);
  },1000);
  
  //socket.broadcast.emit('newplayer',data);
  next();
});

io.sockets.on('connection', newConnection);
function newConnection(socket){
	
	console.log("newConnection" + socket.id);

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
	socket.on('dead',dead);
	function dead(data){
		console.log("Player "+ data.id + " dead");
		socket.broadcast.emit('dead',data);
	}

	socket.on('bomb',bomb);
	function bomb(data){
		socket.broadcast.emit('bomb',data);
	}
	socket.on('block',block);
	function block(data){
		io.sockets.emit('block',data);
	}

	socket.on('gameStart',function(){
		console.log('GameStart' + test);
		//console.log(ordenIDS[index]);
		socket.emit('gameStart',"Roger");
	})

	socket.on('playersupdate', newupdate);
	function newupdate(p){
		socket.broadcast.emit('playersupdate', p);
	}

	socket.on('posupdate', posupdate);
    function posupdate(data){
    	socket.broadcast.emit('posupdate',data);
    }

    socket.on('gamemode', gamemode);
    function gamemode(gamemode){
    	socket.broadcast.emit('gamemode',gamemode);
    }
}