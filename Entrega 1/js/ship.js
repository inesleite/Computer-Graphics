var ship;

class Ship {
	constructor(x, y, z) {
		this.shipobj = new THREE.Object3D();
		this.speed = 0;
		this.acceleration = 250;
		this.brakes = 200;
		this.maxspeed = 400;
		this.minspeed = - this.maxspeed;
		this.accelerating = "no";
		this.movementType = "none";
		this.buildShip(x, y, z);
	}

	buildShip(x, y, z) {
		addShipBody(this.shipobj, x, y, z);
		addShipWingConnector(this.shipobj, x, y, z, "left");
		addShipWingConnector(this.shipobj, x, y, z, "right");
		addShipWing(this.shipobj, x, y, z, "left");
		addShipWing(this.shipobj, x, y, z, "right");
		addShipCannon(this.shipobj, x, y, z);
		addShipWindow(this.shipobj, x, y, z);
		addShipFire(this.shipobj, x, y, z, "left");
		addShipFire(this.shipobj, x, y, z, "right");
		this.shipobj.position.set(x, y, z);
		scene.add(this.shipobj);
	}

	changeWireframe(){
		this.shipobj.children.forEach(function(item){
			item.material.wireframe = !item.material.wireframe;
		});
	}

	updatePosition(delta){
		this.shipobj.position.x = this.shipobj.position.x + this.speed * delta;
		if (this.shipobj.position.x > 508){
			// limit max position
			this.shipobj.position.x = 508;
			this.speed = 0;
		}
		if (this.shipobj.position.x < -508){
			// limit min position 
			this.shipobj.position.x = -508;
			this.speed = 0;
		}
	}

	accelerate(delta){
		if (this.movementType == "left") {
			this.speed = this.speed - (delta * this.acceleration);
		}
		else if (this.movementType == "right") {
			this.speed = this.speed + (delta * this.acceleration);			
		}
		if (this.speed > this.maxspeed) {
			// limit max speed
			this.speed = this.maxspeed;
		}
		else if (this.speed < this.minspeed) {
			// limit min speed
			this.speed = this.minspeed;
		}
	}

	brake(delta){
		console.log("braking......")
		if (this.movementType == "left") {
			this.speed = this.speed + (delta * this.brakes);
			if (this.speed > 0) {
				this.speed = 0;
				this.accelerating = "no";	
			}
		}
		else if (this.movementType == "right") {
			this.speed = this.speed - (delta * this.brakes);			
			if (this.speed < 0) {
				this.speed = 0;
				this.accelerating = "no";	
			}
		}
	}

	resetSpeed(){
		//clock.stop();
		//this.speed = 0;
		if (this.speed == 0) {
			this.accelerating = "no";			
		}
		else {
			this.accelerating = "brake";
		}
		//this.movementType = "none";
	}

	executeMovement(){
		var delta = clock.getDelta();
		//console.log("Delta: ", delta, "|| Speed: ", this.speed, "|| Old x: ", this.shipobj.position.x);
		if(this.accelerating == "yes"){
			console.log("accelerate");
			this.accelerate(delta);
		}
		else if (this.accelerating == "brake") {
			this.brake(delta);
		}
		this.updatePosition(delta);
	}
}

function addShipBody(obj, x, y, z) {
	'use strict';
	var geometry = new THREE.CubeGeometry(35, 40, 100);
	var material = new THREE.MeshBasicMaterial({ color: 0x0000ff});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}
function addShipWingConnector(obj, x, y, z, side) {
	'use strict';
	var geometry = new THREE.CubeGeometry(15, 20, 12);
	var material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
	var mesh = new THREE.Mesh(geometry, material);
	if (side == "left") { mesh.position.set(x - 22, y, z + 30); }
	if (side == "right"){ mesh.position.set(x + 22, y, z + 30); }
	obj.add(mesh)
}
function addShipWing(obj, x, y, z, side){
	'use strict';
	var geometry = new THREE.CubeGeometry(15, 30, 50);
	var material = new THREE.MeshBasicMaterial({ color: 0x0000ff});
	var mesh = new THREE.Mesh(geometry, material);
	if (side == "left") { mesh.position.set(x - 35, y, z + 25); }
	if (side == "right"){ mesh.position.set(x + 35, y, z + 25); }
	obj.add(mesh)
}
function addShipCannon(obj, x, y, z) {
	'use strict';
	var geometry = new THREE.ConeBufferGeometry( 17,40, 15,6,6.3 );
	var material = new THREE.MeshBasicMaterial({ color: 0xff0000});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z - 68)
	obj.add(mesh)
	geometry.rotateX(4.71);
}
function addShipWindow(obj, x, y, z) {
	'use strict';
	var geometry = new THREE.CubeGeometry(15, 20, 15);
	var material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y + 15, z - 25)
	obj.add(mesh);
}

function addShipFire(obj,x,y,z,side ){
	var geometry = new THREE.ConeBufferGeometry( 7,15, 32,6,6.3 );
	var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	var mesh = new THREE.Mesh( geometry, material );
	if (side == "left") { mesh.position.set(x - 36, y, z + 53); }
	if (side == "right"){ mesh.position.set(x + 36, y, z + 53); }
	obj.add(mesh );
	geometry.rotateX(1.57);
}

function generateShip() {
	ship = new Ship(0, 30, 140);
}