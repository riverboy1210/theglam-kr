const fs = require('fs');
const chunk = Buffer.from('PGhlYWRlciBjbGFzcz0naGVhZGVyJz48ZGl2IGNsYXNzPSdsb2dvLW1hcmsnPnRlc3Q8L2Rpdj48L2hlYWRlcj4=', 'base64').toString('utf8');
fs.appendFileSync('index.html', chunk + '\n', 'utf8');
console.log('ok', fs.statSync('index.html').size);