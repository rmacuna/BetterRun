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
var circle;
var cooldown = 0;

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
var lastpos = {x:0, y:0};

function setup () {	
canvas = createCanvas(screen.width, screen.height);
background = loadImage("forest_level.png");

socket = io.connect('http://10.20.57.116:4000');
socket.on('moving', move);
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
	world.gravity.y = 2;

	//input = createInput();
	//input.position(20, 560);

	//button = createButton('submit');
	//button.position(input.x + input.width, 560);
	//button.mousePressed(logPlayer);

	//Set World Bounds
	setWorldBounds();
	
	//Create a player
	circle = new Circle(width/2,height/2,20);
	obstacles.push(circle);

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
	//image(background, 50,50,width-100,height-100);
	fill(255);
	ellipse(data.x,data.y,40);
}


//Renders the world
function draw () {
	image(background, 50,50,width-100,height-100);
	if (LOGEDIN) {
		var data = {
		x: Math.floor(circle.pos.x),
		y: Math.floor(circle.pos.y)
		}
		socket.emit('moving',data);


	//playerData();

	Engine.update(engine, [delta=16.6666], [correction=1])

	if (keyIsDown(UP_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || cooldown == 5) {

	if (keyIsDown(UP_ARROW) && cooldown < 5) {
		circle.jump();
			cooldown++;
	}
	if (keyIsDown(LEFT_ARROW)) {
			circle.left(cooldown);
	}
	if (keyIsDown(RIGHT_ARROW)) {
			circle.right(cooldown);
	}
}else{
	circle.stop();
}	

	for (var i = 0; i < obstacles.length; i++) {
		obstacles[i].show()
	}
	for (var i = 0; i < bounds.length; i++) {
		bounds[i].show();
	}
	for (var i = 0; i < playerPoss.length; i++) {
		var pos = playerPoss[i];
		fill(255);
		ellipse(pos.x,pos.y,40);
	}
}
}

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
	var players =  data.val();
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
