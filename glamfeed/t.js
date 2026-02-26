const fs = require('fs');
const ap = s => fs.appendFileSync('index.html', s + '\n', 'utf8');
ap('.test{color:rgba(255,255,255,.2)}');
console.log('ok');