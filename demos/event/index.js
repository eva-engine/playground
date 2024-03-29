import { Game, GameObject, resource, RESOURCE_TYPE } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import {
  Event,
  EventSystem,
  HIT_AREA_TYPE,
} from '@eva/plugin-renderer-event';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';

resource.addResource([
  {
    name: 'heart',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image:{
        type: 'png',
        url: '//gw.alicdn.com/bao/uploaded/TB1lVHuaET1gK0jSZFhXXaAtVXa-200-200.png',
      }
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
    new EventSystem({
      // moveWhenInside: true // 代表只有在元素内部才会执行move事件，默认为false
    }),
    new ImgSystem(),
  ],
});

const image = new GameObject('image', {
  size: { width: 200, height: 200 },
  origin: { x: 0.5, y: 0.5 },
  position: {
    x: 50,
    y: 68,
  },
  anchor: { x: 0.5, y: 0.5 },
});
const img = image.addComponent(
  new Img({
    resource: 'heart',
  }),
);

const evt = image.addComponent(
  new Event({
    // 使用这个属性设置交互事件可以触发的区域，骨骼动画有所变差，可以临时在当前游戏对象下添加一个同类型同属性的Graphic查看具体点击位置。
    hitArea: {
      type: HIT_AREA_TYPE.Polygon,
      style: {
        paths: [
          109,
          48,
          161,
          21,
          194,
          63,
          193,
          104,
          65,
          176,
          8,
          86,
          38,
          40,
          90,
          33,
        ],
      },
    },
  }),
);

let touched = false;
evt.on('touchstart', e => {
  console.log(e);
  console.log('touchstart');
  touched = true;
});
evt.on('touchend', e => {
  console.log('touchend');
  touched = false;
});
evt.on('touchmove', e => {
  if (touched) {
    const transform = e.gameObject.transform;
    console.log('touchmove');
    console.log(
      transform.size.width * (1 - transform.origin.x),
      transform.size.height * (1 - transform.origin.y),
    );
    transform.position = e.data.position;
  }
});

game.scene.addChild(image);
