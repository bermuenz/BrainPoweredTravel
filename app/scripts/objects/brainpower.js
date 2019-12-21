import Team from '@/objects/team';

export default class BrainPower {

  constructor(scene, team) {

    let x, textX;
    let y = scene.cameras.main.height * 0.2;
    let textY = 57;
    let texture;
    if (team.teamId == 0) {
      x = scene.cameras.main.width * 0.1;
      textX = -13;
      texture = "Gehirn/Gehirn_links/Gehirn_links_0";
    } else {
      x = scene.cameras.main.width * 0.9;
      textX = 12;
      texture = "Gehirn/Gehirn_rechts/Gehirn_rechts_0";
    }

    this.team = team;
    this.container = scene.add.container(x, y);
    this.brainSprite = scene.add.sprite(0, 0, texture);
    this.text = scene.add.text(textX, textY, "", {font: "16px Arial", fill: "#ffffff"});
    this.text.setOrigin(0.5, 0.5);
    this.container.add(this.brainSprite);
    this.container.add(this.text);

  }

  /**
   *
   */
  update() {
    let i = Math.min(6, Math.floor(this.team.brainPoints / 10));
    if (this.team.teamId == 0) {
      this.brainSprite.setTexture("Gehirn/Gehirn_links/Gehirn_links_" + i);
    } else {
      this.brainSprite.setTexture("Gehirn/Gehirn_rechts/Gehirn_rechts_" + i);
    }
    this.text.setText(this.team.brainPoints);
  }
}
