(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{521:function(n,e,t){"use strict";t.r(e),e.default="import {\n  Game,\n  GameObject,\n  resource,\n  RESOURCE_TYPE,\n  Component,\n} from '@eva/eva.js';\nimport { RendererSystem } from '@eva/plugin-renderer';\nimport {Img, ImgSystem} from '@eva/plugin-renderer-img'\n\nclass Move extends Component {\n  static componentName = 'Move';\n  speed = {\n    // \u79fb\u52a8\u901f\u5ea6\n    x: 100,\n    y: 200,\n  };\n  init(obj) {\n    Object.assign(this, obj);\n  }\n  update(e) {\n    // \u6bcf\u79d2 N \u50cf\u7d20\n    // console.log(e)\n    const position = this.gameObject.transform.position;\n    this.gameObject.transform.position.x += this.speed.x * (e.deltaTime / 1000);\n    this.gameObject.transform.position.y += this.speed.y * (e.deltaTime / 1000);\n    if (position.x >= 750 || position.x <= 0) {\n      this.speed.x = -this.speed.x;\n    }\n    if (position.y >= 1000 || position.y <= 0) {\n      this.speed.y = -this.speed.y;\n    }\n  }\n  onPause() {\n    this.oldSpeed = this.speed;\n    this.speed = {\n      x: 0,\n      y: 0,\n    };\n  }\n  onPlay() {\n    this.speed = this.oldSpeed;\n  }\n}\nresource.addResource([\n  {\n    name: 'heart',\n    type: RESOURCE_TYPE.IMAGE,\n    src: {\n      image: {\n        type: 'png',\n        url:\n          '//gw.alicdn.com/bao/uploaded/TB1lVHuaET1gK0jSZFhXXaAtVXa-200-200.png',\n      },\n    },\n    preload: false,\n  },\n]);\n\nconst game = new Game({\n  systems: [\n    new RendererSystem({\n      canvas: document.querySelector('#canvas'),\n      width: 750,\n      height: 1000,\n    }),\n    new ImgSystem()\n  ],\n});\n\nconst image = new GameObject('image', {\n  size: { width: 200, height: 200 },\n  origin: { x: 0.5, y: 0.5 },\n  position: {\n    x: 0,\n    y: 0,\n  },\n});\nconst img = image.addComponent(\n  new Img({\n    resource: 'heart',\n  }),\n);\n\ngame.scene.addChild(image);\n\nconst move = image.addComponent(\n  new Move({\n    speed: {\n      x: 250,\n      y: 200,\n    },\n  }),\n);\ndocument.addEventListener('visibilitychange', () => {\n  if (document.hidden) {\n    game.pause();\n  } else {\n    game.start();\n  }\n});\n"}}]);