var directionalLight;
var star1, star2, star3, star4, star5, star6;
var colour = 0xffffff;
var intensity = 1;
var sphere = new THREE.SphereGeometry( 5, 16, 8 );
var starMaterial = new THREE.MeshBasicMaterial( { color: colour });

function addDirectionalLight() {
    directionalLight = new THREE.DirectionalLight( colour, 1);
    directionalLight.position.set(800, 500, 500);
    scene.add( directionalLight );
}

function toggleDirectionalLight() {
    directionalLight.visible = !directionalLight.visible;
}

function addPointLight(){
    star1 = new THREE.PointLight( colour, intensity, 300 );
    star1.add( new THREE.Mesh( sphere, starMaterial ) );
    star1.position.set(-400,150,100);
    scene.add( star1 );

    star2 = new THREE.PointLight( colour, intensity, 300 );
    star2.add( new THREE.Mesh( sphere, starMaterial ) );
    star2.position.set(0,150,100);
    scene.add( star2 );

    star3 = new THREE.PointLight( colour, intensity, 300 );
    star3.add( new THREE.Mesh( sphere, starMaterial ) );
    star3.position.set(400,150,100);
    scene.add( star3 );

    star4 = new THREE.PointLight( colour, intensity, 300 );
    star4.add( new THREE.Mesh( sphere, starMaterial ) );
    star4.position.set(-400,150,-250);
    scene.add( star4 );

    star5 = new THREE.PointLight( colour, intensity, 300 );
    star5.add( new THREE.Mesh( sphere, starMaterial ) );
    star5.position.set(0,150,-250);
    scene.add( star5 );

    star6 = new THREE.PointLight( colour, intensity, 300 );
    star6.add( new THREE.Mesh( sphere, starMaterial ) );
    star6.position.set(400,150,-250);
    scene.add( star6 );
}

function togglePointLight() {
    star1.visible = !star1.visible;
    star2.visible = !star2.visible;
    star3.visible = !star3.visible;
    star4.visible = !star4.visible;
    star5.visible = !star5.visible;
    star6.visible = !star6.visible;
}