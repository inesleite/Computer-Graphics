/*global THREE, requestAnimationFrame, console*/
var table;

var camera, scene, renderer;

var clock;

var geometry, material, mesh;

function createTable(x, y, z) {
	'use strict';
	var geometry = new THREE.CubeGeometry(1100, 0, 700);
	var material = new THREE.MeshBasicMaterial({ color: 0xe6e6e6});
	table = new THREE.Mesh(geometry, material);
	table.position.set(x, y, z);
	scene.add(table);
}


function createScene() {
	'use strict';
	scene = new THREE.Scene();
	createTable(0, -1, 0);

	generateShip();
	generateAliens();
}

function onResize() {
	'use strict';
	
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerHeight > 0 && window.innerWidth > 0) {
		if (camera instanceof THREE.OrthographicCamera){
			orthographicCameraTest()
		}
		else {
			camera.aspect = window.innerWidth / window.innerHeight; 
		}
		camera.updateProjectionMatrix();
	}
}

function onKeyUp(e) {
	'use strict';
	switch(e.keyCode) {
	case 37: // left arrow key
		ship.resetSpeed();
		break;
	case 39: // right arrow key
		ship.resetSpeed();
		break;
}

}

function onKeyDown(e) {
	'use strict';

	switch (e.keyCode) {
	case 65: //A
	case 97: //a
		ship.changeWireframe();
		aliens.forEach(function(alien){
			alien.changeWireframe();
		});
		table.material.wireframe = !table.material.wireframe;
		break;
	case 67: //C
	case 99: //c
		if (camera instanceof THREE.PerspectiveCamera) {
			orthographicCameraTest();
		}
		else{
			perspectiveCameraStandard();
		}
		break;
	case 90: //Z
	case 122: //z
		perspectiveCameraLeftView();
		break;
	case 88: //X
	case 120: //x
		perspectiveCameraRightView();
		break;
	case 89: //Y
	case 121: //y
		perspectiveCameraBackView();
		break;

	case 37: // left arrow key
		ship.accelerating = "yes";
		ship.movementType = "left";
		break;
	case 39: // right arrow key
		ship.accelerating = "yes";
		ship.movementType = "right";
		break;
	}	

}

function render() {
	'use strict';
	renderer.render(scene, camera);
}

function init() {
	'use strict';
	clock = new THREE.Clock()
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	render();

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("resize", onResize);
}

function animate() {
	'use strict';
	ship.executeMovement();
	render();
	requestAnimationFrame(animate);
}