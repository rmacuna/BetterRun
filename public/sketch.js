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
var id = null;
var lobby = 1;
var LOGEDIN = true;
var player;
var cooldown = 0;
var players = [];

//firebase vars
var database;
var playerPoss = [];
var socket;

//looks vars
var background;
var input;
var button;
var idle = [];
var running = [];
var jumping = [];
var ground = [];

//Game vars
var gamemode = 0;

function setup () {
console.log(screen.width,screen.height);	
createCanvas(screen.width,screen.height);
background = loadImage("forest_level.png");

socket = io.connect('http://192.168.0.12:4000');
socket.on('newplayer', newPlayer);
socket.on("serverMessage", function(d) {
	//console.log(d);
	//player = new Player(width/2,height/2,20,d.id);
	player = new Player(width/2,height/2,20,"Roger");
	console.log(player);
	players.push(player);
	
});
socket.on('jumping',jump);
socket.on('gleft',left);
socket.on('gright',right);
socket.on('stop', stop);
socket.on('playersupdate',newupdate);
socket.on('posupdate',posupdate);          
frameRate(60);
 	engine = Engine.create();
	world = engine.world;
	world.gravity.y = 2.5;

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
	}

	setInterval(function(){
		let data = {
			pos: player.pos,
			id: player.id
		};
		socket.emit('posupdate',data);
	},10000);

	var speed = 800;
	var blocks = 2;
	var winner = false;
	function setDeceleratingTimeout(callback, factor){
    var internalCallback = function(counter) {
        return function() {
            if (winner == false) {
            	if (counter > 0) {
            		counter = counter - factor;
            	}else{
            		counter = 100;
            	}
            	console.log(counter);
                window.setTimeout(internalCallback, counter);
                callback();
            }
        }
    }(speed);

    window.setTimeout(internalCallback, factor);
};

// console.log() requires firebug
if (gamemode == 1) {    
setDeceleratingTimeout(function(){
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
			obstacles.push(new Box(Xpos[i],0,50, 50, "block"));
		}
}, 10);
}

}




//Renders the world
function draw () {
	let nw = ((((window.innerWidth-1300)/1300).toFixed(2))/1);
	let nh = ((((window.innerHeight-731)/731).toFixed(2))/1);
	//console.log("nw: "+(1+nw)+" "+"nh: "+(1+nh));
	scale(1+nw,1+nh);
	if (player != null) {
	image(background,0,0,1300,731);
	if (LOGEDIN) {
	//playerData();

	Engine.update(engine, [delta=16.6666], [correction=1])

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
	//console.log(s);
	player.stop(s);
}

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
    default:
        state = {s:idle};
}	
		let index = players[i].index;
		players[i].show(state, index);
	}

	for (var i = 0; i < playerPoss.length; i++) {
		var pos = playerPoss[i];
		fill(255);
		ellipse(pos.x,pos.y,40);
	}
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

function createPlatforms(){
		console.log("Platforms");
}

function newPlayer(sc){
	console.log("new player");
	newplayer = new Player(width/2,height/2,20,sc);
	players.push(newplayer);
	collectInfo();
}
function collectInfo(){
	let p = [];
	for (var i = 0; i < players.length; i++) {
		console.log(players[i]);
		p.push(players[i].id)
	}
	
	socket.emit('playersupdate', p);
}
function newupdate(p){
	console.log(p);
	let sw;
	for (var i = 0; i < p.length; i++) {
		sw = false;
		for (var j = 0; j < players.length; j++) {
			if (p[i] === players[j].id) {
				sw = true;
			}
		}
		if (sw == false) {
			//console.log("We dont have the player with id: " + p[i]);
			let np = new Player(width/2,height/2,20,p[i]);
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

}

function loadPlatforms() {
	let space = 200;
	createPlatform(150    ,(731/2)-space   ,300);
	createPlatform(1150   ,(731/2)-space   ,300);
	createPlatform(1150   ,(731/2)+space   ,300);
	createPlatform(150    ,(731/2)+space   ,300);
	createPlatform((1300/2),(731/2), 400);

	World.add(world,obstacles);

	for (var i = 1; i < 4; i++) {
		loadImage("assets/textures/desert/Ground 0"+i+".png", loadg);
	}
	function loadg(image){
		ground.push(image);
	}

	
	
}

function createPlatform(x,y,w){
	obstacles.push(new Bound(x,y-17,w, 25, "bottom"));
	obstacles.push(new Bound(x,y,w, 25, "platform"));
}

function setPlayerID(){
	id = getUsName();
}