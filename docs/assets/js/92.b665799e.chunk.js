(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{539:function(n,e,a){"use strict";a.r(e),e.default="import { Game, GameObject, resource, RESOURCE_TYPE } from '@eva/eva.js';\nimport { RendererSystem } from '@eva/plugin-renderer';\nimport { Img, ImgSystem } from '@eva/plugin-renderer-img';\nresource.addResource([\n  {\n    name: 'imageName',\n    type: RESOURCE_TYPE.IMAGE,\n    src: {\n      image: {\n        type: 'png',\n        url:\n          'https://gw.alicdn.com/tfs/TB1DNzoOvb2gK0jSZK9XXaEgFXa-658-1152.webp',\n      },\n    },\n    preload: true,\n  },\n]);\n\n{\n  const game = new Game({\n    systems: [\n      new RendererSystem({\n        canvas: document.querySelector('#canvas'),\n        width: 750,\n        height: 1000,\n      }),\n      new ImgSystem(),\n    ],\n  });\n\n  const image = new GameObject('image', {\n    size: { width: 750, height: 1319 },\n    origin: { x: 0, y: 0 },\n    position: {\n      x: 0,\n      y: -319,\n    },\n    anchor: {\n      x: 0,\n      y: 0,\n    },\n  });\n\n  image.addComponent(\n    new Img({\n      resource: 'imageName',\n    }),\n  );\n\n  game.scene.addChild(image);\n}\n"}}]);