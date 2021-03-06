function Box(x, y, w, h,label) {
    var options = {
        friction: 0,
        frictionAir: 0.2,
        restitution: 0
    }
    this.texture = loadImage("assets/chars/brick-wall.png",function(image){
    	image.resize(50,0);
    });
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
        image(this.texture,-25,-25);
        pop();
    }

}

function Bound(x, y, w, h, label, c) {
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
    //this.c = color('#424242');
    this.c = c;
    World.add(world, this.body);

    this.show = function(ground) {
        let texture = ground;

        push();
        rectMode(CENTER);
        noStroke();
        fill(this.c);
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

function Player(x, y, r, id,char) {
    this.r = r;
    this.id = id;

    var options = {
        friction: 0.06,
        frictionAir: 0.03,
        restitution: 0.1,
        density: 1.5

    }
    this.bombTexture = loadImage("assets/images/bomb.png",function(image){
    	image.resize(50,0);
    });
    this.body = Bodies.rectangle(x, y, r * 2, r * 4, options);
    this.body.label = "player";
    this.body.id = id;
    Matter.Body.setInertia(this.body, Infinity);

	//Matter.Body.setInertia(this.body, 1);
	World.add(world, this.body);
	this.pos = this.body.position;
	this.alive = true;
	this.state = "";
	this.bomb = false;
	this.char = char;
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
			Matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {x: -13, y: 0});
//		console.log("left");
	}
	this.state = "left";
	}

	this.right = function(cooldown){
		if (cooldown == 5) {
			Matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {x: 1, y: 0});
		}else{
		Matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {x: 13, y: 0});
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
		//let sw = 0;
		let state = moving.s;
		let offset = {x: 0, y: 0};
		switch (this.char) {
			case "Brujo":
			state = state[0];
			offset.x = -65;
			offset.y = -65;
			break;

			case "Momia":
			state = state[1];
			offset.x = -45;
			offset.y = -55;
			break;

			case "Maton":
			state = state[2];
			offset.x = -65;
			offset.y = -65;
			break;

			case "Samurai":
			state = state[3];
			offset.x = -55;
			offset.y = -51;
			break;

			default:
			state = state[0];
			offset.x = -65;
			offset.y = -65;

		}
		//console.log(this.alive);
			 if (this.alive == false && this.index == 12) {
			 	this.body.collisionFilter.group = -1;
			// 	sw = 1;
			 }
			// if (sw == 0) {
			
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
				//rect(0,0,this.r*2,this.r*4);
				// stroke(0);
				// rect(0,0,130,130);

				if (moving.d != null) {
					if (moving.d == "L") {
						scale(-1,1);
					}
				}
				//console.log(index);
				//console.log(state);
				if (state != null) {
				if (state[index] != null) {
					//console.log("true");
				//console.log("state["+index+"]"+state[index]);
				//console.log(this.id + "showed");
				image(state[index],offset.x,offset.y);
				if (this.timer == 0) {
					this.index = (index + 1 ) % state.length;
					this.timer = 3;
				}else{
					this.timer = this.timer - 1;
				}
				//image(state[index], 0, 0);
				}
			}
				if (this.bomb == true) {
					image(this.bombTexture, -20,-80);
				}
				//console.log(this.alive);
				//console.log(this.index);
			pop();
		// }else{
		// 	translate(this.pos.x,this.pos.y);
		// 	image(state[12],-65,-65);
		// }
	}
 }

 function setUsername(a){
 	var b = a;
 	console.log(a); 
 }
