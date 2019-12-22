// import Logo from '@/objects/logo';

export default class Quizcard extends Phaser.GameObjects.Container {
  /**
   *  @extends Phaser.GameObjects.Container
   */
  constructor(scene, riddle) {
    super(scene, 0, 0);
    this.scene = scene;
    this.riddle = riddle;
    this.lineGap = 65;
    this.middleOffset = 100;



    // this.riddle = {
    //   'dID' : '31',
    //   'qText' : 'How many pieces are on a chessboard at the beginning of a game?',
    //   'qOptions' : ['32','28', '34','30'],
    //   'aText' : '32: Each opponent has 1 king, 1 queen, 2 rooks, 2 bishops, 2 knights, and 8 pawns.',
    //   'duration' : '120',
    //   'difficulty' : 'hard',
    //   'maxPoints' : '50',
    //   'startTime': new Date()
    // };

    const x = this.scene.cameras.main.width / 2;
    const y = this.scene.cameras.main.height / 2;

    let centerX = this.scene.cameras.main.width  * 0.5;
    let centerY = this.scene.cameras.main.height  * 0.5;


    // bg
    this.bg = this.scene.add.sprite(centerX, centerY, 'quizcard').setOrigin(0);
    this.bg.setOrigin(0.5, 0.5);
    this.add(this.bg);

    this.qaStyle = {
      fontSize: 22,
      align: "center",
      fontFamily: '"Roboto Condensed"',
      color: "white",
      wordWrap: {
        width: this.bg.width - (2 * 60),
        useAdvancedWrap: true
      }
    };

    // front
    this.createCardFront();

    this.setSize(this.bg.width, this.bg.height);

    this.scene.add.existing(this);

  }

  createCardFront(cacheKey, offsets) {
    let bgCenterX = this.bg.getCenter().x;
    let bgCenterY = this.bg.getCenter().y;

    // score etc
    let currentY = this.placeScore();

    // question
    // let currentOffsetY = 0.45;

    this.text = this.scene.add.text(bgCenterX, currentY + this.lineGap * 0.7, this.riddle.qText, this.qaStyle);
    currentY += (this.lineGap * 1.5);
    this.text.setOrigin(0.5, 0.5);
    // this.text.setShadow(10, 10, "#FFFFFF", 10, true, true);
    this.add(this.text);

    if (this.riddle['qOptions']) {
      for (let i=0; i < this.riddle['qOptions'].length; i++) {
        // let currentY = centerY * (currentOffsetY + i * 0.10);
        let x = bgCenterX + (i%2 === 0 ? -this.middleOffset : this.middleOffset);
        let y = currentY + (i%3 === 0 ? 0: (this.lineGap * 0.8));
        // currentY += scoreOffset.y;
        this.optTxt = this.scene.add.text(x, y, i +": " + this.riddle['qOptions'][i], this.qaStyle);
        this.optTxt.setOrigin(0.5, 0.5);
        this.add(this.optTxt);
      }
      currentY += (3*this.lineGap);
    }
    else currentY += (2 * this.lineGap);

    let img = "riddles/q" + this.riddle.dID;
    this.placeImg(img, bgCenterX, currentY);

  }

  placeScore() {
    let bgCenterX = this.bg.getCenter().x;
    let bgCenterY = this.bg.getCenter().y;
    let txtStyleTop = {
      fontSize: 18,
      align: "center",
      fontFamily: '"Roboto Condensed"',
      color: "white"
    };
    let scoreOffset = {x: this.bg.width/2 - this.lineGap, y: this.bg.height/2 - this.lineGap};
    this.difficultyText = this.scene.add.text(0, 0, `Difficulty: ${this.riddle.difficulty}`, txtStyleTop);
    this.timeRemainingTxt = this.scene.add.text(0, 0, `Time: `, txtStyleTop);
    this.difficultyText.setPosition(bgCenterX - scoreOffset.x, bgCenterY - scoreOffset.y);
    this.timeRemainingTxt.setPosition(bgCenterX + (scoreOffset.x + this.lineGap/3 - this.timeRemainingTxt.width - this.timeRemainingTxt.width) , bgCenterY - scoreOffset.y);
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

    if (ease && this.img) {
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

  createCardBack() {
    this.removeObjects(this.list.filter(x => x !== this.bg));
    let bgCenterX = this.bg.getCenter().x;
    let bgCenterY = this.bg.getCenter().y;
    let img = null;
    let currentY = this.bg.getCenter().y - this.bg.height/2 - this.lineGap;
    this.text = this.scene.add.text(bgCenterX, currentY + this.lineGap * 0.7, this.riddle.qText, this.qaStyle);
    this.text.setText(this.riddle.aText);
    img = "riddles/a" + this.riddle.dID;
    let xPos = this.img ? this.img.x : bgCenterX;
    let yPos = this.img ? this.img.y : bgCenterY;
    this.placeImg(img, xPos, yPos, true);
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
      let tmp = o;
      this.remove(o);
      o.destroy();
      o = null;
    }
  }

  flip(isAnswered = false) {

    // this.removeObjects([this.difficultyText, this.timeRemainingTxt]);
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

            // decide to create front/Back
            if (this.text.text === this.riddle.qText) {
              this.createCardBack();
            } else {
              this.createCardFront();
            }

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
    if(this.timeRemainingTxt.active) this.timeRemainingTxt.setText('Time: ' + this.getRemainingTime());
    // this.pointsTxt.text = this.computePoints();
  }


}
