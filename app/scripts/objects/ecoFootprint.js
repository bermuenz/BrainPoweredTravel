import Team from '@/objects/team';

export default class EcoFootprint extends Phaser.GameObjects.Sprite {
  /**
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene, team) {
    super(scene, 0, 0, 'ecofootprint-' + team.teamId);

    this.team = team;


  }

  /**
   *
   */
  update() {


  }
}
