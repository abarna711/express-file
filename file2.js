const fs = require('fs');

const content = 'Some content!';

fs.writeFile('file2.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
  console.log('successfully write')
});
