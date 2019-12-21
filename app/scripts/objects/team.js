import BrainPower from '@/objects/brainpower';
import EcoFootprint from '@/objects/ecoFootprint';

export default class Team {

  constructor(scene, teamId, startCity) {
    this.teamId = teamId;
    this.brainPoints = 0;
    this.ecoPoints = 0;
    this.currentCity = startCity;

    this.brainPower = new BrainPower(scene, this);
    this.ecoFootprint = new EcoFootprint(scene, this);

    // Create the token
    this.token = new Phaser.GameObjects.Sprite(scene, 0, 0, teamId == 0 ? 'figure_orange-10' : 'figure_green-11');
    scene.add.existing(this.token);
    this.token.setOrigin(0.5, 1);
    this.token.setScale(0.6, 0.6);
    this.token.setPosition(this.currentCity.x, this.currentCity.y + 10);

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
