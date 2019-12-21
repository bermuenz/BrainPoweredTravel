import Map from '@/objects/map';
import Team from '@/objects/team';

export default class GameField extends Phaser.GameObjects.Container {
  /**
   *  @extends Phaser.GameObjects.container
   */
  constructor(scene) {
    super(scene, 0, 0, 'gamefield');

    this.map = new Map(scene);
    this.cities = [];
    this.connections = [];
    this.teams = [];

  }

  /**
   *
   */
  update() {


  }
}
