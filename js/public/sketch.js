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
var pid;
var players = [];
var sw2 = 0;

//firebase vars
var database;
var playerPoss = [];
var socket;

//looks vars
var background;
var input;
var button;
var moving;
var canvas;
var p2data;
var state;
var idle = [];
var running = [];
var jumping = [];
var index = 0;

function setup () {	
canvas = createCanvas(screen.width, screen.height);
background = loadImage("forest_level.png");
socket = io.connect('http://192.168.0.13:4000');
socket.on('moving', move);
socket.on('newplayer', newPlayer);
socket.on("serverMessage", function(d) {
	//console.log(d);
	player = new Player(width/2,height/2,20,d.id);
	//console.log(player);
	players.push(player);
	
});
socket.on('jumping',jump);
socket.on('gleft',left);
socket.on('gright',right);
socket.on('stop', stop);
socket.on('playersupdate',newupdate);          
frameRate(60);
/*
var config = {
    apiKey: "AIzaSyAQOE_XWSAn7XhLo5eSyCY0LXXVsni_7PQ",
    authDomain: "betterrun-de5ad.firebaseapp.com",
    databaseURL: "https://betterrun-de5ad.firebaseio.com",
    projectId: "betterrun-de5ad",
    storageBucket: "betterrun-de5ad.appspot.com",
    messagingSenderId: "1046055276716"
  };

  firebase.initializeApp(config);
  database = firebase.database();
 */
	engine = Engine.create();
	world = engine.world;
	world.gravity.y = 2.5;

	//input = createInput();
	//input.position(20, 560);

	//Set World Bounds
	setWorldBounds();

	//Loads animations
	loadAnimations();

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

		if (bA.label == 'player' && bA.label == 'bottom') {
			cooldown = 0;
		}
		if (bB.label == 'player' && bA.label == 'bottom') {
			cooldown = 0;
		}
	}

	//createPlatforms();

}

function move(data){
	/*for (var i = 0; i < players.length; i++) {
		if(data.x != null && players[i]!= null){
		if(players[i].id === data.id){
			players[i].pos.x = data.x;
			players[i].pos.y = data.y	
		}
	}
	}*/
	//p2data = data;
}


//Renders the world
function draw () {
	if (player != null) {
	image(background, 50,50,width-100,height-100);
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
	player.stop();
}
	/*let data = {
		x: player.pos.x
		y: player.pos.y
	}	
	socket.emit.('moving', data);*/

	for (var i = 0; i < obstacles.length; i++) {
		obstacles[i].show()
	}
	for (var i = 0; i < bounds.length; i++) {
		bounds[i].show();
	}
	//console.log(state);
	for (var i = 0; i < players.length; i++) {
//		console.log(players.length);
//		console.log(players[i].id);
		//console.log(players[i].state);
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
		//console.log(players[i]);
		index = players[i].index;
		players[i].show(state, index);
	}
	
	//if (sw2 == 0) {
		//index = (index + 1) % state.s.length;
	//	sw2=1;
	//}
	//else{
	//	sw2=0;
	//}

	/*if (p2data != null) {
		fill(255);
		ellipse(p2data.x,p2data.y,40);
	}*/
	for (var i = 0; i < playerPoss.length; i++) {
		var pos = playerPoss[i];
		fill(255);
		ellipse(pos.x,pos.y,40);
	}
}
}
}
//end of draw

//Sends the player pos to the database
function playerData(){
	var data = {
		x: Math.floor(circle.pos.x),
		y: Math.floor(circle.pos.y)
	}
	database.ref(lobby+'/' + id).set(data);
}

function logPlayer(){
	if(input.value() != ""){
	id = input.value();
}
database.ref(lobby+'/').once('value', 
	function(snapshot) { 
		playerLobby(snapshot.numChildren());
	}
);
var ref = database.ref(lobby+'/');
ref.on('value', gotData, errData);
console.log("The user " + id + " is loged in");
	input.value("");
}

function gotData(data){
	let players =  data.val();
	var keys = Object.keys(players);
	var cont = 0;
	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		var x = players[k].x;
		var y = players[k].y;

		if (k != id) {
		playerPoss[cont] = createVector(x, y);
		cont++;
	}
	}
	cont = 0;
}

function errData(err){
	console.log("Error");
	console.log(err);
}

function playerLobby(childs){
	if (childs > 3) {
		lobby++; 
	}
	LOGEDIN = true;
}	

//Sets world bounds
function setWorldBounds(){
	bounds.push(new Bound(width/2,height-100,width, 100, "bottom"));
	bounds.push(new Bound(width/2,0     ,width ,100, "top"));
	bounds.push(new Bound(width  ,height/2,     100, height, "right"));
	bounds.push(new Bound(0    ,height/2,       100, height, "left"));
	World.add(world,bounds);

}

function createPlatforms(){
		console.log("Platforms");
}

function newPlayer(sc){
	console.log("new player");
	newplayer = new Player(width/2,height/2,20,sc);
	players.push(newplayer);
	eupdate();
}
function eupdate(){
	let p = [];
	for (var i = 0; i < players.length; i++) {
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

function jump(id){
	//console.log('jumping');
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
			players[i].stop();
		}
	}
}

function loadAnimations(){
	for (var i = 0; i < 9; i++) {
		loadImage("Animation/Idle/Idle_00"+i+".png", loadi);
	}
	for (var i = 10; i < 31; i++) {
		loadImage("Animation/Idle/Idle_0"+i+".png", loadi);
	}
	function loadi(image){
		//console.log(image);
		idle.push(image);
	}

	for (var i = 0; i < 9; i++) {
		loadImage("Animation/Run/Running_00"+i+".png", loadr);
	}
	for (var i = 10; i < 23; i++) {
		loadImage("Animation/Run/Running_0"+i+".png", loadr);
	}
	function loadr(image){
		//console.log(image);
		running.push(image);
	}

	for (var i = 0; i < 9; i++) {
		loadImage("Animation/Jump/Jumping_00"+i+".png", loadj);
	}
	for (var i = 10; i < 39; i++) {
		loadImage("Animation/Jump/Jumping_0"+i+".png", loadj);
	}
	function loadj(image){
		//console.log(image);
		jumping.push(image);
	}

}