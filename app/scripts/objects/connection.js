export default class Connection extends Phaser.GameObjects.Line {
  /**
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene, startCity, endCity) {

    console.log(startCity.x);
    console.log(startCity.getCenter());
    let startX = startCity.getCenter().x;
    let startY = startCity.getCenter().y;
    let endX = endCity.getCenter().x;
    let endY = endCity.getCenter().y;

    super(scene, startX, startY, 0, 0, endX - startX, endY - startY, 0x000000);
    //super(scene, startX, startY, 0, 0, 100, 100, 0xff0000);
    this.setOrigin(0, 0);


  }

  /**
   *
   */
  update() {


  }
}
