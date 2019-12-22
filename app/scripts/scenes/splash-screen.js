export default class SplashScreen extends Phaser.Scene {
  /**
   *  Takes care of loading the main game assets, including textures, tile
   *  maps, sound effects and other binary files, while displaying a busy
   *  splash screen.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({
      key: 'SplashScreen',

      //  Splash screen and progress bar textures.
      pack: {
        files: [{
          key: 'start',
          type: 'image'
        }]
      }
    });


  }

  /**
   *  Show the splash screen and prepare to load game assets.
   *
   *  @protected
   */
  preload() {
    //  Display cover and progress bar textures.
    this.showCover();

    //  HINT: Declare all game assets to be loaded here.
    this.load.image('logo');
    this.load.image('map');
    this.load.image('quizcard');
    for (let i=0; i<=6; i++) {
      this.load.image('Gehirn/Gehirn_links/Gehirn_links_' + i);
      this.load.image('Gehirn/Gehirn_rechts/Gehirn_rechts_' + i);
    }
    for (let i=0; i<=9; i++) {
      this.load.image('ecopoints_l_' + i);
      this.load.image('ecopoints_r_' + i);
    }

    this.load.image('city_point');
    this.load.image('air_point');

    this.load.image('figure_blue-10');
    this.load.image('figure_yellow-11');


    this.load.image('riddles/a5');
    this.load.image('riddles/a30');
    this.load.image('riddles/a31');
    this.load.image('riddles/q3');
    this.load.image('riddles/q4');
    this.load.image('riddles/q5');
    this.load.image('riddles/q30');
    this.load.image('riddles/q31');
    this.load.image('transport/bicycle');
    this.load.image('transport/airplane');
    this.load.image('transport/car');
    this.load.image('transport/paddleboat');
    this.load.image('transport/sailboat');
    this.load.image('transport/ship');
    this.load.image('transport/train');
    this.load.image('transport/Transport1');
    this.load.image('transport/Transport2');
    this.load.image('transport/Transport3');
    this.load.image('transport/Transport4');
    this.load.image('destinationBlue');
    this.load.image('destinationYellow');
    this.load.image('blackbackground');
    this.load.image('Winner1');
    this.load.image('Winner2');
    this.load.image('start');

    this.load.audio('bicycle', 'sounds/bicycle.wav');
    this.load.audio('train', 'sounds/train.mp3');
    this.load.audio('car', 'sounds/car.wav');
    this.load.audio('plane', 'sounds/plane.wav');
    this.load.audio('start', 'sounds/start.wav');
    this.load.audio('buzzer', 'sounds/buzzer.mp3');
    this.load.audio('correct', 'sounds/correct.wav');
    this.load.audio('wrong', 'sounds/wrong.mp3');
    this.load.audio('winner', 'sounds/winner.mp3');
    this.load.audio('music', 'sounds/music1.mp3');
  }

  /**
   *  Set up animations, plugins etc. that depend on the game assets we just
   *  loaded.
   *
   *  @protected
   */
  create() {

    this.messageBox = this.add.text(0, 0, "Press [space] to start game.", {font: "48px Lucida Calligraphy", fill: "#aa3f3f"});
    //this.messageBox.setShadow(5,5,'#000000',50,true,true);
    this.messageBox.setOrigin(0.5, 1);
    this.messageBox.setPosition(this.cameras.main.width * 0.5, this.cameras.main.height * 0.9);

    this.tweens.add({
      targets: this.messageBox,
      scale: 1.2,
      ease: 'Quadratic',
      yoyo: -1,
      repeat: -1
    });

    // Start the game on Space press
    this.input.keyboard.on('keydown_SPACE', () => {
      this.scene.start('Game');
    });

  }

  //  ------------------------------------------------------------------------

  /**
   *  Show the splash screen cover.
   *
   *  @private
   */
  showCover() {

    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height / 2;

    let splashScreen = new Phaser.GameObjects.Image(this, 0, 0, 'start');
    splashScreen.setPosition(x, y);
    splashScreen.setOrigin(0.5);
    splashScreen.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    this.add.existing(splashScreen);

  }

  /**
   *  Show the progress bar and set up its animation effect.
   *
   *  @private
   */
  showProgressBar() {
    //  Get the progress bar filler texture dimensions.
    const {width: w, height: h} = this.textures.get('progress-bar').get();

    //  Place the filler over the progress bar of the splash screen.
    const img = this.add.sprite(82, 282, 'progress-bar').setOrigin(0);

    //  Crop the filler along its width, proportional to the amount of files
    //  loaded.
    this.load.on('progress', v => img.setCrop(0, 0, Math.ceil(v * w), h));
  }
}
