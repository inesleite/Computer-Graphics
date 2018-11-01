function getDistance(gameEntity1, gameEntity2) {
    return Math.pow(Math.pow(gameEntity1.x - gameEntity2.x, 2) +
        Math.pow(gameEntity1.z - gameEntity2.z, 2), 0.5);
}

class GameEntity extends THREE.Object3D {
    // Constructor
    constructor(x, y, z) {
        super();
        this.position.set(x, y, z);
        this.colision = false;
    }

    // Position Methods
    getPosition() {
        return this.position;
    }
    setPosition(x, y, z) {
        this.position.set(x, y, z);
    }

    // Movement
    executeMovement(delta) {}

    // Colisions
    hasColision() {
        return this.colision == true;
    }
    activateColision() {
        this.colision = true;
    }
    disableColision() {
        this.colision = false;
    }
    detectColisions(delta) {}
    processColisions() {}
}