(window.webpackJsonp=window.webpackJsonp||[]).push([[122],{576:function(n,e,a){"use strict";a.r(e),e.default="import { Game, GameObject, resource } from '@eva/eva.js';\nimport { RendererSystem } from '@eva/plugin-renderer';\nimport { Spine, SpineSystem } from '@eva/plugin-renderer-spine';\n\nresource.addResource([\n  {\n    name: 'anim',\n    // @ts-ignore\n    type: 'SPINE',\n    src: {\n      image: {\n        type: 'png',\n        url: 'https://gw.alicdn.com/tfs/TB18mfY1FY7gK0jSZKzXXaikpXa-805-804.png',\n      },\n      ske: {\n        type: 'json',\n        url: './json/08a16034db954b2dc2c7f7cff38d5b4c.json',\n      },\n      atlas: {\n        type: 'atlas',\n        url: './json/41799e38f99969d2d6f39c4fa75f8861.atlas',\n      },\n    },\n  },\n]);\n\nconst game = new Game({\n  systems: [\n    new RendererSystem({\n      canvas: document.querySelector('#canvas'),\n      width: 750,\n      height: 1000,\n    }),\n    new SpineSystem(),\n  ],\n  autoStart: true,\n  frameRate: 30,\n});\n\n// \u6b64\u5904\u8fd8\u5728\u8003\u8651\u5982\u4f55\u8bbe\u7f6e\u9ed8\u8ba4\u573a\u666f\u7684\u5bbd\u9ad8\ngame.scene.transform.size = {\n  width: 750,\n  height: 1000,\n};\n\nconst container = new GameObject('container', {\n  anchor: {\n    x: 0,\n    y: 0,\n  },\n  origin: {\n    x: 0,\n    y: 0\n  },\n});\n\nfunction add(x = 0, y = 0) {\n  const gameObject = new GameObject('spine', {\n    anchor: {\n      x: 0,\n      y: 0,\n    },\n    origin: {\n      x: 0,\n      y: 0\n    },\n    position: {\n      x: x + 100,\n      y: y + 100\n    },\n    scale: {\n      x: 0.2,\n      y: 0.2,\n    },\n  });\n  const spine = new Spine({ resource: 'anim', animationName: 'idle' });\n  gameObject.addComponent(spine);\n  spine.play('idle');\n  container.addChild(gameObject);\n}\n\nfor (let i = 0; i < 5; i++) {\n  for (let j = 0; j < 5; j++) {\n    add(i * 100, j * 100);\n  }\n}\n\ngame.scene.addChild(container);\n\n\n\n"}}]);