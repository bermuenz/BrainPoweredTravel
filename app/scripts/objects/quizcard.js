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
      'dID' : '31',
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
    this.bg = this.scene.add.sprite(centerX, centerY, 'quizcard').setOrigin(0);
    this.bg.setOrigin(0.5, 0.5);
    this.add(this.bg);


    // front
    this.createCardFront();

    this.setSize(this.bg.width, this.bg.height);

    this.scene.add.existing(this);

  }

  createCardFront(cacheKey, offsets) {
    let bgCenterX = this.bg.getCenter().x;
    let bgCenterY = this.bg.getCenter().y;
    let lineGap = 65;
    let middleOffset = 100;

    // score etc
    let currentY = this.placeScore();

    // question
    // let currentOffsetY = 0.45;
    let txtStyle = {
      fontSize: 22,
      align: "center",
      fontFamily: '"Roboto Condensed"',
      color: "white",
      wordWrap: {
        width: this.bg.width - (2 * 60),
        useAdvancedWrap: true
      }
    };
    this.text = this.scene.add.text(bgCenterX, currentY + lineGap * 0.7, this.riddle.qText, txtStyle);
    currentY += (lineGap * 1.5);
    this.text.setOrigin(0.5, 0.5);
    // this.text.setShadow(10, 10, "#FFFFFF", 10, true, true);
    this.add(this.text);

    if (this.riddle['qOptions']) {
      for (let i=0; i < this.riddle['qOptions'].length; i++) {
        // let currentY = centerY * (currentOffsetY + i * 0.10);
        let x = bgCenterX + (i%2 === 0 ? -middleOffset : middleOffset);
        let y = currentY + (i%3 === 0 ? 0: (lineGap * 0.8));
        // currentY += scoreOffset.y;
        let tx = this.scene.add.text(x, y, i +": " + this.riddle['qOptions'][i], txtStyle);
        tx.setOrigin(0.5, 0.5);
        this.add(tx);
      }
      currentY += (3*lineGap);
    }
    else currentY += (2 * lineGap);

    let img = "riddles/q" + this.riddle.dID;
    this.placeImg(img, bgCenterX, currentY);

  }

  placeScore() {
    let bgCenterX = this.bg.getCenter().x;
    let bgCenterY = this.bg.getCenter().y;
    let lineGap = 65;
    let middleOffset = 100;
    let txtStyleTop = {
      fontSize: 18,
      align: "center",
      fontFamily: '"Roboto Condensed"',
      color: "white"
    };
    let scoreOffset = {x: this.bg.width/2 - lineGap, y: this.bg.height/2 - lineGap};
    this.difficultyText = this.scene.add.text(0, 0, `Difficulty: ${this.riddle.difficulty}`, txtStyleTop);
    this.timeRemainingTxt = this.scene.add.text(0, 0, `Time: `, txtStyleTop);
    this.difficultyText.setPosition(bgCenterX - scoreOffset.x, bgCenterY - scoreOffset.y);
    this.timeRemainingTxt.setPosition(bgCenterX + (scoreOffset.x + lineGap/3 - this.timeRemainingTxt.width - this.timeRemainingTxt.width) , bgCenterY - scoreOffset.y);
    // this.pointsTxt = this.scene.add.text(this.bg.width - 100, 50, `Difficulty: ${this.riddle.difficulty}`, txtStyleTop);
    this.add(this.difficultyText);
    this.add(this.timeRemainingTxt);
    return bgCenterY - scoreOffset.y;
  }

  placeImg(cacheKey, x, y, ease = false) {

    if (this.scene.textures.exists(cacheKey)) {
      if (this.img) {
        this.img.destroy();
      }
      this.img = this.scene.add.sprite(x, y, cacheKey);
      this.img.setOrigin(0.5, 0.5);
      this.img.setScale(0.35, 0.35);
      this.add(this.img);
    }

    if (ease) {
      let origScale = this.img.scaleX;
      this.img.setScale(0, this.img.scaleY);
      let easin = this.scene.tweens.add({
        targets: this.img,
        scaleX: origScale,
        ease: 'Linear',
        duration: 300,
        onComplete: () => {
          this.scene.tweens.remove(easin);
        }
      });
    }
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
      }
    });
  }

  fadeinObjects(objs) {
    let centerX = this.scene.cameras.main.width  * 0.5;
    let centerY = this.scene.cameras.main.height  * 0.5;
    let duration = 20;
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

  removeObjects(objs) {
    let idxs = [];
    for (let o of objs) {
      o.destroy();
      this.remove(o);
      o = null;
    }
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
            let img = null;
            if (this.text.text === this.riddle.qText) {
              this.text.text = this.riddle.aText;
              img = "riddles/a" + this.riddle.dID;
            }
            else {
              this.text.text = this.riddle.qText;
              img = "riddles/q" + this.riddle.dID;
              this.placeScore();
              this.fadeoutObjects([this.difficultyText, this.timeRemainingTxt]);
            }
            this.placeImg(img, this.img.x, this.img.y, true);
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

  }

  /**
   *
   */
  update() {
    //console.log(this.getRemainingTime(), this.computePoints());
    if(this.timeRemainingTxt) this.timeRemainingTxt.setText('Time: ' + this.getRemainingTime());
    // this.pointsTxt.text = this.computePoints();
  }


}
