import { Game, GameObject, resource } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Spine, SpineSystem } from '@eva/plugin-renderer-spine38';

resource.addResource([
  {
    name: 'anim',
    type: 'SPINE',
    src: {
      ske: {
        type: 'json',
        url: './json/ailemao.json',
      },
      atlas: {
        type: 'atlas',
        url: './json/ailemao.atlas',
      },
      image: {
        type: 'png',
        url:
          'https://gw.alicdn.com/imgextra/i3/O1CN01zkWBcJ24HDitn3wAz_!!6000000007365-2-tps-1271-1271.png',
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
  frameRate: 60,
});

// 此处还在考虑如何设置默认场景的宽高
game.scene.transform.size = {
  width: 750,
  height: 1000,
};

const gameObject = new GameObject('spine', {
  anchor: {
    x: 0.5,
    y: 0.5,
  },
  scale: {
    x: 0.5,
    y: 0.5,
  },
});
const spine = new Spine({ resource: 'anim', animationName: 'idle' });
gameObject.addComponent(spine);
spine.on('complete', e => {
  console.log('动画播放结束', e.name);
});
spine.play('idle');
game.scene.addChild(gameObject);
