var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var obstacles = [];
var world;
var bottom;
function setup () {
createCanvas(600,600);
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	var options = {
		isStatic: true
	}
	bottom = Bodies.rectangle(300,height, width, 40, options);
	World.add(world,bottom);
}
function mouseDragged(){
obstacles.push(new Box(mouseX,mouseY,20,20));

}

function draw () {
background(51);
for (var i = 0; i < obstacles.length; i++) {
	obstacles[i].show()
}
fill(0);
rectMode(CENTER);
rect(300,height, width, 40);
}