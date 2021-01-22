export default function transform(code) {
  const impt = /import\s+{/g;
  code = code.replace(impt, 'const {');
  const frm = /}\s+from\s+('.+')/g;
  code = code.replace(frm, (str, match) => {
    console.log(match);
    if (match === `'@eva/eva.js'`) {
      return '} = EVA';
    } else if (match.indexOf(`'@eva/plugin`) === 0) {
      let name = match.substring(13, match.length - 1);
      // name = name[0] + name.substring(1);
      name = name.replace('-', '.')
      const [a, b] = name.split('-')
      if (b) {
        name = a+b[0].toUpperCase()+b.substring(1)
      }
      return `} = EVA.plugin.${name}`;
    }
  });
  console.log(code,123)
  return code
}
