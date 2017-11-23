var Engine = Matter.Engine,
    Events = Matter.Events,
    World = Matter.World,
    Bodies = Matter.Bodies;
//World engine vars
// 192.168.0.15
var engine;
var world;
var bounds = [];
var obstacles = [];

//Player vars
var id = "Roger";
var player = null;
var cooldown = 0;
var players = [];

//firebase vars
var database;
var playerPoss = [];
var socket;
var dead = 0;

//looks vars
var background;
var input;
var button;
var idle = [];
var running = [];
var jumping = [];
var dying = [];

//Game vars
var gamemode;

function setup () {
createCanvas(screen.width,screen.height);
engine = Engine.create();
world = engine.world;
world.gravity.y = 2.5;

 var cookies = document.cookie;
 var splited = cookies.split(";");
 if (splited.length == 5) {
 	splited.splice(0,1);
 }
 let aux = [];
 let char;
 var map;
 for (var i = 0; i < splited.length; i++) {
 	let aux = splited[i].split("=");
 	//console.log(aux[0].trim() == "username");
 	if (aux[0].trim() == "username") {
 		id = aux[1];
 	}
 	//console.log(aux[0].trim() == "char");
 	if (aux[0].trim() == "char") {
 		char = aux[1];
 	}
 	if (aux[0].trim() == "finalmap") {
 		map = aux[1];
 	}
 	if (aux[0].trim() == "finalmode") {
 		let mode = aux[1];
 		switch (mode){
 			case "BombTag":
 			gamemode = 0;
 			break;
 			case "FallingBlocks":
 			gamemode = 1;
 			break;
 		}
 	}
  switch (map) {
    case "Bosque":
      // var audio = document.getElementById('track');
      // //audio.src = "assets/music/BetterRun.mp3";
      // audio.volume = '0.2';
      // audio.loop = true;
      // audio.play();
      break;
    case "Desierto":
      var audio = document.getElementById('track');
      audio.src = "assets/music/DesertMap.mp3";
      audio.volume = '0.2';
      audio.loop = true;
      audio.play();
      break;
    case "Cementerio":
      var audio = document.getElementById('track');
      audio.src = "assets/music/HalloweenMap.mp3";
      audio.loop = true;
      audio.play();
      break;
    case "CuevaHielo":
    var audio = document.getElementById('track');
    audio.src = "assets/music/Cave.mp3";
    audio.volume = '0.2';
    audio.loop = true;
    audio.play();
      break;
    case "Espacio":
      var audio = document.getElementById('track');
      audio.src = "assets/music/SpaceMap.mp3";
      audio.volume = '0.2';
      audio.playbackRate = 1.1;
      audio.loop = true;
      audio.play();
      break;
    case "Libertalia":
      var audio = document.getElementById('track');
      audio.src = "assets/music/spaceship.mp3";
      audio.volume = '0.2';
      audio.loop = true;
      audio.play();
      break;
  }
 }
socket = io.connect('http://192.168.0.12:4000', { query: "id="+id });
//socket = io.connect('http://192.168.0.12:4000');	
socket.emit('gamemode', gamemode);
socket.on('newplayer', newPlayer);
socket.on('startingPosition',function(data){
	//id = "Roger";
	console.log(data);
	console.log(id);
	console.log(data.id == "Roger");
	for (var i = 0; i < data.length; i++) {
		let current = data[i];		
		if (current.id == id) {
			if (player == null) {
			player = new Player(current.x,current.y,20,id);
			console.log(player);
			players.push(player);
			}
		}else{
			let sw = 0;
			for (var i = 0; i < players.length; i++) {
				if (current.id == players[i].id) {
					sw = 1;
				}
			}
			if (sw == 1) {
				console.log("Ya tengo a este jugador");
			}else{
				let np = new Player(current.x,current.y,20,current.id);
				console.log(np);
				players.push(np);
			}
		}
	}
});
	

socket.on('jumping',jump);
socket.on('gleft',left);
socket.on('gright',right);
socket.on('stop', stop);
socket.on('dead',function(data){
	//console.log(data);
	let id = data.id;
	var state = data.state;
	//console.log('stop');
	for (var i = 0; i < players.length; i++) {
		//console.log(players[i].id === id);
		if(players[i].id === id){
			players[i].alive = false;
			players[i].state = data.s;
			//console.log(players[i].id + "-" + players[i].s);
		}
		
	}
});
socket.on('bomb',function(data){
	//console.log(data);
	let p = getPlayerById(data.id);
	p.bomb = data.b;
});
socket.on('block',function(data){
	obstacles.push(new Box(data,-500,50, 50, "block"));
});
socket.on('playersupdate',newupdate);
socket.on('posupdate',posupdate);
socket.on('gamemode', function(g){gamemode = g});
socket.on('gameStart',function(id){
	// console.log("GameStart");
	// console.log(id);
	for (var i = 0; i < players.length; i++) {
		players[i].bomb = false;
	}
	console.log("Player with the bomb" + id);
	let p = getPlayerById(id);
	p.bomb = true;
})          
frameRate(60);
 	//Set Background
 	loadBackground(map);

	//Set World Bounds
	setWorldBounds();

	//Loads animations
	loadAnimations();

	//Loads platformns of the level
	loadPlatforms();

	//Creates falling blocks

	//Checks for collison betewen the player and the floor
	Events.on(engine, 'collisionStart', collision);
	function collision(event){
		var pairs = event.pairs;
		var bA;
		var bB;
		for (var i = 0; i < pairs.length; i++) {
			bA = pairs[i].bodyA;
			bB = pairs[i].bodyB;
			//console.log(bA.velocity.y);
		}
		//console.log(bA.label + Math.round(bA.velocity.y));
		//console.log(bB.label + Math.round(bB.velocity.y));

		if (bA.label == 'player' && bB.label == 'bottom') {
			cooldown = 0;
		}
		if (bB.label == 'player' && bA.label == 'bottom') {
			cooldown = 0;
		}
		
		if (bA.label == 'player' && bA.id == player.id && bB.label == 'block') {
			//console.log("dead");
			 player.alive = false;
			 
		}
		if (bB.label == 'player' && bB.id === player.id && bA.label == 'block') {
			//console.log("dead");
			 player.alive = false;
		}

		 //console.log(bA);
		 //console.log(bB);
		if (bA.label == 'player' && bA.id != bB.id && bB.label == 'player') {
			bA = getPlayerById(bA.id);
			bB = getPlayerById(bB.id);
			let c;
			let s;
			let sw = true;
			if (bA.id == player.id){
				p = bA; 
				s = bB;
			}
				else if(bB.id == player.id){ 
					p = bB; 
					s = bA;
				}else{
					console.log("Not mi player");
					sw = false;
				}
				if (sw) {
			if (bA.bomb == true || bB.bomb == true){
				 //console.log("Pass the bomb");
					makeBombSoundCounter();
					if (p.bomb == false){
						p.bomb = true;
						let data = {
							id: p.id,
							b: p.bomb
						}
						setTimeout(function(){
							socket.emit('bomb',data);
						},500);
						 
						
					}else{
            			makeBombSoundCounter();
						p.bomb = false;
						let data = {
							id: p.id,
							b: p.bomb
						}
						 setTimeout(function(){
							socket.emit('bomb',data);
						},500); 
					} 
				}
			}
		}
	}
  
  function makeBombSoundCounter(){
    var a = document.getElementById('explotionCounter');
    a.load();
    a.volume = 0.02
    a.play();
  }
	setInterval(function(){
		let bomb;
		//console.log(player.id+ "-" + player.bomb);
		if (player.bomb != null) {
			bomb = player.bomb;
		}
		let data = {
			b: player.bomb,
			pos: player.pos,
			id: player.id
		};
		socket.emit('posupdate',data);
	},2000);

	var speed = 800;
	var blocks = 1;
	var winner = false;
	function fallingBlocks(callback, factor){
    var internalCallback = function(counter) {
        return function() {
            if (winner == false) {
            	if (counter > 0) {
            		counter = counter - factor;
            	}else{
            		counter = 100;
            	}
                window.setTimeout(internalCallback, counter);
                callback();
            }
        }
    }(speed);

    window.setTimeout(internalCallback, factor);
};

// console.log() requires firebug
console.log("Gamemode" + gamemode);
if (gamemode == 1) {    
fallingBlocks(function(){
		var Xpos = [];
		for (var i = 0; i < Math.floor(blocks); i++) {
		let x = (0 + (int)(Math.random() * 26))*50;
		let sw = 0;
		while(sw == 0){
			var same = false;
			for (var j = 0; j < Xpos.length; j++) {
				if(Xpos[i] == x){
					same = true;
				}
			}
			if (same) {
				x = (0 + (int)(Math.random() * 26))*50;
			}else{
				sw = 1;
			}
		}
			Xpos.push(x); 
		}
		for (var i = 0; i < Xpos.length; i++) {
			socket.emit('block',Xpos[i]);
			//obstacles.push(new Box(Xpos[i],0,50, 50, "block"));
		}
}, 10);
}		
}
if (gamemode == 1) {
	setTimeout(function(){socket.emit('gameStart');},5000);	
}


