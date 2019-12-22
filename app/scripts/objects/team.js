import BrainPower from '@/objects/brainpower';
import EcoFootprint from '@/objects/ecoFootprint';

export default class Team {

  constructor(scene, teamId, startCity) {
    this.scene = scene;
    this.teamId = teamId;
    this.brainPoints = 0;
    this.ecoPoints = 0;
    this.currentCity = startCity;

    this.brainPower = new BrainPower(scene, this);
    this.ecoFootprint = new EcoFootprint(scene, this);

    // Create the token
    this.token = new Phaser.GameObjects.Sprite(scene, 0, 0, teamId == 0 ? 'figure_yellow-11' : 'figure_blue-10');
    scene.add.existing(this.token);
    this.token.setOrigin(teamId == 0 ? 0.8 : 0.2, 1);
    this.token.setScale(0.6, 0.6);
    this.token.setPosition(this.currentCity.x, this.currentCity.y + 3);

    scene.tweens.add({
        targets: this.token,
        scale: 0.75,
        duration: 500,
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
      let moveTween = this.scene.tweens.add({
          targets: this.token,
          x: this.currentCity.x,
          y: this.currentCity.y + 3,
          duration: distance * 1000,
          ease: 'Quadratic',
          onComplete: () => {
            this.scene.tweens.remove(moveTween);
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

    let visitedCities = [this.currentCity.cityId];
    let currentBacklog = [this.currentCity.cityId];
    let nextBacklog = [];
    let reachableCities = [];
    let currentDistance = 1;
    while (currentBacklog.length > 0) {
      let currentCity = currentBacklog.pop();
      for (let nextCity of this.scene.connectionLookupTable[currentCity]) {
          if (visitedCities.includes(nextCity)) {
            continue;
          }
          visitedCities.push(nextCity);
          reachableCities.push({cityId: nextCity, distance: currentDistance});
          nextBacklog.push(nextCity);
      }
      if (currentBacklog.length <= 0 && currentDistance < maxDistance) {
        currentBacklog = nextBacklog;
        nextBacklog = [];
        currentDistance++;
      }
    }
    return reachableCities;
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

  /**
   *
   */
  update() {
    this.token.update();
    this.brainPower.update();
    this.ecoFootprint.update();
  }
}
