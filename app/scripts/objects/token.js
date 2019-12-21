import Team from '@/objects/team';

export default class Token extends Phaser.GameObjects.Sprite {
  /**
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene, team) {
    super(scene, x, y, 'token-' + team.teamId);

    this.team = team;

  }

  /**
   *
   */
  update() {


  }
}
