import Team from '@/objects/team';

export default class BrainPower extends Phaser.GameObjects.Sprite {
  /**
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene, team) {
    super(scene, 0, 0, 'brainpower-' + team.teamId);

    this.team = team;


  }

  /**
   *
   */
  update() {


  }
}
