class Bullet extends GameEntity {
        constructor(x) {
                super();
                this.collidedAlien = 0;
                this.buildBullet(x);
                this.setSpeed(0,-500);
        }
        changeMaterialsToPhong(){
            this.children[0].material = gameMaterials.getBulletPhongMaterial("red");
        }
        changeMaterialsToLambert(){
            this.children[0].material = gameMaterials.getBulletLambertMaterial("red");        
        }
        changeMaterialsToBasic(){
            this.children[0].material = gameMaterials.getBulletBasicMaterial("red");        
        }
        detectColisions(delta) {
                if (this.position.z < -325) {
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
                this.removeElement();
                if (this.collidedAlien != 0) {
                        this.collidedAlien.removeElement();
                }
        }

        //------make bullet----------------
        buildBullet(x) {
                this.position.set(x, 40, 170);
                scene.add(this);
                this.addBullet();
        }
        addBullet() {
                var geometry = new THREE.CubeGeometry(5, 5, 15);
                var mesh = new THREE.Mesh(geometry, gameMaterials.getBulletLambertMaterial("red"));
                mesh.position.set(0, 0, 0);
                this.add(mesh);
        }
}

function generateBullet(ship) {
    //bullets.push(new Bullet(ship.position.x))
    gameElements.push(new Bullet(ship.position.x))
}