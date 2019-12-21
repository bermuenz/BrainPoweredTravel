import Map from '@/objects/map';
import Team from '@/objects/team';
import Quizcard from '@/objects/quizcard';

export default class Game extends Phaser.Scene {
  /**
   *  A sample Game scene, displaying the Phaser logo.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Game'});
  }

  /**
   *  Called when a scene is initialized. Method responsible for setting up
   *  the game objects of the scene.
   *
   *  @protected
   *  @param {object} data Initialization parameters.
   */
  create(/* data */) {
    //  TODO: Replace this content with really cool game code here :)
    this.map = new Map(this);
    this.cities = [];
    this.connections = [];
    this.teams = [];
    for (let i=0; i<2; i++) {
      this.teams.push(new Team(this, i));
    }

  }

  /**
   *  Called when a scene is updated. Updates to game logic, physics and game
   *  objects are handled here.
   *
   *  @protected
   *  @param {number} t Current internal clock time.
   *  @param {number} dt Time elapsed since last update.
   */
  update(/* t, dt */) {
    this.map.update();
  }
}
