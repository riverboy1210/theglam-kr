const fs = require('fs');
const ap = s => fs.appendFileSync('index.html', s + '\n', 'utf8');
ap('.gallery-nav{background:rgba(255,255,255,.2)}');
ap('.modal-close{background:rgba(42,35,32,.08)}');
console.log('ok', fs.statSync('index.html').size);