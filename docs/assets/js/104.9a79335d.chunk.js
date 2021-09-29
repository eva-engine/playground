(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{558:function(n,e,t){"use strict";t.r(e),e.default="import { Game, GameObject, resource, RESOURCE_TYPE } from '@eva/eva.js';\nimport { RendererSystem } from '@eva/plugin-renderer';\nimport { Img, ImgSystem } from '@eva/plugin-renderer-img';\nimport { Text, TextSystem } from '@eva/plugin-renderer-text';\nimport {\n  Physics,\n  PhysicsSystem,\n  PhysicsType,\n} from '@eva/plugin-renderer-matterjs';\nimport { Graphics, GraphicsSystem } from '@eva/plugin-renderer-graphics';\nimport { Event, EventSystem } from '@eva/plugin-renderer-event';\nresource.addResource([\n  {\n    name: 'imageName',\n    type: RESOURCE_TYPE.IMAGE,\n    src: {\n      image: {\n        type: 'png',\n        url:\n          'https://gw.alicdn.com/imgextra/i2/O1CN01RXLKdU1NhImlj0VPt_!!6000000001601-2-tps-90-90.png',\n      },\n    },\n    preload: true,\n  },\n]);\n\nconst game = new Game({\n  systems: [\n    new RendererSystem({\n      canvas: document.querySelector('#canvas'),\n      width: 750,\n      height: 1000,\n      resolution: 2, // Keep the resolution of the RendererSystem consistent\n    }),\n    new ImgSystem(),\n    new PhysicsSystem({\n      resolution: 2, // Keep the resolution of the RendererSystem consistent\n      isTest: true, // Whether to enable debugging mode\n      element: document.querySelector('.debugger'), // Mount point of canvas node in debug mode\n      world: {\n        gravity: {\n          y: 5, // gravity\n        },\n      },\n    }),\n    new GraphicsSystem(),\n    new TextSystem(),\n    new EventSystem(),\n  ],\n});\n\nconst { physics } = createPlayer();\nconst { evt } = createButton();\nconst walls = [\n  createWall(0, 0, 20, 1000),\n  createWall(750 - 20, 0, 20, 1000),\n  createWall(0, 1000 - 20, 750, 20),\n];\n\nphysics.on('collisionStart', () => {\n  DrawRed();\n});\nphysics.on('collisionEnd', () => {\n  DrawGreen();\n});\n\nevt.on('tap', () => {\n  physics.body.force.y = -10;\n});\n\nfunction DrawRed() {\n  walls.forEach(wall => {\n    wall.drawColor(0xff0000);\n  });\n}\nfunction DrawGreen() {\n  walls.forEach(wall => {\n    wall.drawColor(0x00ffff);\n  });\n}\n\nfunction createPlayer() {\n  const image = new GameObject('image', {\n    size: { width: 240, height: 240 },\n    origin: { x: 0.5, y: 0.5 },\n    position: {\n      x: 375,\n      y: 100,\n    },\n    scale: {\n      x: -1,\n      y: 1,\n    },\n  });\n\n  image.addComponent(\n    new Img({\n      resource: 'imageName',\n    }),\n  );\n\n  const physics = image.addComponent(\n    new Physics({\n      type: PhysicsType.RECTANGLE,\n      bodyOptions: {\n        isStatic: false,\n        // restitution: 0,\n        frictionAir: 0.1,\n        friction: 0.06,\n        frictionStatic: 0.3,\n        force: {\n          x: 0,\n          y: 0,\n        },\n      },\n      stopRotation: true,\n    }),\n  );\n  game.scene.addChild(image);\n\n  return { physics };\n}\n\nfunction createWall(x, y, width, height) {\n  const go = new GameObject('graphics', {\n    position: { x: x + width / 2, y: y + height / 2 },\n    size: { width, height },\n    origin: { x: 0.5, y: 0.5 },\n  });\n  const graphics = go.addComponent(new Graphics());\n  graphics.graphics.beginFill(0x00ff00);\n  graphics.graphics.drawRect(0, 0, width, height);\n\n  go.addComponent(\n    new Physics({\n      type: PhysicsType.RECTANGLE,\n      bodyOptions: {\n        isStatic: true, // Whether the object is still, any force acting on the object in a static state will not produce any effect\n        restitution: 0.1,\n        frictionAir: 0,\n        friction: 0,\n        frictionStatic: 0,\n        force: {\n          x: 0,\n          y: 0,\n        },\n      },\n      stopRotation: true, // default false, usually do not need to be set\n    }),\n  );\n  game.scene.addChild(go);\n\n  return {\n    drawColor(color) {\n      graphics.graphics.beginFill(color);\n      graphics.graphics.drawRect(0, 0, width, height);\n    },\n  };\n}\n\nfunction createButton() {\n  const textGO = new GameObject('text', {\n    origin: {\n      x: 0.5,\n      y: 0.5,\n    },\n    anchor: {\n      x: 0.5,\n      y: 0.5,\n    },\n  });\n  textGO.addComponent(\n    new Text({\n      text: 'Jump',\n      style: {\n        fill: 0xffffff,\n        fontSize: 50,\n      },\n    }),\n  );\n  const go = new GameObject('button', {\n    position: {\n      x: 750 - 30,\n      y: 1000 - 30,\n    },\n    origin: {\n      x: 1,\n      y: 1,\n    },\n  });\n  const { graphics } = go.addComponent(new Graphics());\n  graphics.beginFill(0x00ffff);\n  const w = 240;\n  const h = 120;\n  graphics.drawRoundedRect(0, 0, w, h);\n  go.transform.size.width = w;\n  go.transform.size.height = h;\n  go.addChild(textGO);\n  game.scene.addChild(go);\n\n  const evt = go.addComponent(new Event());\n  return { evt };\n}\n"}}]);