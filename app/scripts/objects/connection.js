export default class Connection extends Phaser.GameObjects.Sprite {
  /**
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene, startCityId, endCityId) {
    super(scene, x, y, 'connection-' + startCityId + "_" + endCityId);

    this.startCityId = startCityId;
    this.endCityId = endCityId;
    this.distance = 1;
  }

  /**
   *
   */
  update() {


  }
}
