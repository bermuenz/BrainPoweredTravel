// import Logo from '@/objects/logo';

export default class Quizcard extends Phaser.GameObjects.Container {
  /**
   *  @extends Phaser.GameObjects.Container
   */
  constructor(scene, riddle) {
    super(scene, 0, 0);
    this.scene = scene;
    this.riddle = riddle;

    this.riddle = {
      'dID' : '3',
      'qText' : 'How many pieces are on a chessboard at the beginning of a game?',
      'qOptions' : ['32','28', '34','30'],
      'aText' : '32: Each opponent has 1 king, 1 queen, 2 rooks, 2 bishops, 2 knights, and 8 pawns.',
      'duration' : '120',
      'difficulty' : 'hard',
      'maxPoints' : '50',
      'startTime': new Date()
    };

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


    // score etc
    let txtStyleTop = {
      fontSize: 18,
      align: "center",
      fontFamily: '"Roboto Condensed"',
      color: "white"
    };
    let offsetX = 65;
    let offsetY = 65;
    this.difficultyText = this.scene.add.text((bg.x - bg.width/2) + offsetX, (bg.y - bg.height/2) + offsetY, `Difficulty: ${this.riddle.difficulty}`, txtStyleTop);
    this.timeRemainingTxt = this.scene.add.text((bg.x + bg.width/2) - offsetX * 2.1, (bg.y - bg.height/2) + offsetY, `Time: `, txtStyleTop);
    // this.pointsTxt = this.scene.add.text(bg.width - 100, 50, `Difficulty: ${this.riddle.difficulty}`, txtStyleTop);
    this.add(this.difficultyText);
    this.add(this.timeRemainingTxt);

    // question
    let currentOffsetY = 0.45;
    let txtStyle = {
      fontSize: 22,
      align: "center",
      fontFamily: '"Roboto Condensed"',
      color: "white",
      wordWrap: {
        width: bg.width - (2 * 60),
        useAdvancedWrap: true
      }
    };
    this.text = this.scene.add.text(centerX, centerY * currentOffsetY, this.riddle.qText, txtStyle);
    this.text.setOrigin(0.5, 0.5);
    // this.text.setShadow(10, 10, "#FFFFFF", 10, true, true);
    this.add(this.text);
    currentOffsetY += 0.10;
    let img = "riddles/q" + this.riddle.dID;
    if (this.riddle['qOptions']) {
      let middleOffset = 70;
      for (let i=0; i < this.riddle['qOptions'].length; i++) {
        // let currentY = centerY * (currentOffsetY + i * 0.10);
        let currentY = centerY + (i%3 === 0 ? -80 : -50);
        let currentX = centerX + (i%2 === 0 ? -middleOffset : middleOffset);
        console.log(centerX);
        console.log(currentX);
        let tx = this.scene.add.text(currentX, currentY, i +": " + this.riddle['qOptions'][i], txtStyle);
        tx.setOrigin(0.5, 0.5);
        this.add(tx);
      }
    }
    if (this.scene.textures.exists(img)) {
      this.img = this.scene.add.sprite(centerX, centerY * 1.3, img).setOrigin(0);
      this.img.setOrigin(0.5, 0.5);
      this.img.setScale(0.4, 0.4);
      this.add(this.img);
    }


    // answer

    this.setSize(bg.width, bg.height);

    this.scene.add.existing(this);

  }

  getRemainingTime() {
    let currentTime = new Date().getTime();
    let elapsedTime = (currentTime - this.riddle.startTime) / 1000;
    return Math.round(this.riddle.duration - elapsedTime);
  }

  fadeoutObjects(objs) {
    let centerX = this.scene.cameras.main.width  * 0.5;
    let centerY = this.scene.cameras.main.height  * 0.5;
    let duration = 20;
    let fadeout = this.scene.tweens.add({
      targets: objs,
      alpa: 0.00,
      ease: 'Linear',
      duration: duration,
      onComplete: () => {
        this.scene.tweens.remove(fadeout);
        let fadein = this.scene.tweens.add({
          targets: objs,
          alpa: 1.00,
          ease: 'Linear',
          duration: duration,
          onComplete: () => {
            this.scene.tweens.remove(fadein);
          }
        });
      }
    });

  }

  flip(isAnswered = false) {

    this.fadeoutObjects([this.difficultyText, this.timeRemainingTxt]);
    let duration = 300;
    for (let obj of this.list) {
      // scale horizontally to disappear
      let flipA = this.scene.tweens.add({
          targets: obj,
          scaleX: 0.01,
          ease: 'Linear',
          duration: duration,
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
                duration: duration,
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
    //console.log(this.getRemainingTime(), this.computePoints());
    this.timeRemainingTxt.text = 'Time: ' + this.getRemainingTime();
    // this.pointsTxt.text = this.computePoints();
  }


}
