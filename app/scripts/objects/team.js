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

  /**
   *
   */
  update() {
    this.token.update();
    this.brainPower.update();
    this.ecoFootprint.update();
  }
}
