var aliens = []

class Alien {
	constructor(x, y, z) {
		this.object3d = new THREE.Object3D();
		this.speed = 0;
		this.buildAlien(x, y, z);
	}

	buildAlien(x, y, z) {
		addHead(this.object3d,x,y,z);
		addArm(this.object3d,x,y-25,z,"left");
		addArm(this.object3d,x,y-25,z,"right");
		addBody(this.object3d,x,y,z)
		addAntena(this.object3d,x,y,z,"rifgt");
		addAntena(this.object3d,x,y,z,"left");
		addTeeth(this.object3d,x,y,z,"right");
		addTeeth(this.object3d,x,y,z,"left");
		this.object3d.position.set(x, y, z);
		scene.add(this.object3d);
	}

	changeWireframe() {
		this.object3d.children.forEach(function(item) {
			item.material.wireframe = !item.material.wireframe;
		});
	}

	setPosition(x, y, z) {
		this.object3d.position.set(x, y, z);
	}
}

function addHead(obj,x ,y ,z ){
	var geometry = new THREE.CubeGeometry(50, 30, 30);
	var material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh)
}
function addBody(obj,x,y,z){
	var geometry = new THREE.CubeGeometry(30, 40, 30);
	var material = new THREE.MeshBasicMaterial({ color: 0xff0000});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, 15, z);
	obj.add(mesh)
}
function addArm(obj, x, y, z, side){
	var geometry = new THREE.CubeGeometry(10, 10, 30);
	var material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
	var mesh = new THREE.Mesh(geometry, material);
	if (side == "left") {	mesh.position.set(x-15, y, z+20);	}
	else 				{	mesh.position.set(x+15, y, z+20);	}
	obj.add(mesh);
}
function addAntena(obj, x, y, z,side){
	var geometry = new THREE.CubeGeometry(2, 30, 2);
	var material = new THREE.MeshBasicMaterial({ color: 0xffffff});
	var mesh = new THREE.Mesh(geometry, material);
	if (side=="left")	{	mesh.position.set(x-10, y+20, z);	}
	else				{	mesh.position.set(x+10, y+20, z);	}
	obj.add(mesh);
}
function addTeeth(obj,x,y,z,side){
	var geometry = new THREE.CubeGeometry(5, 25, 10);
	var material = new THREE.MeshBasicMaterial({ color: 0x0000ff});
	var mesh = new THREE.Mesh(geometry, material);
	if (side == "left") {	mesh.position.set(x-5, y+5, z+20);	}
	else		 		{	mesh.position.set(x+5, y+5, z+20);	}
	obj.add(mesh);
}

function generateAliens() {
	aliens.push(new Alien(-125,50,-140));
	aliens.push(new Alien(-75,50,-140));
	aliens.push(new Alien(-25,50,-140));
	aliens.push(new Alien(25,50,-140));
	aliens.push(new Alien(75,50,-140));
	aliens.push(new Alien(125,50,-140));
	
	aliens.push(new Alien(-125,50,-90));
	aliens.push(new Alien(-75,50,-90));
	aliens.push(new Alien(-25,50,-90));
	aliens.push(new Alien(25,50,-90));
	aliens.push(new Alien(75,50,-90));
	aliens.push(new Alien(125,50,-90));
}