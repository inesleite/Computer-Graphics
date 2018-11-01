var camera_1, camera_2, camera_3;

function createCamera() {
    'use strict';
    camera = camera_1;
}
function createOrthographicCamera() {
    'use strict';
    var world_aspect = 1200 / 800;
    var aspect = window.innerWidth / window.innerHeight;
    if (aspect > world_aspect) {
        //diminui altura (aunmentar largura)
        var viewSize = 400;
        camera_1 = new THREE.OrthographicCamera(viewSize * (-aspect), viewSize * aspect,
            viewSize, -viewSize, 1, 1000);
    } else {
        //diminui largura (aumentar altura)
        var viewSize = 600;
        camera_1 = new THREE.OrthographicCamera(-viewSize, viewSize,
            viewSize / aspect, -viewSize / aspect, 1, 1000);
    }
    camera_1.position.set(0, 400, 0);
    camera_1.lookAt(scene.position);
}

function createStaticPerspectiveCamera() {
    'use strict';
    camera_2 = new THREE.PerspectiveCamera(65,
        window.innerWidth / window.innerHeight,
        1,
        1500);

    camera_2.position.set(-250, 400, 0);
    camera_2.lookAt(ship.position);
}

function createPerspectiveCameraShip() {
    'use strict';
    camera_3 = new THREE.PerspectiveCamera(65,
        window.innerWidth / window.innerHeight,
        1,
        1500);
    camera_3.position.set(ship.position.x, 200, 450);
    camera_3.lookAt(ship.position.x, 0, 0);
}


function resizeOrthographicCamera() {
    var world_aspect = 1200 / 800;
    var aspect = window.innerWidth / window.innerHeight;
    if (aspect > world_aspect) {
        //diminui altura (aunmentar largura)
        var viewSize = 400;
        camera_1.left = viewSize * (-aspect);
        camera_1.right = viewSize * aspect;
        camera_1.top = viewSize;
        camera_1.bottom = -viewSize;
    } else {
        //diminui largura (aumentar altura)
        var viewSize = 600;
        camera_1.left = viewSize;
        camera_1.right = -viewSize;
        camera_1.top = viewSize / aspect;
        camera_1.bottom = viewSize / (-aspect);
    }
}
function cameraFollowShip() {
    camera_3.position.set(ship.position.x, 270, 440);
    camera_3.lookAt(new THREE.Vector3(ship.position.x, -5, 0));
}