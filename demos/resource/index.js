import { resource, RESOURCE_TYPE, LOAD_EVENT } from '@eva/eva.js';

resource.addResource([
  {
    name: 'img',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url:
          '//gw.alicdn.com/bao/uploaded/TB1lVHuaET1gK0jSZFhXXaAtVXa-200-200.png',
      },
    },
    preload: false,
  },
  {
    name: 'sprite',
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
      image: {
        type: 'png',
        url:
          'https://gw.alicdn.com/bao/uploaded/TB15pMkkrsTMeJjSszhXXcGCFXa-377-1070.png',
      },
      json: {
        type: 'json',
        url: 'https://gw.alicdn.com/mt/TB1qCvumsyYBuNkSnfoXXcWgVXa.json',
      },
    },
    preload: false,
  },
  {
    name: 'img1',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url:
          'https://gw.alicdn.com/bao/uploaded/TB15pMkkrsTMeJjSszhXXcGCFXa-377-1070.png',
      },
    },
    preload: true,
  },
  {
    name: 'dragonbone',
    type: RESOURCE_TYPE.DRAGONBONE,
    src: {
      image: {
        type: 'png',
        url: 'https://gw.alicdn.com/tfs/TB1RIpUBhn1gK0jSZKPXXXvUXXa-1024-1024.png',
      },
      tex: {
        type: 'json',
        url: './json/fb18baf3a1af41a88f9d1a4426d47832.json',
      },
      ske: {
        type: 'json',
        url: './json/c904e6867062e21123e1a44d2be2a0bf.json',
      },
    },
    preload: true,
  },
  {
    name: 'dragonbone1',
    type: RESOURCE_TYPE.DRAGONBONE,
    src: {
      image: {
        type: 'png',
        url: 'https://gw.alicdn.com/tfs/TB1dAN1BbY1gK0jSZTEXXXDQVXa-512-512.png1',
      },
      tex: {
        type: 'json',
        url: './json/930e2ec1ae544577dc8ad9f85b4db82f.json',
      },
      ske: {
        type: 'json',
        url: './json/79757e9b86ffcf32ece00284e0df8ee0.json',
      },
    },
    preload: true,
  },
]);

EVA.resource.preload();
resource.on(LOAD_EVENT.START, e => {
  console.log('start', e);
}); // 开始loader
resource.on(LOAD_EVENT.PROGRESS, e => {
  console.log('progress', e);
  document.querySelector('.loaded').style.width = e.progress + '%';
  document.querySelector('.text').innerHTML = parseInt(e.progress) + '%';
  document.querySelector('.point').style.left = `calc(${e.progress}% - 10vw)`;
}); // 加载进度更新
resource.on(LOAD_EVENT.LOADED, e => {
  console.log('LOADED', e);
}); // 某文件加载成功
resource.on(LOAD_EVENT.COMPLETE, e => {
  console.log('COMPLETE', e);
}); // 加载进度更新
resource.on(LOAD_EVENT.ERROR, e => {
  console.log('error', e);
}); // 某文件加载失败
