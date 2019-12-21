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

    this.registerDebugKeyHandlers();

    //  TODO: Replace this content with really cool game code here :)
    this.map = new Map(this);

    this.createCitiesAndConnections();

    this.teams = [];
    for (let i=0; i<2; i++) {
      this.teams.push(new Team(this, i, this.cities["Melbourne"]));
    }

    // Todo: Use this code to calculate distances and to move a team
    // this.teams[0].brainPoints = 5;
    // let exampleDestination = this.getReachableCities('Melbourne', 3)[2];
    // this.teams[0].move(this.cities[exampleDestination[0]], exampleDestination[1]);
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
   *  Searches for all possible cities a team can travel with the available
   *  brain points.
   *
   *  @protected
   *  @param {string} startCityId Current city where the team is located
   *  @param {number} maxDistance Maximum distance the team can travel.
   *  @return The available cities and the distance to those cities.
   */
  getReachableCities(startCityId, maxDistance) {
    let visitedCities = [startCityId];
    let currentBacklog = [startCityId];
    let nextBacklog = [];
    let reachableCities = [];
    let currentDistance = 1;
    while (currentBacklog.length > 0) {
      let currentCity = currentBacklog.pop();
      for (let nextCity of this.connectionLookupTable[currentCity]) {
          if (visitedCities.includes(nextCity)) {
            continue;
          }
          visitedCities.push(nextCity);
          reachableCities.push([nextCity, currentDistance]);
          nextBacklog.push(nextCity);
      }
      if (currentBacklog.length <= 0 && currentDistance < maxDistance) {
        currentBacklog = nextBacklog;
        nextBacklog = [];
        currentDistance++;
      }
    }
    return reachableCities;
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
