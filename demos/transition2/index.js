import { Game, GameObject, resource, RESOURCE_TYPE } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { Mask, MaskSystem, MASK_TYPE } from '@eva/plugin-renderer-mask';

import { Transition, TransitionSystem } from '@eva/plugin-transition';

resource.addResource([
  {
    name: 'number',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url: '//gw.alicdn.com/tfs/TB1mTtrpKT2gK0jSZFvXXXnFXXa-62-770.png',
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
      backgroundColor: 0xff00ff,
    }),
    new ImgSystem(),
    new MaskSystem(),
    new TransitionSystem(),
  ],
});

// 创建外部遮罩
const box = new GameObject('box', {
  size: { width: 60, height: 770 },
  position: { x: 345, y: 480 },
});

box.addComponent(
  new Mask({
    type: MASK_TYPE.Rect,
    style: {
      x: 0,
      y: 0,
      width: 60,
      height: 70,
    },
  }),
);

// 创建图片
const image = new GameObject('image', {
  size: { width: 50, height: 770 },
});
image.addComponent(
  new Img({
    resource: 'number',
  }),
);

// 创建动画
const animation = image.addComponent(new Transition());

animation.group = {
  idle: [
    {
      name: 'position.y',
      component: image.transform,
      values: [
        {
          time: 0,
          value: 0,
          tween: 'linear',
        },
        {
          time: 1000,
          value: -700,
        },
      ],
    },
  ],
};
// 开始转动
animation.play('idle', Infinity);

// 五秒后拿到结束值 停止转动

setTimeout(() => {
  animation.stop('idle');

  const stopNumber = ~~(Math.random() * 10);

  // 新增动画组不要和之前的动画组重名，覆盖无效
  animation.group.stop = [
    {
      name: 'position.y',
      component: image.transform,
      values: [
        {
          time: 0,
          value: 0,
          tween: 'ease-out',
        },
        {
          time: 1000,
          value: -stopNumber * 70,
        },
      ],
    },
  ];

  animation.play('stop');
}, 5000);

box.addChild(image);
game.scene.addChild(box);
