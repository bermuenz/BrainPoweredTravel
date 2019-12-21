import Map from '@/objects/map';
import Team from '@/objects/team';
//import Quizcard from '@/objects/quizcard';
import City from '@/objects/city';
import Connection from '@/objects/connection';
import Topology from '@/topology';
import riddles from '@/riddles';

export default class Game extends Phaser.Scene {
  /**
   *  A sample Game scene, displaying the Phaser logo.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Game'});
  }

  /**
   *  Called when a scene is initialized. Method responsible for setting up
   *  the game objects of the scene.
   *
   *  @protected
   *  @param {object} data Initialization parameters.
   */
  create(/* data */) {

    this.registerKeyHandlers();

    this.map = new Map(this);

    this.createCitiesAndConnections();

    this.teams = [
      // TODO pre-define start cities
      // TODO define target cities
      new Team(this, 0, this.cities["48"]),
      new Team(this, 1, this.cities["Melbourne"])
    ];

    this.gameState = 0;
    this.riddlePool = riddles().riddles;

    this.initDebug();
  }

  initDebug() {
    this.registerDebugKeyHandlers();

    this.activeTeam = this.teams[1];
    this.teams[0].brainPoints = 30;
    this.teams[1].brainPoints = 60;

    this.teams[1].highlightValidRoutes();
  }

  registerKeyHandlers() {
      this.input.keyboard.on('keydown_SPACE', () => {
        if (this.gameState == 0) {
          this.startQuiz();
        }
      });
      this.input.keyboard.on('keydown_Q', () => {
        if (this.gameState == 1) {
          this.buzzerPressed(0);
        }
      });
      this.input.keyboard.on('keydown_P', () => {
        if (this.gameState == 1) {
          this.buzzerPressed(1);
        }
      });
  }

  // state transitions

  startQuiz() {
    console.log("starting next question");
    this.gameState = 1;
    this.currentRiddle = this.getRandomRiddle();
    // TODO show question
    console.log(this.currentRiddle.qText);
    this.currentRiddle.startTime = new Date().getTime();
    this.quizTimeout = setTimeout(() => {
      // TODO show "time over" message
      console.log("time over");
      this.showAnswer();
    }, this.currentRiddle.duration * 1000);
  }

  getRandomRiddle() {
    // get next riddle randomly and remove from riddlePool
    let riddle = this.riddlePool[Math.floor(Math.random() * this.riddlePool.length)];
    this.riddlePool = this.riddlePool.filter(r => r.dID != riddle.dID);
    if (this.riddlePool.length == 0) {
      // all riddles were used -> refill the pool
      this.riddlePool = riddles().riddles;
    }

    return riddle;
  }

  buzzerPressed(teamId) {
    clearTimeout(this.quizTimeout);
    console.log("team " + teamId + " pressed the buzzer");
    this.currentRiddle.answeringTeam = teamId;
    this.currentRiddle.answerTime = (new Date().getTime() - this.currentRiddle.startTime) / 1000;
    this.showAnswer();
  }

  showAnswer() {
    this.gameState = 2;
    console.log(this.currentRiddle.aText);
    // TODO show answer
    // TODO adapt buttons:
    //   - if a team answered -> correct, wrong -> answerConfirmed
    //   - else -> ok -> back to gameState 0
    //if (this.currentRiddle.answeringTeam != undefined) {

    //} else {

    //}
  }


  answerConfirmed(correct) {
    // TODO balance scoring function
    let maxPoints = this.currentRiddle.maxPoints; // TODO derive from difficulty
    let points = Math.round(((this.currentRiddle.duration - this.currentRiddle.answerTime) / this.currentRiddle.duration) * maxPoints);
    if (correct) {
        this.teams[this.currentRiddle.answeringTeam].brainPoints += points;
    } else {
        let otherTeam = (this.currentRiddle.answeringTeam + 1) % 2;
        this.teams[otherTeam].brainPoints += points / 2;
    }
    this.gameState = 3;
    // TODO: set this.activeTeam

    // TODO: reduce ecoPoints at end of round
  }



  registerDebugKeyHandlers() {

    this.input.keyboard.on('keydown_V', () => {
      this.teams[0].brainPoints = Math.max(0, this.teams[0].brainPoints-1);
    });

    this.input.keyboard.on('keydown_B', () => {
      this.teams[0].brainPoints = Math.min(100, this.teams[0].brainPoints+1);
    });

    this.input.keyboard.on('keydown_N', () => {
      this.teams[1].brainPoints = Math.max(0, this.teams[1].brainPoints-1);
    });

    this.input.keyboard.on('keydown_M', () => {
      this.teams[1].brainPoints = Math.min(100, this.teams[1].brainPoints+1);
    });

    this.input.keyboard.on('keydown_W', () => {
      this.teams[0].ecoPoints = Math.max(0, this.teams[0].ecoPoints-1);
    });

    this.input.keyboard.on('keydown_E', () => {
      this.teams[0].ecoPoints = Math.min(100, this.teams[0].ecoPoints+1);
    });

    this.input.keyboard.on('keydown_R', () => {
      this.teams[1].ecoPoints = Math.max(0, this.teams[1].ecoPoints-1);
    });

    this.input.keyboard.on('keydown_T', () => {
      this.teams[1].ecoPoints = Math.min(100, this.teams[1].ecoPoints+1);
    });


    // temp playgounds
    this.input.keyboard.on('keydown_A', () => {
        this.scene.stop('Game').start('Andi');
    });
  }


  /**
   * Parse the topology from the topology.js file and create the City/connection
   * Game objects
  **/
  createCitiesAndConnections() {

    this.cities = {};

    const topology = Topology();
    for (let city of topology.cities) {
      let cityObject = new City(this, city.cityId, city.x, city.y, city.isIntermediatePoint);
      this.cities[city.cityId] = cityObject;
    }

    this.connectionLookupTable = {};
    this.connections = {};
    for (let connection of topology.connections) {
      // Check if there is already a connection entry for the start and end city
      if (!this.connectionLookupTable[connection.start]) {
        this.connectionLookupTable[connection.start] = [];
      }
      if (!this.connectionLookupTable[connection.end]) {
        this.connectionLookupTable[connection.end] = [];
      }

      // Add the current connection to the connections object
      this.connectionLookupTable[connection.start].push(connection.end);
      this.connectionLookupTable[connection.end].push(connection.start);

      let connectionObject = new Connection(this, this.cities[connection.start], this.cities[connection.end]);
      this.connections[connection.start + '_' + connection.end] = connectionObject;
    }
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
    /*
      game states and transitions
      0: waiting for next question
        -> press space
      1: show question
        -> buzzer key pressed or time over
      2: show answer (turn question card)
        -> confirm if answer was correct
      3: travel team 1
        -> click on destination or skip
      4: travel team 2
        -> click on destination or skip
    */
    switch (this.gameState) {
      case 0:
          break;
      case 1:
          break;
      case 2:
          break;
      case 3:
          break;
      case 4:
          break;
    }

    for (let i=0; i<this.teams.length; i++) {
      this.teams[i].update();
    }
  }
}
