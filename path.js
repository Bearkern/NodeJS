var path = require('path');

// fetch direction
console.log(path.dirname('xx/yy/zz.js'));

// concatenate path
console.log(path.join(__dirname, '/xx'));

// fetch filename
console.log(path.basename('xx/yy/zz.js'));

// fetch extention name
console.log(path.extname('xx/yy/zz.js'));

// parse the path
console.log(path.parse('xx/yy/zz.js'));
