var Engine = Matter.Engine,
    Events = Matter.Events,
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
var circle;
var cooldown = 0;
function setup () {
createCanvas(1000,650);
	engine = Engine.create();
	world = engine.world;
	world.gravity.y = 2;
	//Engine.run(engine);
	//Set World Bounds
	bounds.push(new Bound(width/2,height  ,width, 100, "bottom"));
	bounds.push(new Bound(width/2,0       ,width ,100, "top"));
	bounds.push(new Bound(width  ,height/2,100, height, "right"));
	bounds.push(new Bound(0      ,height/2,100, height, "left"));
	World.add(world,bounds);
	circle = new Circle(width/2,50,20);
	console.log(circle);
	obstacles.push(circle);

	Events.on(engine, 'collisionStart', collision);
	function collision(event){
		var pairs = event.pairs;
		for (var i = 0; i < pairs.length; i++) {
			var lA = pairs[i].bodyA.label;
			var lB = pairs[i].bodyB.label;
		}
		console.log(lA,lB);
		if (lA == 'player' && lB == 'bottom') {
			console.log("Impact");
			cooldown = 0;
		}
		if (lB == 'player' && lA == 'bottom') {
			console.log("Impact");
			cooldown = 0;
		}
	}

}
/*function mouseDragged(){
obstacles.push(new Box(mouseX,mouseY,20,20));

}*/


function draw () {
	Engine.update(engine, [delta=16.6666], [correction=1])
	if (keyIsDown(UP_ARROW) && cooldown < 5) {
		circle.jump();
		cooldown++;
	}
	if (keyIsDown(LEFT_ARROW)) {
		circle.left();
	}
	if (keyIsDown(RIGHT_ARROW)) {
		circle.right();
	}
background(51);
for (var i = 0; i < obstacles.length; i++) {
	obstacles[i].show()
}
for (var i = 0; i < bounds.length; i++) {
	bounds[i].show();
}
}