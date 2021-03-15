var pkg = require('./package.json');
const pre = 'https://g.alicdn.com/eva/jscdn/1.0.1-alpha.3/'
const min = 'min.'
// const pre = 'http://127.0.0.1:8080/packages/evajs-cdn/cdn/'
// const min = ''
module.exports = {
  devServer: {
    port: 3000, //配置开发服务器的端口号，默认值3000
  },
  output: {
    dir: 'docs', // 配置构建部署时输出的目录，默认dist目录
    html: {
      title: 'EVA Playground',
    },
  },
  staticFolder: 'static',
  demoList: '.demoList.json', // demoList配置文件的文件名，默认为.demoList.json
  name: 'EVA Playground', // 配置Playground的标题
  version: `v${pkg.version}`,
  homePage: 'https://eva.js.org/playground', // 配置Playground链接跳转的主页
  boxTheme: 'monokai', // 配置代码编辑器的主题
  // 可选主题: active4d, allHallowsEve, amy, blackboard, brillianceBlack,
  // brillianceDull, chromeDevtools, cloudsMidnight, clouds, cobalt,
  // dawn, dreamweaver, eiffel, espressoLibre, github, idle, katzenmilch,
  // kuroirTheme, lazy, magicwbAmiga, merbivoreSoft, merbivore, monokai,
  // pastelsOnDark, slushAndPoppies, solarizedDark, solarizedLight,
  // spacecadet, sunburst, textmateMacClassic, tomorrowNightBlue,
  // tomorrowNightBright, tomorrowNightEighties, tomorrowNight, tomorrow,
  // twilight, vibrantInk, zenburnesque, iplastic, idlefingers, krtheme,
  // monoindustrial,
  globalPackages: {
    // 配置需要加载的 JS、CSS 库
    js: [
      'https://cdn.bootcdn.net/ajax/libs/eventemitter3/3.1.2/index.min.js',
      './stats.js',
      'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.15/lodash.min.js',
      'https://cdn.bootcdn.net/ajax/libs/pixi.js/4.8.7/pixi.min.js',
      './showStats.js',
      `${pre}EVA.${min}js`,
      `${pre}EVA.rendererAdapter.${min}js`,
      `${pre}EVA.plugin.renderer.${min}js`,
      `${pre}EVA.plugin.renderer.img.${min}js`,
      `${pre}EVA.plugin.renderer.text.${min}js`,
      `${pre}EVA.plugin.renderer.dragonbone.${min}js`,
      `${pre}EVA.plugin.renderer.spine.${min}js`,
      `${pre}EVA.plugin.renderer.sprite.${min}js`,
      `${pre}EVA.plugin.renderer.spriteAnimation.${min}js`,
      `${pre}EVA.plugin.renderer.tilingSprite.${min}js`,
      `${pre}EVA.plugin.renderer.render.${min}js`,
      `${pre}EVA.plugin.renderer.ninePatch.${min}js`,
      `${pre}EVA.plugin.renderer.graphics.${min}js`,
      `${pre}EVA.plugin.renderer.event.${min}js`,
      `${pre}EVA.plugin.renderer.mask.${min}js`,
      `${pre}EVA.plugin.renderer.lottie.${min}js`,
      `${pre}EVA.plugin.transition.${min}js`,
    ],
    css: [],
  },
  // tab waterfall
  editorViewMode: 'tab', // 配置代码块的UI展示方式，现在支持tab和waterfall两种展示方式
};
