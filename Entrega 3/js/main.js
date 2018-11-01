/*global THREE, requestAnimationFrame, console*/
var camera, scene, renderer, clock;
var aliens_moving = false;

var can_shoot = true;
var current_camera = "0";
var current_material = "lambert";
var old_material = "lambert";

var gameElements = [];
var gameMaterials = new MaterialManager();

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    clock = new THREE.Clock();
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();

    createOrthographicCamera();
    createStaticPerspectiveCamera();
    createPerspectiveCameraShip();
    createCamera();
    addDirectionalLight();
    addPointLight();
    render();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function createScene() {
    'use strict';
    scene = new THREE.Scene();

    generateShip();
    generateAliens();
}

function onResize() {
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        if (camera instanceof THREE.OrthographicCamera) {
            resizeOrthographicCamera();
        } else {
            camera.aspect = window.innerWidth / window.innerHeight;
        }
        camera.updateProjectionMatrix();
    }
}

function onKeyUp(e) {
    'use strict';
    switch (e.keyCode) {
        case 37: // left arrow key
            ship.startBraking();
            break;
        case 39: // right arrow key
            ship.startBraking();
            break;
        case 83:
            break;
        case 66: //B
            can_shoot = true;
            break;
    }
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 65: //A
        case 97: //a
            gameMaterials.changeMaterialsWireframe();
            break;
        case 66: //B
            if (can_shoot) {
                generateBullet(ship);
                can_shoot = false;
            }
            break;
        case 71: //G
            if (current_material == "lambert") {
                gameElements.forEach(function(element){
                    element.changeMaterialsToPhong();
                }); 
                current_material = "phong";
            }
            else {
                gameElements.forEach(function(element){
                    element.changeMaterialsToLambert();
                }); 
                current_material = "lambert";
            }
            break;
        case 76: // L
            // enable/disable lighting - calculo da iluminação
            if (current_material == "basic") {
                gameElements.forEach(function(element){
                    if (old_material == "lambert") {
                        element.changeMaterialsToLambert();
                        current_material = "lambert";
                    } else {
                        element.changeMaterialsToPhong();
                        current_material = "phong";
                    }
                });
            }
            else{
                old_material = current_material;
                gameElements.forEach(function(element){
                    element.changeMaterialsToBasic();
                });
                current_material = "basic";
            }

            break;
        case 78: // N
            // modo de dia/noite - ligar/desligar luz direcional
            toggleDirectionalLight();
            break;
        case 67: //C
            togglePointLight();
            break;
        case 49: //1
            camera = camera_1;
            current_camera = "1";
            camera.aspect = window.innerWidth / window.innerHeight;
            resizeOrthographicCamera();
            camera.updateProjectionMatrix();
            break;
        case 50: //2
            camera = camera_2;
            current_camera = "2";
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            break;
        case 51: //3
            camera = camera_3;
            current_camera = "3";
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            break;
        case 83: //S
            aliens_moving = !aliens_moving;
            break;
        case 37: // left arrow key
            ship.accelerating = "yes";
            ship.acceleratingDirection = "left";
            break;
        case 39: // right arrow key
            ship.accelerating = "yes";
            ship.acceleratingDirection = "right";
            break;
    }
}

function animate() {
    'use strict';
    var delta = clock.getDelta();
    // detect Colisions
    gameElements.forEach(function(element) {
        if (!element.hasColision()) {
            element.detectColisions(delta)
        }
    });
    // process Colisions
    gameElements.forEach(function(element) {
        if (element.hasColision()) {
            element.processColisions();
        }
    });
    // move gameElements (ship, aliens, bullets)
    gameElements.forEach(function(element) {
        element.executeMovement(delta);
    });

    if (current_camera == "3") {
        cameraFollowShip();
    }
    render();
    requestAnimationFrame(animate);
}