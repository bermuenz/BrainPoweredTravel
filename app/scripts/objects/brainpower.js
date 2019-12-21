import Team from '@/objects/team';

export default class BrainPower extends Phaser.GameObjects.Sprite {
  /**
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene, team) {
    let x;
    let y = scene.cameras.main.height * 0.2;
    let texture;
    if (team.teamId == 0) {
      x = scene.cameras.main.width * 0.1;
      texture = "Gehirn/Gehirn_links/Gehirn_links_0";
    } else {
      x = scene.cameras.main.width * 0.9;
      texture = "Gehirn/Gehirn_rechts/Gehirn_rechts_0";
    }

    let i = 1;
    setInterval(() => {
      if (team.teamId == 0) {
        this.setTexture("Gehirn/Gehirn_links/Gehirn_links_" + i);
      } else {
        this.setTexture("Gehirn/Gehirn_rechts/Gehirn_rechts_" + i);
      }
      i++;
      if (i > 6) i = 0;
    }, 1000);

    super(scene, x, y, texture);

    this.setOrigin(0.5);
    scene.add.existing(this);

    this.team = team;

/*
  - links/rechts position
  - change texture
  - add text

*/



  }

  /**
   *
   */
  update() {


  }
}