//Renders the world
function draw () {
	let nw = ((((window.innerWidth-1300)/1300).toFixed(2))/1);
	let nh = ((((window.innerHeight-731)/731).toFixed(2))/1);
	//console.log("nw: "+(1+nw)+" "+"nh: "+(1+nh));
	scale(1+nw,1+nh);
	// if (player != null) {
	// 	console.log("Dibujar");
	// }else{
	// 	console.log("No dibujar");
	// }

	 if (player != null) {
	image(background,0,0,1300,731);
	//playerData();

	Engine.update(engine, [delta=16.6666], [correction=1])
	if (player.alive) {
	if (keyIsDown(UP_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || cooldown == 5) {

	if (keyIsDown(UP_ARROW) && cooldown < 5) {
		socket.emit('jumping',player.id);
		player.jump();
			cooldown++; 
	}
	if (keyIsDown(LEFT_ARROW)) {
		let data = {
		cd: cooldown,
		id: player.id
		}
		socket.emit('gleft',data);
			player.left(cooldown);
	}
	if (keyIsDown(RIGHT_ARROW)) {
		let data = {
		cd: cooldown,
		id: player.id
		}
		socket.emit('gright',data);
			player.right(cooldown);
	}
}else{
	let data = {
		id: player.id
		}
	socket.emit('stop',data);
	let s = (player.body.velocity.y);
	//console.log(s);s
	player.stop(s);
}
}else{
	let data = {
		id: player.id,
		s: "dead"
	}
	socket.emit('dead',data);
	player.state = "dead";

}
	//console.log(player.id+ "-" + player.bomb);
	for (var i = 0; i < bounds.length; i++) {
		bounds[i].show();
	}

	for (var i = 0; i < obstacles.length; i++) {
		obstacles[i].show();
		if (obstacles[i].label == "block") {
			if (obstacles[i].isOfScreen) {
			obstacles.splice(i,1);
			i--;
		}
		}
	}

	for (var i = 0; i < players.length; i++) {
		let state;
		//console.log(players[i]);
		switch(players[i].state) {
    case "jump":
        state = {s:jumping};
        break;
    case "left":
        state = {s:running, d:"L"};
        break;
   	case "right":
   		state = {s:running, d:"R"};
        break;
    case "dead":
    	state = {s: dying};
    	break;
    default:
        state = {s:idle};
}	
		let index = players[i].index;
		//console.log(state);
		players[i].show(state, index);
	}
 }
}
//end of draw	

//Sets world bounds
function setWorldBounds(){
	let w = 1300;
	let h = 731;
	bounds.push(new Bound(w/2,h+45,w    , 100, "bottom"));
	bounds.push(new Bound(w/2,-50    ,w    , 100, "top"));
	bounds.push(new Bound(w+50  ,h/2  ,100  , h, "right"));
	bounds.push(new Bound(-50  ,h/2  ,100  , h, "left"));
	World.add(world,bounds);

}

function newPlayer(data){
	console.log("new player");
	newplayer = new Player(data.x,data.y,20,data.id);
	players.push(newplayer);
	socket.emit('playersupdate', players);
}

function newupdate(p){
	//console.log(p);
	let sw;
	for (var i = 0; i < p.length; i++) {
		sw = false;
		for (var j = 0; j < players.length; j++) {
			if (p[i].id === players[j].id) {
				sw = true;
			}
		}
		if (sw == false) {
			//console.log("We dont have the player with id: " + p[i]);
			let np = new Player(p[i].pos.x,p[i].pos.y,p[i].id);
			players.push(np);
		}
}
}

function posupdate(data){
	let id = data.id;
	let pos = data.pos;
	for (var i = 0; i < players.length; i++) {
		if (players[i].id == id) {
			Matter.Body.setPosition(players[i].body,pos);
			players[i].bomb = data.b;
		}
	}

}

function jump(id){
	for (var i = 0; i < players.length; i++) {
		if(players[i].id === id){
			players[i].jump();
		}
	}
}
function left(data){
	let id = data.id;
	let coold = data.cd;
	//console.log('left');
	for (var i = 0; i < players.length; i++) {
		if(players[i].id === id){
			players[i].left(coold);
		}
	}
}
function right(data){
	let id = data.id;
	let coold = data.cd;
	//console.log('right');
	for (var i = 0; i < players.length; i++) {
		if(players[i].id === id){
			players[i].right(coold);
		}
	}
}

function stop(data){
	let id = data.id;
	//console.log('stop');
	for (var i = 0; i < players.length; i++) {
		if(players[i].id === id){
			let s = (players[i].body.velocity.y);
			players[i].stop(s);
		}
	}
}

function dead(data){
	console.log("Player "+ data.id + " dead");
	
}

// Para el samurai

function loadAnimations(){
	for (var i = 0; i < 9; i++) {
		loadImage("assets/chars/Wizard/PNG Sequences/Idle/Idle_00"+i+".png", loadi);
	}
	for (var i = 10; i < 17; i++) {
		loadImage("assets/chars/Wizard/PNG Sequences/Idle/Idle_0"+i+".png", loadi);

	}
	function loadi(image){
		//console.log(image);
		image.resize(130,0);
		idle.push(image);
	}


	for (var i = 0; i < 9; i++) {
		loadImage("assets/chars/Wizard/PNG Sequences/Running/Running_00"+i+".png", loadr);
	}
	for (var i = 10; i < 11; i++) {
		loadImage("assets/chars/Wizard/PNG Sequences/Running/Running_0"+i+".png", loadr);

	}
	function loadr(image){
		//console.log(image);
		image.resize(130,0);
		running.push(image);
	}


	for (var i = 0; i < 5; i++) {
		loadImage("assets/chars/Wizard/PNG Sequences/Jump Loop/Jump loop_00"+i+".png", loadj);
	}
	function loadj(image){
		//console.log(image);
		image.resize(130,0);
		jumping.push(image);
	}

	for (var i = 0; i < 9; i++) {
		loadImage("assets/chars/Wizard/PNG Sequences/Dying/Dying_00"+i+".png", loadd);
	}
	for (var i = 10; i < 14; i++) {
		loadImage("assets/chars/Wizard/PNG Sequences/Dying/Dying_0"+i+".png", loadd);

	}
	function loadd(image){
		//console.log(image);
		image.resize(130,0);
		dying.push(image);
	}

}

function loadBackground(map){
	let maps = getMaps();
	let image;
	for (var i = 0; i < maps.length; i++) {
			if (maps[i].name == map) {
				image = maps[i].image;
			}
		}	
	background = loadImage(image);
}

function loadPlatforms() {
	let space = 200;
	createPlatform(150    ,(731/2)-space   ,300);
	createPlatform(1150   ,(731/2)-space   ,300);
	createPlatform(1150   ,(731/2)+space   ,300);
	createPlatform(150    ,(731/2)+space   ,300);
	createPlatform((1300/2),(731/2), 400);

	World.add(world,obstacles);
}

function createPlatform(x,y,w){
	obstacles.push(new Bound(x,y-17,w, 25, "bottom"));
	obstacles.push(new Bound(x,y,w, 25, "platform"));
}

function getPlayerById(id){
	for (var i = 0; i < players.length; i++) {
		if (players[i].id == id) {
			return players[i];
		}
	}
}