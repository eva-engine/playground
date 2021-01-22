import { Game, GameObject, resource, RESOURCE_TYPE } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { Graphics, GraphicsSystem } from '@eva/plugin-renderer-graphics';
import { Render, RenderSystem } from '@eva/plugin-renderer-render';
resource.addResource([
  {
    name: 'blue',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url:
          'https://gw.alicdn.com/tfs/TB11hpw1kY2gK0jSZFgXXc5OFXa-200-200.png',
      },
    },
    preload: true,
  },
  {
    name: 'red',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url:
          'https://gw.alicdn.com/tfs/TB1IreQmCslXu8jSZFuXXXg7FXa-200-200.png',
      },
    },
    preload: true,
  },
]);

const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: 750,
      height: 1000,
    }),
    new ImgSystem(),
    new GraphicsSystem(),
    new RenderSystem(),
  ],
});

const image = new GameObject('image1', {
  size: { width: 500, height: 700 },
  origin: { x: 0, y: 0 },
  position: {
    x: 100,
    y: 100,
  },
  anchor: {
    x: 0,
    y: 0,
  },
});

image.addComponent(
  new Img({
    resource: 'blue',
  }),
);
const image2 = new GameObject('image2', {
  size: { width: 150, height: 100 },
  origin,
  position: {
    x: 0,
    y: 0,
  },
  anchor,
});

image2.addComponent(
  new Img({
    resource: 'red',
  }),
);

image.addChild(image2);

game.scene.addChild(image);

drawPoints();
