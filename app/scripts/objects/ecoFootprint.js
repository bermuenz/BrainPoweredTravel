import Team from '@/objects/team';

export default class EcoFootprint {

    constructor(scene, team) {

      let x, textX;
      let y = scene.cameras.main.height * 0.7;
      let textY = 85;
      let texture;
      if (team.teamId == 0) {
        x = scene.cameras.main.width * 0.1;
        textX = -8;
        texture = "ecopoints_l_0";
      } else {
        x = scene.cameras.main.width * 0.9;
        textX = 4;
        texture = "ecopoints_r_0";
      }

      this.team = team;
      this.container = scene.add.container(x, y);
      this.ecoSprite = scene.add.sprite(0, 0, texture);
      this.text = scene.add.text(textX, textY, "", {font: "16px Arial", fill: "#ffffff"});
      this.text.setOrigin(0.5, 0.5);
      this.container.add(this.ecoSprite);
      this.container.add(this.text);

    }

    /**
     *
     */
    update() {
      let i = Math.min(9, this.team.ecoPoints);
      if (this.team.teamId == 0) {
        this.ecoSprite.setTexture("ecopoints_r_" + i);
      } else {
        this.ecoSprite.setTexture("ecopoints_l_" + i);
      }
      this.text.setText(this.team.ecoPoints);
    }
  }
