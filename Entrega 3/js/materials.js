class MaterialManager {
	constructor() {
		this.alienPhongMaterials = {
			red: new THREE.MeshPhongMaterial({color: 0xff0000,
											 specular: 0xcf2828,shininess: 100}),
			green: new THREE.MeshPhongMaterial({color: 0x00ff00,
											 specular: 0x894040,shininess: 100}),
			blue: new THREE.MeshPhongMaterial({color: 0x0000ff,
											 specular: 0x292391,shininess: 100}),
			white: new THREE.MeshPhongMaterial({color: 0xffffff,
											 specular: 0x392d2d,shininess: 100}),
		}
		this.shipPhongMaterials = {
			red: new THREE.MeshPhongMaterial({color: 0xff0000,
											 specular: 0x000000,shininess: 100}),
			green: new THREE.MeshPhongMaterial({color: 0x00ff00,
											 specular: 0x000000,shininess: 100}),
			blue: new THREE.MeshPhongMaterial({color: 0x0000ff,
											 specular: 0x292391,shininess: 100}),
		}
		this.bulletPhongMaterials = {
			red: new THREE.MeshPhongMaterial({color: 0xff0000,
											 specular: 0xcf2828,shininess: 100}),
		}
		this.alienLambertMaterials = {
			red: new THREE.MeshLambertMaterial({color: 0xff0000}),
			green: new THREE.MeshLambertMaterial({color: 0x00ff00}),
			blue: new THREE.MeshLambertMaterial({color: 0x0000ff}),
			white: new THREE.MeshLambertMaterial({color: 0xffffff}),
		}
		this.shipLambertMaterials = {
			red: new THREE.MeshLambertMaterial({color: 0xff0000}),
			green: new THREE.MeshLambertMaterial({color: 0x00ff00}),
			blue: new THREE.MeshLambertMaterial({color: 0x0000ff}),
		}
		this.bulletLambertMaterials = {
			red: new THREE.MeshLambertMaterial({color: 0xff0000}),
		}
		this.alienBasicMaterials = {
			red: new THREE.MeshBasicMaterial({color: 0xff0000}),
			green: new THREE.MeshBasicMaterial({color: 0x00ff00}),
			blue: new THREE.MeshBasicMaterial({color: 0x0000ff}),
			white: new THREE.MeshBasicMaterial({color: 0xffffff})
		}
		this.shipBasicMaterials = {
			red: new THREE.MeshBasicMaterial({color: 0xff0000}),
			green: new THREE.MeshBasicMaterial({color: 0x00ff00}),
			blue: new THREE.MeshBasicMaterial({color: 0x0000ff}),
		}
		this.bulletBasicMaterials = {
			red: new THREE.MeshBasicMaterial({color: 0xff0000}),
		}
	}
	// Getters
	getAlienPhongMaterial(color){
		return this.alienPhongMaterials[color];
	}
	getAlienLambertMaterial(color){
		return this.alienLambertMaterials[color];
	}
	getShipPhongMaterial(color){
		return this.shipPhongMaterials[color];
	}
	getShipLambertMaterial(color){
		return this.shipLambertMaterials[color];
	}
	getBulletPhongMaterial(color){
		return this.bulletPhongMaterials[color];
	}
	getBulletLambertMaterial(color){
		return this.bulletLambertMaterials[color];
	}
	getAlienBasicMaterial(color){
		return this.alienBasicMaterials[color];
	}
	getShipBasicMaterial(color){
		return this.shipBasicMaterials[color];
	}
	getBulletBasicMaterial(color){
		return this.bulletBasicMaterials[color];
	}
	// Change wireframe
	changeMaterialsWireframe(){
		for(let materialType in this){
			for(let color in this[materialType]){
				this[materialType][color].wireframe = !this[materialType][color].wireframe;
			}
		}
	}
}