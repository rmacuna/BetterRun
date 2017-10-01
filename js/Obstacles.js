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

 function Bound(x,y,w,h){
 	var options = {
		friction: 0.1,
		isStatic: true 

	}
	this.body = Bodies.rectangle(x, y, w, h, options);
	this.w = w;
	this.h = h;
	World.add(world, this.body);

	this.show = function(){
		var pos = this.body.position;

		push();
		rectMode(CENTER);
		strokeWeight(1);
		stroke(255);
		fill(0);
		rect(pos.x,pos.y,this.w,this.h);
		pop();
	}

 }
