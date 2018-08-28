const chokidar = require('chokidar');
require('log-timestamp');
const { copyAsset, getFileHashes, hashFile } = require('./util');

const log = console.log.bind(console);
const destination = './src/assets';
const widgetDir = './widgets';
const watched = ['css', 'js'];

const watcher = chokidar.watch(widgetDir, {
  awaitWriteFinish: true,
  ignoreInitial: true,
  ignored: /.*(\/\..+|node_modules).*/,
  persistent: true,
});

let hashes = {};

watcher.on('ready', () => {
  hashes = getFileHashes(watched.map(type => `${widgetDir}/dist/${type}`));

  log('Watching for changes in:');
  log(watched);
});

watcher.on('add', (fullPath) => {
  let path = fullPath.split('/');
  const filename = path.pop();
  path = path.join('/');

  const extension = filename.split('.').pop();

  if (['css', 'js', 'map'].includes(extension)) {
    const oldHash = hashes[path] ? hashes[path][filename] : null;
    const newHash = hashFile(fullPath);

    if (oldHash !== newHash) {
      hashes[path] = hashes[path] || {};
      hashes[path][filename] = newHash;
      copyAsset({ path, filename, destination });
    }
  }
});
