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
      if (this.scene.gameState == 3 || this.scene.gameState == 4) {
        let reachableCities = this.scene.activeTeam.getReachableCities();
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
    let bool=true;
    switch (distance) {
      case 1: {
        this.transportSprite.setTexture("transport/Transport1");
        this.transportSprite.setScale(0.25,0.25);
        break;
      }
      case 2: {
        this.transportSprite.setTexture("transport/Transport2");
        this.transportSprite.setScale(0.2,0.2);
        break;
      }
      case 3: {
        this.transportSprite.setTexture("transport/Transport3");
        this.transportSprite.setScale(0.15,0.15);
        break;
      }
      case 4: {
        this.transportSprite.setTexture("transport/Transport4");
        this.transportSprite.setScale(0.20,0.20);
        break;
      }
      default: bool =false;
    }

    if (this.scene.gameState == 3) {
      this.transportSprite.setX(window.innerWidth * 0.10);
      this.transportSprite.setY(window.innerHeight * 0.45);
    }
    else if ( this.scene.gameState == 4) {
      this.transportSprite.setX(window.innerWidth * 0.88);
      this.transportSprite.setY(window.innerHeight * 0.45);
    }
      this.transportSprite.setVisible(bool);
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
    let path = this.scene.getShortestPathBetweenCities(this, targetCity);
    return path;
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
