function getDistance(gameEntity1, gameEntity2) {
    return Math.pow(Math.pow(gameEntity1.x - gameEntity2.x, 2) + Math.pow(gameEntity1.z - gameEntity2.z, 2), 0.5);
}

class GameEntity extends THREE.Object3D {
    // Constructor
    constructor(x, y, z) {
        super();
        this.position.set(x, y, z);
        this.colision = false;
        this.speed_x = 0;
        this.speed_z = 0;
    }
    changeMaterialsToPhong(){}
    changeMaterialsToLambert(){}
    changeMaterialsToBasic(){}
    // Position Methods
    getPosition() {
        return this.position;
    }
    setPosition(x, y, z) {
        this.position.set(x, y, z);
    }

    getSpeed_x(){
      return this.speed_x;
    }
    getSpeed_z(){
      return this.speed_z;
    }
    setSpeed(x_speed, z_speed){
      this.speed_x = x_speed;
      this.speed_z = z_speed;
 }

    setSpeed_x(x_speed){
        this.speed_x = x_speed;
    }

    setSpeed_z(z_speed){
      this.speed_z = z_speed;
    }

    getFuturePosition(delta) {
      var temp_position_x = this.position.x + this.speed_x * delta;
      var temp_position_z = this.position.z + this.speed_z * delta;
      return {
        x: temp_position_x,
        y: this.position.y,
        z: temp_position_z
      };
    }

    removeElement(){
      gameElements.splice(gameElements.indexOf(this), 1);
      scene.remove(this);
    }


    // Movement
    executeMovement(delta) {
      this.position.x += this.speed_x * delta;
      this.position.z += this.speed_z * delta;
      this.checkTopBottomLimitsColision();
      this.checkLeftRightLimitsColision();
}
    checkTopBottomLimitsColision(){}
    checkLeftRightLimitsColision(){}
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