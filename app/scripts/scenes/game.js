import Map from '@/objects/map';
import Team from '@/objects/team';
//import Quizcard from '@/objects/quizcard';
import City from '@/objects/city';
import Connection from '@/objects/connection';
import Topology from '@/topology';

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


    this.input.keyboard.on('keydown_B', () => {
      this.teams[0].brainPoints++;
      if (this.teams[0].brainPoints > 100) {
        this.teams[0].brainPoints = 0;
      }
    });
    
    // temp playgounds
    this.input.keyboard.on('keydown_A', () => {
        this.scene.stop('Game').start('Andi');

    });

    //  TODO: Replace this content with really cool game code here :)
    this.map = new Map(this);

    this.teams = [];
    for (let i=0; i<2; i++) {
      this.teams.push(new Team(this, i));
    }

    this.createCitiesAndConnections();
  }

  createCitiesAndConnections() {

    this.cities = {};

    const topology = Topology();
    for (let city of topology.cities) {
      let cityObject = new City(this, city.cityId, city.x, city.y, city.isIntermediatePoint);
      this.cities[city.cityId] = cityObject;
      this.add.existing(cityObject);
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
      this.add.existing(connectionObject);
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
    this.map.update();
    for (let i=0; i<this.teams.length; i++) {
      this.teams[i].update();
    }
  }
}
