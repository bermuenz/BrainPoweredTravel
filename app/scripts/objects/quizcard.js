// import Logo from '@/objects/logo';

export default class Quizcard extends Phaser.GameObjects.Container {
  /**
   *  @extends Phaser.GameObjects.Container
   */
  constructor(scene, puzzle) {
    super(scene, 0, 0);
    const x = scene.cameras.main.width / 2;
    const y = scene.cameras.main.height / 2;

    let centerX = scene.cameras.main.width  * 0.5;
    let centerY = scene.cameras.main.height  * 0.5;

    // bg
    let bg = scene.add.image(centerX, centerY, 'quizcard').setOrigin(0);
    bg.setOrigin(0.5, 0.5);
    this.add(bg);

    var txtStyle = {
      fontSize: 18,
      align: "center",
      fontFamily: '"Roboto Condensed"',
      color: "white",
      wordWrap: {
        width: bg.width - (2 * 60),
        useAdvancedWrap: true
      }
    };

    // question
    let qText = scene.add.text(centerX, centerY * 0.85, puzzle.qText, txtStyle);
    qText.setOrigin(0.5, 0.5);
    this.add(qText);
    let qImg = scene.add.image(centerX, centerY * 1.25, 'logo').setOrigin(0);
    qImg.setOrigin(0.5, 0.5);
    qImg.setScale(0.2, 0.2);
    this.add(qImg);

    // answer


    this.setSize(bg.scaleX, bg.scaleY);
    scene.add.existing(this);

  }

  /**
   *
   */
  update() {

  }


}
