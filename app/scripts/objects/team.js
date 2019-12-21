import Token from '@/objects/token';
import BrainPower from '@/objects/brainpower';
import EcoFootprint from '@/objects/ecofootprint';

export default class Team {

  constructor(scene, teamId, startCity) {

  // TODO: initilize child sprites
  // - token
  // - brain power
  // - eco footprint

    this.brainPoints = 0;
    this.ecoPoints = 0;
    this.currentCity = startCity;

    this.token = new Token(scene, team);
    this.brainPower = new BrainPower(scene, this);
    this.ecoFootprint = new EcoFootprint(scene, this);

  }

  /**
   *
   */
  update() {


  }
}
