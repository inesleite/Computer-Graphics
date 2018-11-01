function createCamera() {
	'use strict';
	orthographicCameraTest();
}
function perspectiveCameraStandard() {
	'use strict';
	camera = new THREE.PerspectiveCamera(65,
		window.innerWidth / window.innerHeight,
		1,
		1500);
	camera.position.x = 0;
	camera.position.y = 300;
	camera.position.z = 550;
	camera.lookAt(scene.position);
}
function orthographicCameraTest() {
	'use strict';
	var viewSize = 400;
  //var height = 350;
  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.OrthographicCamera(viewSize * (- aspect), viewSize * aspect,
  	viewSize , -viewSize, 1, 1000);

  camera.position.x = 0;
  camera.position.y = 400;
  camera.position.z = 0;
  camera.lookAt(scene.position);
}
function perspectiveCameraLeftView() {
	'use strict';
	camera = new THREE.PerspectiveCamera(60,
		window.innerWidth / window.innerHeight,
		1,
		1500);
	camera.position.x = -700;
	camera.position.y = 100;
	camera.position.z = 0;
	camera.lookAt(scene.position);
}
function perspectiveCameraRightView() {
	'use strict';
	camera = new THREE.PerspectiveCamera(60,
		window.innerWidth / window.innerHeight,
		1,
		1500);
	camera.position.x = 700;
	camera.position.y = 100;
	camera.position.z = 0;
	camera.lookAt(scene.position);
}
function perspectiveCameraBackView() {
	'use strict';
	camera = new THREE.PerspectiveCamera(60,
		window.innerWidth / window.innerHeight,
		1,
		1000);
	camera.position.x = 0;
	camera.position.y = 100;
	camera.position.z = -600;
	camera.lookAt(scene.position);
}