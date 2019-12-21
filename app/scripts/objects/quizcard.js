export default class Quizcard extends Phaser.GameObjects.Container {
  /**
   *  @extends Phaser.GameObjects.Container
   */
  constructor(scene) {
    super(scene, 0, 0);

    const x = scene.cameras.main.width / 2;
    const y = scene.cameras.main.height / 2;

    let text = this.add.text(0, 0, 'Hello World', { fontFamily: '"Roboto Condensed"' });

  //  this.setPosition(x, y);
  //  this.setOrigin(0.5);
  //  this.setDisplaySize(window.innerWidth / 2, window.innerHeight / 2);

    scene.add.existing(this);

  }

  /**
   *
   */
  update() {

  }
}
