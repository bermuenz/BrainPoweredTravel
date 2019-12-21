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
    //  TODO: Replace this content with really cool game code here :)
    this.map = new Map(this);

    this.teams = [];
    for (let i=0; i<2; i++) {
      this.teams.push(new Team(this, i));
    }

    this.createCitiesAndConnections();

    // console.log(this.getReachableCities('Melbourne', 3));
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
  }
}
