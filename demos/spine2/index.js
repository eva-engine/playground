import { Game, GameObject, resource } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Spine, SpineSystem } from '@eva/plugin-renderer-spine';

resource.addResource([
  {
    name: 'anim',
    // @ts-ignore
    type: 'SPINE',
    src: {
      image: {
        type: 'png',
        url: 'https://gw.alicdn.com/tfs/TB18mfY1FY7gK0jSZKzXXaikpXa-805-804.png',
      },
      ske: {
        type: 'json',
        url: './json/08a16034db954b2dc2c7f7cff38d5b4c.json',
      },
      atlas: {
        type: 'atlas',
        url: './json/41799e38f99969d2d6f39c4fa75f8861.atlas',
      },
    },
  },
]);

const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: 750,
      height: 1000,
    }),
    new SpineSystem(),
  ],
  autoStart: true,
  frameRate: 30,
});

// 此处还在考虑如何设置默认场景的宽高
game.scene.transform.size = {
  width: 750,
  height: 1000,
};

const container = new GameObject('container', {
  anchor: {
    x: 0,
    y: 0,
  },
  origin: {
    x: 0,
    y: 0
  },
});

function add(x = 0, y = 0) {
  const gameObject = new GameObject('spine', {
    anchor: {
      x: 0,
      y: 0,
    },
    origin: {
      x: 0,
      y: 0
    },
    position: {
      x: x + 100,
      y: y + 100
    },
    scale: {
      x: 0.2,
      y: 0.2,
    },
  });
  const spine = new Spine({ resource: 'anim', animationName: 'idle' });
  gameObject.addComponent(spine);
  spine.play('idle');
  container.addChild(gameObject);
}

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    add(i * 100, j * 100);
  }
}

game.scene.addChild(container);



