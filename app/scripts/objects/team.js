import BrainPower from '@/objects/brainpower';
import EcoFootprint from '@/objects/ecoFootprint';

export default class Team {

  constructor(scene, teamId, startCity, destinationCity) {
    this.scene = scene;
    this.teamId = teamId;
    this.brainPoints = 0;
    this.ecoPoints = 0;
    this.currentCity = startCity;
    this.destinationCity = destinationCity;

    this.brainPower = new BrainPower(scene, this);
    this.ecoFootprint = new EcoFootprint(scene, this);
    this.destinationMarker = new Phaser.GameObjects.Sprite(scene, 0, 0, teamId == 0 ? 'destinationYellow' : 'destinationBlue');
    scene.add.existing(this.destinationMarker);
    this.destinationMarker.setOrigin(0.5, 0.9);
    this.destinationMarker.setScale(0.4, 0.4);
    this.destinationMarker.setPosition(this.destinationCity.x, this.destinationCity.y);

    // Create the token
    this.token = new Phaser.GameObjects.Sprite(scene, 0, 0, teamId == 0 ? 'figure_yellow-11' : 'figure_blue-10');
    scene.add.existing(this.token);
    this.token.setOrigin(teamId == 0 ? 0.8 : 0.2, 1);
    this.token.setScale(0.6, 0.6);
    this.token.setPosition(this.currentCity.x, this.currentCity.y + 3);

    scene.tweens.add({
        targets: this.destinationMarker,
        scale: 0.5,
        duration: 1000,
        ease: 'Linear',
        yoyo: -1,
        repeat: -1
    });

  }

  reduceEcoPoints() {
    this.ecoPoints = Math.max(0,  this.ecoPoints-1);
    this.update();
  }

  move(targetCity, distance) {
    return new Promise((resolve, reject) => {
      this.brainPoints -= distance * 10;
      if (distance == 2) {
        this.ecoPoints += 1;
      } else if (distance == 3) {
        this.ecoPoints += 3;
      } else if (distance == 4) {
        this.ecoPoints += 5;
      }

      this.currentCity = targetCity;
      switch (distance) {
        case 1:
          this.scene.sound.play('bicycle');
          break;
        case 2:
          this.scene.sound.play('train');
          break;
        case 3:
          this.scene.sound.play('car');
          break;
        case 4:
          this.scene.sound.play('plane');
          break;
      }

      let moveTween = this.scene.tweens.add({
          targets: this.token,
          x: this.currentCity.x,
          y: this.currentCity.y + 3,
          duration: distance * 1000,
          ease: 'Quadratic',
          onComplete: () => {
            this.scene.tweens.remove(moveTween);
            this.currentCity.unhighlightAllConnections();
            if (this.currentCity.cityId == this.destinationCity.cityId) {
              // TODO go to winner screen
              this.scene.showWinnerScreen(this.teamId);
            }
            resolve();
          }
      });
    });
  }

  /**
   *  Searches for all possible cities a team can travel with the available
   *  brain points.
   *  @return The available cities and the distance to those cities.
   */
  getReachableCities() {

    let maxDistance = Math.min(4, Math.floor(this.brainPoints / 10));
    if (maxDistance <= 0) {
      return [];
    }
    if (this.ecoPoints >= 9) {
      maxDistance = 1;
    }

    return this.scene.getReachableCities(this.currentCity, maxDistance);

  }

  highlightValidRoutes() {
    for (let cityId in this.scene.cities) {
      this.scene.cities[cityId].highlight(false);
    }
    let reachableCities = this.getReachableCities();
    for (let city of reachableCities) {
      this.scene.cities[city.cityId].highlight(true);
    }
    return reachableCities;
  }

  reactToGameStateChange() {
    if (this.teamId == 0 && this.scene.gameState == 3) {
      if (this.tokenTween) {
        this.tokenTween.stop();
      }
      this.tokenTween = this.scene.tweens.add({
          targets: this.token,
          scale: 0.8,
          duration: 500,
          ease: 'Linear',
          yoyo: -1,
          repeat: -1
      });
    } else if (this.teamId == 1 && this.scene.gameState == 4) {
      if (this.tokenTween) {
        this.tokenTween.stop();
      }
      this.tokenTween = this.scene.tweens.add({
          targets: this.token,
          scale: 0.8,
          duration: 500,
          ease: 'Linear',
          yoyo: -1,
          repeat: -1
      });
    } else {
      if (this.tokenTween) {
        this.tokenTween.stop();
      }
      this.tokenTween = this.scene.tweens.add({
        targets: this.token,
        scale: 0.7,
        duration: 1000,
        ease: 'Linear',
        yoyo: -1,
        repeat: -1
      });
    }
  }

  /**
   *
   */
  update() {
    this.token.update();
    this.brainPower.update();
    this.ecoFootprint.update();
  }
}
