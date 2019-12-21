// import Logo from '@/objects/logo';

export default class Quizcard extends Phaser.GameObjects.Container {
  /**
   *  @extends Phaser.GameObjects.Container
   */
  constructor(scene, riddle) {
    super(scene, 0, 0);
    this.scene = scene;
    this.riddle = riddle;
    const x = this.scene.cameras.main.width / 2;
    const y = this.scene.cameras.main.height / 2;

    let centerX = this.scene.cameras.main.width  * 0.5;
    let centerY = this.scene.cameras.main.height  * 0.5;


    // bg
    let bg = this.scene.add.sprite(centerX, centerY, 'quizcard').setOrigin(0);
    bg.setOrigin(0.5, 0.5);
    this.add(bg);
    // this.setWidth(bg.width);
    // this.setHeight(bg.height);

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
    this.text = this.scene.add.text(centerX, centerY * 0.85, this.riddle.qText, txtStyle);
    this.text.setOrigin(0.5, 0.5);
    this.add(this.text);
    this.img = this.scene.add.sprite(centerX, centerY * 1.25, 'logo').setOrigin(0);
    this.img.setOrigin(0.5, 0.5);
    this.img.setScale(0.2, 0.2);
    this.add(this.img);

    // answer

    this.setSize(bg.width, bg.height);


    this.scene.add.existing(this);


  }

  flip(isAnswered = false) {
    for (let obj of this.list) {
      // scale horizontally to disappear
      let flipA = this.scene.tweens.add({
          targets: obj,
          scaleX: 0.01,
          ease: 'Linear',
          duration: 300,
          repeat: 0,
          yoyo: false,
          onComplete: () => {
            if (this.text.text === this.riddle.qText) this.text.text = this.riddle.aText;
            else this.text.text = this.riddle.qText;
            this.scene.tweens.remove(flipA);
            let flipB = this.scene.tweens.add({
                targets: obj,
                scaleX: 1.0,
                ease: 'Linear',
                duration: 300,
                repeat: 0,
                yoyo: false,
                onComplete: () => {
                  this.scene.tweens.remove(flipB);
                  this.onFlipComplete(obj);
                }
            });
          }
      });
    }
  }

  onFlipComplete(obj) {
    console.log("Completed!");
      // do something, show text, add score etc.
      // if (card.frameName == 'HeartQueen') {
      //     // ?
      // };
  }

  /**
   *
   */
  update() {

  }


}
