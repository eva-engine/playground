import { Game, GameObject, resource, RESOURCE_TYPE } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { SpriteAnimation, SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';

resource.addResource([
  {
    name: 'fruit',
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
      image: {
        type: 'json',
        url:
          'https://gw.alicdn.com/bao/uploaded/TB15pMkkrsTMeJjSszhXXcGCFXa-377-1070.png',
      },
      json: {
        type: 'json',
        url:
          'https://gw.alicdn.com/mt/TB1qCvumsyYBuNkSnfoXXcWgVXa.json',
      },
    },
    preload: false,
  },
]);

const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: 750,
      height: 1000,
    }),
    new SpriteAnimationSystem()
  ],
});

const cut = new GameObject('cut', {
  size: { width: 300, height: 200 },
  origin: { x: 0, y: 0 },
});

const frame = cut.addComponent(
  new SpriteAnimation({
    resource: 'fruit',
    speed: 100,
  }),
);

frame.play();

game.scene.addChild(cut);
