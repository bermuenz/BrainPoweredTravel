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

    this.transportSprite= this.scene.add.sprite(0, 0, "transport/Transport1");
    this.transportSprite.setVisible(false);

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
      console.log("test");
      if (this.scene.gameState == 3 || this.scene.gameState == 4) {
        let reachableCities = this.scene.activeTeam.getReachableCities();
        console.log(reachableCities);
        let reachableCity = reachableCities.find(c => c.cityId == this.cityId);
        if (reachableCity) {
          // reachableCity.distance
          // TODO display according transport vehicle
          this.showTransport(reachableCity.distance);
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
      this.setTransInvisible();
    });
  }

  showTransport(distance) {
    console.log(distance);
    switch (distance) {
      case 1: {
        this.transportSprite.setTexture("transport/Transport1");
        break;
      }
      case 2: {
        this.transportSprite.setTexture("transport/Transport2");
        break;
      }
      case 3: {
        this.transportSprite.setTexture("transport/Transport3");
        break;
      }
      case 4: {
        this.transportSprite.setTexture("transport/Transport4");
        break;
      }
    }

    if (this.scene.gameState == 3) {
      this.transportSprite.setX(window.innerWidth * 0.1);
      this.transportSprite.setY(window.innerHeight * 0.35);
    }
    else if ( this.scene.gameState == 4) {
      this.transportSprite.setX(window.innerWidth * 0.9);
      this.transportSprite.setY(window.innerHeight * 0.35);
    }
      this.transportSprite.setVisible(true);
    }

    setTransInvisible(){
      this.transportSprite.setVisible(false);
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
