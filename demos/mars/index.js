
import {Game, GameObject, resource} from '@eva/eva.js'
import {RendererSystem} from '@eva/plugin-renderer';
import {Mars, MarsSystem} from '@ali/eva-plugin-renderer-mars';

resource.addResource([
  {
    name: 'marsName',
    type: 'MARS',
    src: {
      json: {
        type: 'json',
        url:
          'https://g.alicdn.com/eva-assets/d78f8046f77854e4d1a56c0b087bf790/0.0.1/tmp/693e9/693e9.json',
      },
    },
    preload: true,
  },
]);
// resource.preload()
const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: 750,
      height: 1334,
    }),
    new MarsSystem(),
  ],
});

const mars = new GameObject('mars', {});

mars.addComponent(
  new Mars({
    resource: 'marsName',
    options: {
      fixCamera: true,
      delegate: {
        onItemClicked: (...args) => {
          console.log(args);
        },
      },
      interactive: true,
    },
  }),
);

game.scene.addChild(mars);