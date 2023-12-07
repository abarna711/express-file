const fs = require('fs');

fs.readFile('file1.js', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  console.log('successfully read');
});
