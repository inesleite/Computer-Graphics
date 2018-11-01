var alienRedMaterial = new THREE.MeshBasicMaterial({
	color: 0xff0000
});
var alienGreenMaterial = new THREE.MeshBasicMaterial({
	color: 0x00ff00
});
var alienBlueMaterial = new THREE.MeshBasicMaterial({
	color: 0x0000ff
});
var alienWhiteMaterial = new THREE.MeshBasicMaterial({
	color: 0xffffff
});

function changeAliensWireframe() {
	alienRedMaterial.wireframe = !alienRedMaterial.wireframe;
	alienGreenMaterial.wireframe = !alienGreenMaterial.wireframe;
	alienBlueMaterial.wireframe = !alienBlueMaterial.wireframe;
	alienWhiteMaterial.wireframe = !alienWhiteMaterial.wireframe;
}

class Alien extends GameEntity {
	constructor(x, y, z) {
		super(x, y, z);
		this.speedMultiplier = 250;
		this.speed_x = 0
		this.speed_z = 0;
		this.colision = false;
		this.buildAlien(x, y, z);
		this.generateRandomSpeed();
	}

	// Alien randomized speed methods
	generateRandomSpeed() {
		var rand_x = this.getRandomFloatSpeed(-1, 1);
		var rand_z = this.getRandomFloatSpeed(-1, 1);
		var normalized_speed_x = rand_x / this.getSpeedVectorLength(rand_x, rand_z);
		var normalized_speed_z = rand_z / this.getSpeedVectorLength(rand_x, rand_z);
		this.speed_x = normalized_speed_x * this.speedMultiplier;
		this.speed_z = normalized_speed_z * this.speedMultiplier;
	}
	getRandomFloatSpeed(min, max) {
		return Math.random() * (max - min + 1) + min;
	}
	getSpeedVectorLength(vector_x, vector_z) {
		return Math.pow(Math.pow(vector_x, 2) + Math.pow(vector_z, 2), 0.5);
	}
	checkLeftRightLimitsColision() {
		if (this.position.x > 520) {
			this.speed_x = -this.speed_x;
			this.position.x = 520;
		} else if (this.position.x < -520) {
			this.speed_x = -this.speed_x;
			this.position.x = -520;
		}
	}
	checkTopBottomLimitsColision() {
		if (this.position.z > 100) {
			this.speed_z = -this.speed_z;
			this.position.z = 100;
		} else if (this.position.z < -330) {
			this.speed_z = -this.speed_z;
			this.position.z = -330;
		}
	}

	// Alien Colisions
	getFuturePosition(delta) {
		var temp_position_x = this.position.x + this.speed_x * delta;
		var temp_position_z = this.position.z + this.speed_z * delta;
		return {
			x: temp_position_x,
			y: this.position.y,
			z: temp_position_z
		};
	}
	detectColisions(delta) {
		var tentativePosition = this.getFuturePosition(delta);
		for (let alien of gameElements) {
			if (alien instanceof Alien && alien != this) {
				var other_tentativePosition = alien.getFuturePosition(delta);
				var distance = getDistance(tentativePosition, other_tentativePosition);
				if (distance <= 60) {
					this.activateColision();
					alien.activateColision();
					return;
				}
			}
		}
		this.disableColision();
	}

	processColisions() {
		this.speed_x = -this.speed_x;
		this.speed_z = -this.speed_z;
		this.disableColision();
	}
	executeMovement(delta) {
		if (aliens_moving) {
			this.position.x += this.speed_x * delta;
			this.position.z += this.speed_z * delta;
			this.checkLeftRightLimitsColision();
			this.checkTopBottomLimitsColision();
		}
	}
	removeAlien() {
		gameElements.splice(gameElements.indexOf(this), 1);
		scene.remove(this);
	}

	// Alien construction methods
	buildAlien(x, y, z) {
		scene.add(this);
		this.addHead();
		this.addBody();
		this.addArms();
		this.addAntenas();
		this.addTeeths();
	}
	addHead() {
		var geometry = new THREE.CubeGeometry(50, 30, 30);
		var mesh = new THREE.Mesh(geometry, alienGreenMaterial);
		mesh.position.set(0, 0, 0);
		this.add(mesh);
	}
	addBody() {
		var geometry = new THREE.CubeGeometry(30, 40, 30);
		var mesh = new THREE.Mesh(geometry, alienRedMaterial);
		mesh.position.set(0, -35, 0);
		this.add(mesh)
	}
	addArms() {
		var geometry = new THREE.CubeGeometry(10, 10, 30);
		var mesh_left = new THREE.Mesh(geometry, alienGreenMaterial);
		var mesh_right = new THREE.Mesh(geometry, alienGreenMaterial);
		mesh_left.position.set(-15, -25, 20);
		mesh_right.position.set(15, -25, 20);
		this.add(mesh_left)
		this.add(mesh_right)
	}
	addTeeths() {
		var geometry = new THREE.CubeGeometry(5, 25, 10);
		var mesh_left = new THREE.Mesh(geometry, alienBlueMaterial);
		var mesh_right = new THREE.Mesh(geometry, alienBlueMaterial);
		mesh_left.position.set(-5, 5, 20);
		mesh_right.position.set(5, 5, 20);
		this.add(mesh_left)
		this.add(mesh_right)
	}
	addAntenas() {
		var geometry = new THREE.CubeGeometry(2, 30, 2);
		var mesh_left = new THREE.Mesh(geometry, alienWhiteMaterial);
		var mesh_right = new THREE.Mesh(geometry, alienWhiteMaterial);
		mesh_left.position.set(-10, 20, 0);
		mesh_right.position.set(10, 20, 0);
		this.add(mesh_left)
		this.add(mesh_right)
	}
}

function generateAliens() {
	gameElements.push(new Alien(-200, 50, -250));
	gameElements.push(new Alien(-100, 50, -250));
	gameElements.push(new Alien(0, 50, -250));
	gameElements.push(new Alien(100, 50, -250));
	gameElements.push(new Alien(200, 50, -250));

	gameElements.push(new Alien(-200, 50, -150));
	gameElements.push(new Alien(-100, 50, -150));
	gameElements.push(new Alien(0, 50, -150));
	gameElements.push(new Alien(100, 50, -150));
	gameElements.push(new Alien(200, 50, -150));
}