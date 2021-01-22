export default async () => {
  const [htmlCode, jsCode, cssCode] = await Promise.all([
    import('!raw-loader!./index.html'),
    import('!raw-loader!./index.js'),
    import('!raw-loader!./index.css'),
  ]);

  return {
    css: {
      code: cssCode, // CSS 代码
      transformer: 'css',
      visible: true,
    },
    html: {
      code: htmlCode, // HTML 代码
      transformer: 'html',
      visible: true,
    },
    javascript: {
      code: jsCode, // JavaScript 代码
      transformer: 'javascript', // JavaScript transformer
      visible: false,
    },
    foldBoxes: [''], // 在 waterfall 模式下收起的 box
    packages: {
      js: [],
      css: [], // 加载外部 CSS 文件
    },
  };
};
