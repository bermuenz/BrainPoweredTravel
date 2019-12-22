export default class City extends Phaser.GameObjects.Sprite {
  /**
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene, cityId, x, y, isIntermediatePoint) {
    super(scene, 0, 0, isIntermediatePoint ? 'air_point' : 'city_point');

    this.cityId = cityId;
    this.x = x;
    this.y = y;
    this.isIntermediatePoint = isIntermediatePoint;
    this.connections = [];

    this.setPosition(window.innerWidth * (x / 100), window.innerHeight * (y / 100));
    this.setScale(0.5, 0.5);
    this.setOrigin(0.5, 0.5);
    if (isIntermediatePoint) {
      this.tint = 0xaa3f3f;
    }
    scene.add.existing(this);

    this.setInteractive();
    this.on('pointerup', (event) => {
      console.log("City: " + this.cityId);
      if (this.scene.gameState == 3 || this.scene.gameState == 4) {
        let reachableCities = this.scene.activeTeam.getReachableCities();
        let reachableCity = reachableCities.find(c => c.cityId == this.cityId);
        if (reachableCity) {
          let city = this.scene.cities[reachableCity.cityId];
          let distance = reachableCity.distance;
          // TODO animate transport vehicle
          this.scene.activeTeam.move(city, distance).then(() => {
            if (this.scene.activeTeam.teamId == 0) {
              this.scene.team1Finished();
            } else {
              this.scene.team2Finished();
            }
          });
        }
      }
    });

    this.on('pointerover', (event, gameObject) => {
      if (this.scene.gameState == 3 || this.scene.gameState == 4) {
        let reachableCities = this.scene.activeTeam.getReachableCities();
        let reachableCity = reachableCities.find(c => c.cityId == this.cityId);
        if (reachableCity) {
          // reachableCity.distance
          // TODO display according transport vehicle
          this.unhighlightAllConnections();
          let connections = this.getPath(this.scene.activeTeam.currentCity);
          for (let connection of connections) {
            connection.highlight(true);
          }
        }
      }
    });
    this.on('pointerout', (event, gameObject) => {
      this.unhighlightAllConnections();
    });
  }

  unhighlightAllConnections() {
    for (let connectionKey in this.scene.connections) {
      let connection = this.scene.connections[connectionKey];
      connection.highlight(false);
    }
  }

  getPath(targetCity) {
    // TODO return all connection objects of the shortest path between the 2 points
    let lookup = this.scene.connectionLookupTable;
    return [];
  }

  highlight(isHighlight) {
    if (isHighlight) {
      this.setTint(0x00ff00);
    } else {
      if (this.isIntermediatePoint) {
        this.tint = 0xaa3f3f;
      } else {
        this.clearTint();
      }
    }
  }

  /**
   *
   */
  update() {


  }
}
