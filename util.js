const fs = require('fs');
const md5 = require('md5');

module.exports = {
  copyAsset({ path, filename, destination }) {
    fs.createReadStream(`${path}/${filename}`)
      .pipe(fs.createWriteStream(`${destination}/${filename}`));

    console.log(`Copied ${filename} to ${destination}`);
  },

  hashFile(path) {
    return md5(fs.readFileSync(path));
  },

  getFileHashes(paths) {
    const hashes = {};

    paths.forEach((path) => {
      const relativePath = path.replace(/^\.\//, '');
      fs.stat(path, (err) => {
        if (err === null) {
          const dir = fs.readdirSync(path);
          hashes[relativePath] = {};
          dir.forEach((filename) => {
            hashes[relativePath][filename] = md5(fs.readFileSync(`${path}/${filename}`));
          });
        }
      });
    });

    return hashes;
  },
};
