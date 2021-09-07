(window.webpackJsonp=window.webpackJsonp||[]).push([[116],{569:function(n,e,a){"use strict";a.r(e),e.default="import { Game, GameObject, resource } from '@eva/eva.js';\nimport { RendererSystem } from '@eva/plugin-renderer';\nimport { Spine, SpineSystem } from '@eva/plugin-renderer-spine';\n\nresource.addResource([\n  {\n    name: 'anim',\n    // @ts-ignore\n    type: 'SPINE',\n    src: {\n      ske: {\n        type: 'json',\n        url: './json/b5fdf74313d5ff2609ab82f6b6fd83e6.json',\n      },\n      // @ts-ignore\n      atlas: {\n        type: 'atlas',\n        url: './json/b8597f298a5d6fe47095d43ef03210d4.atlas',\n      },\n      image: {\n        type: 'png',\n        url:\n          'https://gw.alicdn.com/tfs/TB1YHC8Vxz1gK0jSZSgXXavwpXa-711-711.png',\n      },\n    },\n  },\n]);\n\nconst game = new Game({\n  systems: [\n    new RendererSystem({\n      canvas: document.querySelector('#canvas'),\n      width: 750,\n      height: 1000,\n    }),\n    new SpineSystem(),\n  ],\n  autoStart: true,\n  frameRate: 60,\n});\n\n// \u6b64\u5904\u8fd8\u5728\u8003\u8651\u5982\u4f55\u8bbe\u7f6e\u9ed8\u8ba4\u573a\u666f\u7684\u5bbd\u9ad8\ngame.scene.transform.size = {\n  width: 750,\n  height: 1000,\n};\n\nconst gameObject = new GameObject('spine', {\n  anchor: {\n    x: 0.5,\n    y: 0.5,\n  },\n  scale: {\n    x: 0.5,\n    y: 0.5,\n  },\n});\nconst spine = new Spine({ resource: 'anim', animationName: 'idle' });\ngameObject.addComponent(spine);\nspine.on('complete', e => {\n  console.log('\u52a8\u753b\u64ad\u653e\u7ed3\u675f', e.name);\n});\nspine.play('idle');\ngame.scene.addChild(gameObject);\n"}}]);