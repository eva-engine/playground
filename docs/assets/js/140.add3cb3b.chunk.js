(window.webpackJsonp=window.webpackJsonp||[]).push([[140],{594:function(n,e,a){"use strict";a.r(e),e.default="import { Game, GameObject, resource, RESOURCE_TYPE } from '@eva/eva.js';\nimport { RendererSystem } from '@eva/plugin-renderer';\nimport { Img, ImgSystem } from '@eva/plugin-renderer-img';\nimport { Transition, TransitionSystem } from '@eva/plugin-transition';\n\nresource.addResource([\n  {\n    name: 'heart',\n    type: RESOURCE_TYPE.IMAGE,\n    src: {\n      image: {\n        type: 'png',\n        url: '//gw.alicdn.com/bao/uploaded/TB1lVHuaET1gK0jSZFhXXaAtVXa-200-200.png',\n      }\n    },\n    preload: false,\n  },\n]);\n\nconst game = new Game({\n  systems: [\n    new RendererSystem({\n      canvas: document.querySelector('#canvas'),\n      width: 750,\n      height: 1000,\n    }),\n    new ImgSystem(),\n    new TransitionSystem()\n  ],\n});\nconst image = new GameObject('image', {\n  size: { width: 200, height: 200 },\n  origin: { x: 0, y: 0 },\n  position: {\n    x: 0,\n    y: 0,\n  },\n  anchor: { x: 0.5, y: 0.5 },\n});\nconst img = image.addComponent(\n  new Img({\n    resource: 'heart',\n  }),\n);\n\nconst animation = image.addComponent(new Transition());\nanimation.group = {\n  idle: [\n    {\n      name: 'scale.x',\n      component: image.transform,\n      values: [\n        {\n          time: 0,\n          value: 1,\n          tween: 'ease-out',\n        },\n        {\n          time: 300,\n          value: 1.2,\n          tween: 'ease-in',\n        },\n        {\n          time: 600,\n          value: 1,\n        },\n      ],\n    },\n    {\n      name: 'scale.y',\n      component: image.transform,\n      values: [\n        {\n          time: 0,\n          value: 1,\n          tween: 'ease-out',\n        },\n        {\n          time: 300,\n          value: 1.2,\n          tween: 'ease-in',\n        },\n        {\n          time: 600,\n          value: 1,\n        },\n      ],\n    },\n  ],\n  move: [\n    {\n      name: 'position.x',\n      component: image.transform,\n      values: [\n        {\n          time: 0,\n          value: 1,\n          tween: 'ease-out',\n        },\n        {\n          time: 300,\n          value: 300,\n          tween: 'ease-in',\n        },\n      ],\n    },\n    {\n      name: 'position.y',\n      component: image.transform,\n      values: [\n        {\n          time: 0,\n          value: 1,\n          tween: 'ease-in',\n        },\n        {\n          time: 300,\n          value: 300,\n        },\n      ],\n    },\n  ],\n};\n\nanimation.play('move', 1);\nanimation.on('finish', name => {\n  name === 'move' && animation.play('idle', 3);\n});\n\ngame.scene.addChild(image);\n"}}]);