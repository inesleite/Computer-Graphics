var bulletWhiteMaterial = new THREE.MeshBasicMaterial({
	color: 0xffffff
});
var bulletRedMaterial = new THREE.MeshBasicMaterial({
	color: 0xff0000
});

function changeBulletWireframe() {
	bulletWhiteMaterial.wireframe = !bulletWhiteMaterial.wireframe;
	bulletRedMaterial.wireframe = !bulletRedMaterial.wireframe;
}

class Bullet extends GameEntity {
	constructor(x) {
		super();
		this.collidedAlien = 0;
		this.buildBullet(x);
	}
	detectColisions(delta) {
		if (this.position.z - 10 < -345) {
			this.activateColision();
			return;
		} else {
			for (let alien of gameElements) {
				if (alien instanceof Alien) {
					var alien_tentativePosition = alien.getFuturePosition(delta);
					var distance = getDistance(this.position, alien_tentativePosition);
					if (distance <= 25) {
						this.activateColision();
						this.collidedAlien = alien;
						return;
					}
				}
			}
		}
		this.disableColision();
	}
	processColisions() {
		this.removeBullet();
		if (this.collidedAlien != 0) {
			this.collidedAlien.removeAlien();
		}
	}

	removeBullet() {
		gameElements.splice(gameElements.indexOf(this), 1);
		scene.remove(this);
	}
	executeMovement(delta) {
		this.position.z = this.position.z - 10;
	}
	//------make bullet----------------
	buildBullet(x) {
		this.position.set(x, 40, 170);
		scene.add(this);
		this.addBullet();
	}
	addBullet() {
		var geometry = new THREE.CubeGeometry(5, 5, 15);
		var mesh = new THREE.Mesh(geometry, bulletRedMaterial);
		mesh.position.set(0, 0, 0);
		this.add(mesh);
	}
}

function generateBullet(ship) {
	//bullets.push(new Bullet(ship.position.x))
	gameElements.push(new Bullet(ship.position.x))
}