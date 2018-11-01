var ship;
var shipRedMaterial = new THREE.MeshBasicMaterial({
	color: 0xff0000
});
var shipGreenMaterial = new THREE.MeshBasicMaterial({
	color: 0x00ff00
});
var shipBlueMaterial = new THREE.MeshBasicMaterial({
	color: 0x0000ff
});
var shipWhiteMaterial = new THREE.MeshBasicMaterial({
	color: 0xffffff
});

function changeShipWireframe() {
	shipRedMaterial.wireframe = !shipRedMaterial.wireframe;
	shipGreenMaterial.wireframe = !shipGreenMaterial.wireframe;
	shipBlueMaterial.wireframe = !shipBlueMaterial.wireframe;
	shipWhiteMaterial.wireframe = !shipWhiteMaterial.wireframe;
}

class Ship extends GameEntity {
	// Class constructor
	constructor(x, y, z) {
		super(x, y, z);
		this.speed = 0;
		this.acceleration = 250;
		this.brakes = 200;
		this.maxspeed = 400;
		this.minspeed = -this.maxspeed;
		this.accelerating = "no";
		this.acceleratingDirection = "none";
		this.buildShip(x, y, z);
	}

	// Movement methods
	executeMovement(delta) {
		if (this.accelerating == "yes") {
			this.accelerate(delta);
		} else if (this.accelerating == "brake") {
			this.brake(delta);
		}
		this.updatePosition(delta);
	}
	updatePosition(delta) {
		this.position.x = this.position.x + this.speed * delta;
		if (this.position.x > 508) {
			// limit max position
			this.position.x = 508;
			this.speed = 0;
		}
		if (this.position.x < -508) {
			// limit min position
			this.position.x = -508;
			this.speed = 0;
		}
	}
	accelerate(delta) {
		if (this.acceleratingDirection == "left") {
			this.speed = this.speed - (delta * this.acceleration);
		} else if (this.acceleratingDirection == "right") {
			this.speed = this.speed + (delta * this.acceleration);
		}
		if (this.speed > this.maxspeed) {
			// limit max speed
			this.speed = this.maxspeed;
		} else if (this.speed < this.minspeed) {
			// limit min speed
			this.speed = this.minspeed;
		}
	}
	brake(delta) {
		if (this.speed > 0) {
			this.speed = this.speed - (delta * this.brakes);
			if (this.speed < 0) {
				this.speed = 0;
				this.accelerating = "no";
			}
		} else {
			this.speed = this.speed + (delta * this.brakes);
			if (this.speed > 0) {
				this.speed = 0;
				this.accelerating = "no";
			}
		}
	}
	startBraking() {
		this.accelerating = "brake";
	}
	// Ship 3D modelling
	buildShip(x, y, z) {
		scene.add(this);
		this.addShipBody();
		this.addShipWindow();
		this.addShipCannon();
		this.addShipWingConnectors();
		this.addShipWings();
		this.addShipThrusters();
	}
	addShipBody() {
		'use strict';
		var geometry = new THREE.CubeGeometry(35, 40, 100);
		var mesh = new THREE.Mesh(geometry, shipBlueMaterial);
		mesh.position.set(0, 0, 0);
		this.add(mesh);
	}
	addShipWindow() {
		'use strict';
		var geometry = new THREE.CubeGeometry(15, 20, 15);
		var mesh = new THREE.Mesh(geometry, shipGreenMaterial);
		mesh.position.set(0, 15, -25)
		this.add(mesh);
	}
	addShipCannon() {
		'use strict';
		var geometry = new THREE.ConeBufferGeometry(17.5, 40, 15, 6, 6.3);
		geometry.rotateX(4.71);
		var mesh = new THREE.Mesh(geometry, shipRedMaterial);
		mesh.position.set(0, 0, -70);
		this.add(mesh);
	}
	addShipThrusters() {
		var geometry = new THREE.ConeBufferGeometry(7.5, 15, 32, 6, 6.3);
		geometry.rotateX(1.57);
		var mesh_left = new THREE.Mesh(geometry, shipRedMaterial);
		var mesh_right = new THREE.Mesh(geometry, shipRedMaterial);
		mesh_left.position.set(-35, 0, 57.5);
		mesh_right.position.set(35, 0, 57.5);
		this.add(mesh_left);
		this.add(mesh_right);
	}
	addShipWings() {
		'use strict';
		var geometry = new THREE.CubeGeometry(15, 30, 50);
		var mesh_left = new THREE.Mesh(geometry, shipBlueMaterial);
		var mesh_right = new THREE.Mesh(geometry, shipBlueMaterial);
		mesh_left.position.set(-35, 0, 25);
		mesh_right.position.set(35, 0, 25);
		this.add(mesh_left);
		this.add(mesh_right);
	}
	addShipWingConnectors() {
		'use strict';
		var geometry = new THREE.CubeGeometry(15, 20, 12);
		var mesh_left = new THREE.Mesh(geometry, shipGreenMaterial);
		var mesh_right = new THREE.Mesh(geometry, shipGreenMaterial);
		mesh_left.position.set(-22, 0, 30);
		mesh_right.position.set(22, 0, 30);
		this.add(mesh_left);
		this.add(mesh_right);
	}
}

function generateShip() {
	ship = new Ship(0, 40, 250);
	gameElements.push(ship);

}