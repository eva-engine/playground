(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{552:function(n,e,r){"use strict";r.r(e),e.default="\nimport {Game, GameObject, resource} from '@eva/eva.js'\nimport {RendererSystem} from '@eva/plugin-renderer';\nimport {Mars, MarsSystem} from '@ali/eva-plugin-renderer-mars';\n\nresource.addResource([\n  {\n    name: 'marsName',\n    type: 'MARS',\n    src: {\n      json: {\n        type: 'json',\n        url:\n          'https://g.alicdn.com/eva-assets/d78f8046f77854e4d1a56c0b087bf790/0.0.1/tmp/693e9/693e9.json',\n      },\n    },\n    preload: true,\n  },\n]);\n// resource.preload()\nconst game = new Game({\n  systems: [\n    new RendererSystem({\n      canvas: document.querySelector('#canvas'),\n      width: 750,\n      height: 1334,\n    }),\n    new MarsSystem(),\n  ],\n});\n\nconst mars = new GameObject('mars', {});\n\nmars.addComponent(\n  new Mars({\n    resource: 'marsName',\n    options: {\n      fixCamera: true,\n      delegate: {\n        onItemClicked: (...args) => {\n          console.log(args);\n        },\n      },\n      interactive: true,\n    },\n  }),\n);\n\ngame.scene.addChild(mars);"}}]);