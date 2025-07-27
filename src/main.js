import { scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { setCamScale } from "./utils";


//Loading Sprites

k.loadSprite("playerSprite", "./WholeSprite.png",
  {
    sliceX: 4,
    sliceY: 4,
    anims: {
      "idle-down": {
        from: 0,
        to: 1,
        loop: true,
        speed: 8,
      },
      "idle-up": 12,
      "idle-side": 8,
      "walk-down": {
        from: 4,
        to: 6,
        loop: true,
        speed: 8,
      },
      "walk-up": {
        from: 12,
        to: 15,
        loop: true,
        speed: 8,
      },
      "walk-side": {
        from: 8,
        to: 11,
        loop: true,
        speed: 8,
      },
    },
  }
);

k.scene("main", () => {

  const player = k.make([
    k.sprite("playerSprite", {
      anim: "idleDown"
    }),
    k.pos(),
    k.area({shape: new k.Rect(k.vec2(0,3),10,10)}),
    k.body(),
    k.anchor("center"),
    k.scale(scaleFactor),
    {
      speed: 250,
      direction: "down",
    },
    "player"
  ]);

   player.pos = k.vec2(k.width() / 2, k.height() / 2);
  k.add(player)

  setCamScale(k);

    k.onResize(()=>{
         setCamScale(k);
    });

    k.onUpdate(() => {
        //k.camPos(player.pos.x, player.pos.y + 100);
    });

    k.onMouseDown((mouseBtn)=> {
        if(mouseBtn !== "left") return;

        const worldMousePos = k.toWorld(k.mousePos());
        player.moveTo(worldMousePos, player.speed);

        const mouseAngle = player.pos.angle(worldMousePos);

        const lowerBound = 50;
        const upperBound = 125;

        if(
            mouseAngle > lowerBound
            &&
            mouseAngle < upperBound
            &&
            player.curAnim() !== "walk-up"
        ){
            player.play("walk-up");
            player.direction = "up";
            return;
        }

        if(
            mouseAngle < -lowerBound
            &&
            mouseAngle > -upperBound
            &&
            player.curAnim() !== "walk-down"
        ){
            player.play("walk-down");
            player.direction = "down";
            return;
        }

        if(Math.abs(mouseAngle) > upperBound)
        {
            player.flipX = false;
            if(player.curAnim() !== "walk-side") player.play("walk-side");
            player.direction = "right";
            return;
        }

        if(Math.abs(mouseAngle) < lowerBound)
        {
            player.flipX = true;
            if(player.curAnim() !== "walk-side") player.play("walk-side");
            player.direction = "right";
            return;
        }

    });

    function stopAnims() {
        if (player.direction === "down") {
            player.play("idle-down");
            return;
        }
        if (player.direction === "up") {
            player.play("idle-up");
            return;
        }

        player.play("idle-side");

    }

    k.onMouseRelease(stopAnims);

    k.onKeyRelease(() => {
        stopAnims();
    });

    k.onKeyDown((key) => {
    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"),
      k.isKeyDown("up"),
      k.isKeyDown("down"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }

    if (nbOfKeyPressed > 1) return;

    if (player.isInDialogue) return;
    if (keyMap[0]) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      player.move(player.speed, 0);
      return;
    }

    if (keyMap[1]) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      player.move(-player.speed, 0);
      return;
    }

    if (keyMap[2]) {
      if (player.curAnim() !== "walk-up") player.play("walk-up");
      player.direction = "up";
      player.move(0, -player.speed);
      return;
    }

    if (keyMap[3]) {
      if (player.curAnim() !== "walk-down") player.play("walk-down");
      player.direction = "down";
      player.move(0, player.speed);
    }
  });


});


k.go("main");