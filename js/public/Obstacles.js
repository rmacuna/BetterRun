function Box(x,y,w,h){
	var options = {
		friction: 0.1,
		restitution: 1

	}
	this.body = Bodies.rectangle(x, y, w, h, options);
	this.w = w;
	this.h = h;
	World.add(world, this.body);

	this.show = function(){
		var pos = this.body.position;
		var angle = this.body.angle;

		push();
		translate(pos.x,pos.y);
		rectMode(CENTER);
		rotate(angle);
		strokeWeight(1);
		stroke(255);
		fill(127);
		rect(0,0,this.w,this.h);
		pop();
	}

 }

 function Bound(x,y,w,h,label){
 	var options = {
		friction: 0.1,
		isStatic: true 

	}
	this.body = Bodies.rectangle(x, y, w, h, options);
	this.body.label = label;
	this.w = w;
	this.h = h;
	World.add(world, this.body);

	this.show = function(){
		var pos = this.body.position;

		push();
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		var c = color('#424242');
		fill(c);
		rect(pos.x,pos.y,this.w,this.h);
		pop();
	}
}

	function Player(x,y,r,id){
		this.r = r;
		this.id = id;

		var options = {
		friction: 0.1,
		restitution: 0, 
		density: 1.5
	}

	this.body = Bodies.circle(x, y, r, options);
	this.body.label = "player";

	//Matter.Body.setInertia(this.body, 1);
	World.add(world, this.body);
	this.pos = this.body.position;
	this.state = "";
	this.index = 0;
	this.prevstate = "Idle";
	this.jump = function(){
		Matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {x: 0, y: -20});
		this.state = "jump";
//		console.log("Jump");
	}
	this.left = function(cooldown){
		if (cooldown == 5) {
			Matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {x: -1, y: 0});
		}else{
			Matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {x: -10, y: 0});
//		console.log("left");
	}
	this.state = "left";
	}
	this.right = function(cooldown){
		if (cooldown == 5) {
			Matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {x: 1, y: 0});
		}else{
		Matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {x: 10, y: 0});
	}
	this.state = "right";
//		console.log("right");
	}
	this.stop = function(){
		Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
		this.state = "stop";
	}

	this.show = function(moving, index){
		let state = moving.s;
		if (this.prevstate != this.state) {
			this.index = 0;
			this.prevstate = this.state;
		}
		push();
		translate(this.pos.x,this.pos.y);
		strokeWeight(1);
		stroke(255);
		var c = color('#00B300');
		fill(c);
		ellipse(0,0,this.r*2);

		if (moving.d != null) {
			if (moving.d == "L") {
				scale(-1,1);
			}
		}
		console.log(index);
		console.log(state);
		if (state[index] != null) {
			console.log("true");
		//console.log("state["+index+"]"+state[index]);
		//console.log(this.id + "showed");
		image(state[index], -100, -130);
		this.index = (index + 1 ) % state.length;
		//image(state[index], 0, 0);
		}
		else{
			console.log("false");
		}
		pop();
	}
 }
