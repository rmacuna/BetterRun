var Engine = Matter.Engine,
    Events = Matter.Events,
    World = Matter.World,
    Bodies = Matter.Bodies;
//World engine vars
var engine;
var world;
var bounds = [];
var obstacles = [];

//Player vars
var circle;
var cooldown = 0;

//firebase vars
var database;
var playerId = "PlayerOne";

//looks vars
var background;

function setup () {	
createCanvas(1000,600);
background = loadImage("forest_level.png");

var config = {
    apiKey: "AIzaSyCh5orrfctZcJMyiD9pArlUmTdxS5SjSr0",
    authDomain: "betterrun-fce44.firebaseapp.com",
    databaseURL: "https://betterrun-fce44.firebaseio.com",
    projectId: "betterrun-fce44",
    storageBucket: "betterrun-fce44.appspot.com",
    messagingSenderId: "105353570635"
  };

  firebase.initializeApp(config);
  database = firebase.database();
	engine = Engine.create();
	world = engine.world;
	world.gravity.y = 2;

	//Set World Bounds
	setWorldBounds();
	
	//Create a player
	circle = new Circle(width/2,500,20);
	obstacles.push(circle);

	//Checks for collison betewen the player and the floor
	Events.on(engine, 'collisionStart', collision);
	function collision(event){
		var pairs = event.pairs;
		for (var i = 0; i < pairs.length; i++) {
			var lA = pairs[i].bodyA.label;
			var lB = pairs[i].bodyB.label;
		}
		if (lA == 'player' && lB == 'bottom') {
			cooldown = 0;
		}
		if (lB == 'player' && lA == 'bottom') {
			cooldown = 0;
		}
	}

	createPlatforms();

}




//Renders the world
function draw () {
	image(background, 0,0,width,height);

	playerData();

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
}

//Sends the player pos to the database
function playerData(){
	var data = {
		x: circle.pos.x,
		y: circle.pos.y
	}
//	database.ref(playerId).set(data);
}

//Sets world bounds
function setWorldBounds(){
	bounds.push(new Bound(width/2,height  ,width, 100, "bottom"));
	bounds.push(new Bound(width/2,0       ,width ,100, "top"));
	bounds.push(new Bound(width  ,height/2,100, height, "right"));
	bounds.push(new Bound(0      ,height/2,100, height, "left"));
	World.add(world,bounds);

}

function createPlatforms(){

}