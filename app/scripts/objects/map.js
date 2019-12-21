export default class Map extends Phaser.GameObjects.Image {
  /**
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene) {
    super(scene, 0, 0, 'map');

    const x = scene.cameras.main.width / 2;
    const y = scene.cameras.main.height / 2;

    this.setPosition(x, y);
    this.setOrigin(0.5);
    this.setDisplaySize(window.innerWidth, window.innerHeight);
  }

  /**
   *
   */
  update() {

  }
}
