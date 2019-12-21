export default class City extends Phaser.GameObjects.Sprite {
  /**
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene, cityId, x, y, isIntermediatePoint) {
    super(scene, 0, 0, isIntermediatePoint ? 'air_point' : 'city_point');

    this.cityId = cityId;
    this.x = x;
    this.y = y;
    this.isIntermediatePoint = isIntermediatePoint;
    this.connections = [];

    this.setPosition(window.innerWidth * (x / 100), window.innerHeight * (y / 100));
    this.setScale(0.5, 0.5);
    this.setOrigin(0.5, 0.5);


  }

  /**
   *
   */
  update() {


  }
}
