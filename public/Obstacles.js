function Box(x, y, w, h,label) {
    var options = {
        friction: 0,
        restitution: 0
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.body.label = label;
    this.pos = this.body.position;
    this.w = w;
    this.h = h;
    this.body.collisionFilter.group = -1;
   	Matter.Body.setInertia(this.body, Infinity);

    World.add(world, this.body);

    this.isOfScreen = function(){
    	return(this.pos.y > height + 100);
    	Matter.World.remove(world, this.body)
    }

    this.show = function() {
        
        var angle = this.body.angle;

        push();
        translate(this.pos.x, this.pos.y);
        rectMode(CENTER);
        rotate(angle);
        stroke(0);
        fill(0);
        rect(0, 0, this.w, this.h);
        pop();
    }

}

function Bound(x, y, w, h, label) {
    var options = {
        friction: 0.01,
        isStatic: true

    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.body.label = label;
    this.body.collisionFilter.group = -1;
    this.pos = this.body.position;
    this.w = w;
    this.h = h;
    World.add(world, this.body);

    this.show = function(ground) {
        let texture = ground;

        push();
        rectMode(CENTER);
        stroke(0);
        var c = color('#424242');
        fill(c);
        rect(this.pos.x, this.pos.y, this.w, this.h);
        //console.log(texture);
        if (texture != null) {
        image(texture[0],this.pos.x-100,this.pos.y);
        //image(texture[1],this.pos.x,this.pos.y);
        //image(texture[2],this.pos.x+100,this.pos.y);
    }
        pop();
    }
}

function Player(x, y, r, id) {
    this.r = r;
    this.id = id;

    var options = {
        friction: 0.06,
        frictionAir: 0.03,
        restitution: 0.1,
        density: 1.5

    }

    this.body = Bodies.rectangle(x, y, r * 2, r * 4, options);
    this.body.label = "player";
    Matter.Body.setInertia(this.body, Infinity);

	//Matter.Body.setInertia(this.body, 1);
	World.add(world, this.body);
	this.pos = this.body.position;
	this.state = "";
	this.index = 0;
	this.timer = 0;
	this.prevstate = "Idle";
	this.jump = function(){
		Matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {x: 0, y: -85});
		this.state = "jump";
//		console.log("Jump");
	}
	this.left = function(cooldown){
		if (cooldown == 5) {
			Matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {x: -1, y: 0});
		}else{
			Matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {x: -11, y: 0});
//		console.log("left");
	}
	this.state = "left";
	}
	this.right = function(cooldown){
		if (cooldown == 5) {
			Matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {x: 1, y: 0});
		}else{
		Matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {x: 11, y: 0});
	}
	this.state = "right";
//		console.log("right");
	}
	this.stop = function(s){
		//Matter.Body.setVelocity(this.body, { x: 0, y: (s+1) });
		Matter.Body.setVelocity(this.body, { x: 0, y: (s+0.5) });
		this.state = "stop";
	}

	this.show = function(moving, index){
		let state = moving.s;
		if (this.prevstate != this.state) {
			this.index = 0;
			this.prevstate = this.state;
		}
		let angle = this.body.angle;
		push();
		translate(this.pos.x,this.pos.y);
		strokeWeight(2);
		
		//var c = color('#00B300');
		noFill();
		rotate(angle);
		rectMode(CENTER);

		stroke(255);
		rect(0,0,this.r*2,this.r*4);

		// stroke(0);
		// rect(0,0,130,130);

		if (moving.d != null) {
			if (moving.d == "L") {
				scale(-1,1);
			}
		}
		//console.log(index);
		//console.log(state);
		if (state[index] != null) {
			//console.log("true");
		//console.log("state["+index+"]"+state[index]);
		//console.log(this.id + "showed");
		image(state[index],-65,-65);
		if (this.timer == 0) {
			this.index = (index + 1 ) % state.length;
			this.timer = 3;
		}else{
			this.timer = this.timer - 1;
		}
		//image(state[index], 0, 0);
		}
		else{
			console.log("false");
		}
		pop();
	}
 }

 function setUsername(a){
 	var b = a;
 	console.log(a); 
 }
