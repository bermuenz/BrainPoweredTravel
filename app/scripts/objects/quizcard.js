// import Logo from '@/objects/logo';

export default class Quizcard extends Phaser.GameObjects.Container {
  /**
   *  @extends Phaser.GameObjects.Container
   */
  constructor(scene) {
    super(scene, 0, 0);
    const x = scene.cameras.main.width / 2;
    const y = scene.cameras.main.height / 2;

    let centerX = scene.cameras.main.width  * 0.5;
    let centerY = scene.cameras.main.height  * 0.5;

    // this.logo = new Logo(this);
    let bg = scene.add.image(centerX, centerY, 'quizcard').setOrigin(0);
    bg.setOrigin(0.5, 0.5);

    let text = scene.add.text(centerX, centerY * 0.8, 'Hello World', { fontFamily: '"Roboto Condensed"' });
    text.setOrigin(0.5, 0.5);
    this.add(bg);
    this.add(text);
  //  this.setPosition(x, y);
  //  this.setOrigin(0.5);
  //  this.setDisplaySize(window.innerWidth / 2, window.innerHeight / 2);

    this.setSize(bg.scaleX, bg.scaleY);
    scene.add.existing(this);

  }

  /**
   *
   */
  update() {

  }
}
