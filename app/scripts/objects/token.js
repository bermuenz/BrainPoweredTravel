import Team from '@/objects/team';

export default class Token extends Phaser.GameObjects.Sprite {
  /**
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene, team) {
    super(scene, 0, 0, 'token-' + team.teamId);

    this.team = team;

  }

  /**
   *
   */
  update() {


  }
}
