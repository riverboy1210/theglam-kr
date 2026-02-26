const fs = require('fs');
const ap = s => fs.appendFileSync('index.html', s + '\n', 'utf8');
ap('.modal-overlay{position:fixed;inset:0;background:rgba(42,35,32,.6);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity .25s ease}');
console.log('done', fs.statSync('index.html').size);