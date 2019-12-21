import Quizcard from '@/objects/quizcard';

export default class Andi extends Phaser.Scene {
  /**
   *  A sample Game scene, displaying the Phaser logo.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Andi'});
  }

  /**
   *  Called when a scene is initialized. Method responsible for setting up
   *  the game objects of the scene.
   *
   *  @protected
   *  @param {object} data Initialization parameters.
   */
  create(/* data */) {
    // this.cameras.main.setBackgroundColor('#FFFFFF');

    let puzzle = {
      qText: "There are four girls- Alexis, Becky, Claire and Diana. Alexis is taller than Becky, who is shorter than Diana. Alexis is shorter than Diana and Diana is not the tallest.",
      qImage: null,
      aText: null,
      aImage: null
    };

    this.input.keyboard.on('keydown_X', () => {
        this.quizcard = new Quizcard(this, puzzle);
    });

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
  }

  render() {
    // this.debug.renderSpriteBounds(this.text);
    this.debug.cameraInfo(this.game.camera, 32, 32);
  }
}
