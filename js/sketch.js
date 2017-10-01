var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var obstacles = [];
var bounds = [];
var world;
var bottom;
var top;
var left;
var right;
function setup () {
createCanvas(1000,650);
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	var options = {
		isStatic: true
	}
	//Set World Bounds
	bounds.push(new Bound(width/2,height  ,width, 10, options));
	bounds.push(new Bound(width/2,0       ,width ,10, options));
	bounds.push(new Bound(width  ,height/2,10, height, options));
	bounds.push(new Bound(0      ,height/2,10, height, options));
	World.add(world,bounds);
}
function mouseDragged(){
obstacles.push(new Box(mouseX,mouseY,20,20));

}

function draw () {
background(51);
for (var i = 0; i < obstacles.length; i++) {
	obstacles[i].show()
}
for (var i = 0; i < bounds.length; i++) {
	bounds[i].show();
}
}