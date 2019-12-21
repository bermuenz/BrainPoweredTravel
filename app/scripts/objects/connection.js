export default class Connection extends Phaser.GameObjects.Line {
  /**
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene, startCity, endCity) {

    let startX = startCity.getCenter().x;
    let startY = startCity.getCenter().y;
    let endX = endCity.getCenter().x;
    let endY = endCity.getCenter().y;

    let distance = Math.sqrt(Math.pow(Math.abs(startY - endY), 2) + Math.pow(Math.abs(startX - endX), 2));
    let t = 10 / distance;
    let x_0 = (1 - t)*startX + t*endX;
    let y_0 = (1 - t)*startY + t*endY;
    t = (distance - 10) / distance;
    let x_1 = (1 - t)*startX + t*endX;
    let y_1 = (1 - t)*startY + t*endY;

    super(scene, x_0, y_0, 0, 0, x_1 - x_0, y_1 - y_0, 0xaa3f3f);
    //super(scene, startX, startY, 0, 0, 100, 100, 0xff0000);
    this.setOrigin(0, 0);
    scene.add.existing(this);
  }

  highlight(isHighlight) {
    if (isHighlight) {
      this.setStrokeStyle(1, 0x00ff00, 1);
    } else {
      this.setStrokeStyle(1, 0xaa3f3f, 1);
    }
  }

  /**
   *
   */
  update() {


  }
}
