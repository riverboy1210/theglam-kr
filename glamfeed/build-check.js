
const fs = require('fs');

const css = \;

fs.writeFileSync('css-check.txt', css.length + ' chars', 'utf8');
console.log('css ok', css.length);
