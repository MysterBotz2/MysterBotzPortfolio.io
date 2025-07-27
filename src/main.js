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

k.loadSprite("map", "./map.png");


k.setBackground(k.Color.fromHex("#331047"));

k.scene("main", async () => {

  const mapData = await (await fetch("./map.json")).json();
  const layers = mapData.layers;

      const map = k.add([
        k.sprite("map"),
        k.pos(0, 0),
        k.scale(scaleFactor),
    ]);

  const player = k.make([
    k.sprite("playerSprite", {
      anim: "idle-down"
    }),
    k.pos(),
    k.area({shape: new k.Rect(k.vec2(0,3),10,10)}),
    k.body(),
    k.anchor("center"),
    k.scale(scaleFactor),
    {
      speed: 250,
      direction: "down",
      collided: false,
    },
    "player"
  ]);

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for(const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
          }),
          k.body({
            isStatic: true,
          }),
          k.pos(boundary.x, boundary.y),
          boundary.name
        ]);

        if (boundary.name) {
         player.onCollide(boundary.name, () => {
            //player.collided = true;
        });
      }
    }
    continue;
  }

  if(layer.name === "spawnpoints")
  {
    for(const spawn of layer.objects) {
      if(spawn.name === "player") {
        player.pos = k.vec2( (map.pos.x + spawn.x) * scaleFactor,
                        (map.pos.y + spawn.y) * scaleFactor,);
        k.add(player);
        continue;
      }
    }
  }
}

  setCamScale(k);

    k.onResize(()=>{
         setCamScale(k);
    });


    k.onUpdate(() => {
        k.camPos(player.pos.x, player.pos.y + 100);
    });

    k.onMouseDown((mouseBtn)=> {
        if(mouseBtn !== "left" || player.collided) return;

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