const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');
const getUsedTemplates = require('./get-used-templates');

const dryRun = process.argv.includes('--dry');
const logFile = path.resolve(__dirname, 'prune.log');
const themeDirectory = path.resolve(__dirname, '../src');
let count = 0;

function log(line) {
  fs.writeFileSync(logFile, `${line}\n`, { flag: 'a' });
}

function getSuffix(filename) {
  return filename.split('/').pop().replace(/\.(liquid|json)$/, '').replace(/^(page|article)\./, '');
}

function processUnused(unused) {
  for (const filename of unused) {
    log(`${++count}: ${filename.replace(/^.*?\/src\//, '')}`);
    if (!dryRun) {
      fs.unlinkSync(filename);
    }
  }
}

(async () => {
  const date = (new Date().toLocaleString('en-US'));
  const staticLength = 25;
  log(new Array(date.length + staticLength).fill('=').join(''));
  log('=== Initiating prune ' + date + ' ===');
  log(new Array(date.length + staticLength).fill('=').join(''));

  const { articleTemplates, pageTemplates } = await getUsedTemplates();
  log('=== Active page templates ===\n- ' + pageTemplates.join('\n- '));
  log('=== Active article templates ===\n- ' + pageTemplates.join('\n- '));
  const dryRunMessage = dryRun ? '(Would Be) ' : '';
  log('=== ' + dryRunMessage + 'Pruned files ===');

  /**
   * Pagefly Pages
   */
  let entries = await fg([themeDirectory + '/templates/page.(pf|pagefly)*']);
  let unused = entries.filter(item => !pageTemplates.includes(getSuffix(item)));

  for (const entry of [...unused]) {
    const name = getSuffix(entry).replace('pf', 'pagefly').replace('-', '.');
    const stylesheets = await fg([themeDirectory + '/assets/' + name + '\.(css|scss)(\.liquid)?']);
    stylesheets.forEach(sheet => unused.push(sheet));
  }

  processUnused(unused);

  /**
   * Regular pages
   */
  entries = await fg([themeDirectory + '/templates/page.*.liquid']);
  unused = entries.filter(item => !pageTemplates.includes(getSuffix(item)));
  processUnused(unused);

  /**
   * Pagefly Articles
   */
  entries = await fg([themeDirectory + '/templates/article.(pf|pagefly)*']);
  unused = entries.filter(item => !articleTemplates.includes(getSuffix(item)));

  for (const entry of [...unused]) {
    const name = getSuffix(entry).replace('pf', 'pagefly').replace('-', '.');
    const stylesheets = await fg([themeDirectory + '/assets/' + name + '\.(css|scss)(\.liquid)?']);
    stylesheets.forEach(sheet => unused.push(sheet));
  }

  processUnused(unused);

  /**
   * Regular Articles
   */
  entries = await fg([themeDirectory + '/templates/article.*.liquid']);
  unused = entries.filter(item => !articleTemplates.includes(getSuffix(item)));

  processUnused(unused);

   /**
    * Sections
    */
  let used = [];
  unused = [];
  
  const allSections = await fg([themeDirectory + '/sections/pf-*.liquid']);
  entries = await fg([themeDirectory + '/templates/(page|article).pf*.json']);

  for (const entry of entries) {
    const { sections } = JSON.parse(fs.readFileSync(entry));
    used = used.concat(Object.keys(sections));
  }

  entries = await fg([themeDirectory + '/templates/(page|article).pf*.liquid']);

  for (const entry of entries) {
    const liquid = fs.readFileSync(entry, 'utf-8');
    const [matches] = [...liquid.matchAll(/section ['"](pf-.*?)['"]/g)];
    used.push(matches[1]);
  }

  unused = allSections.filter(filename => {
    const suffix = getSuffix(filename);
    return !used.includes(suffix);
  });

  processUnused(unused);

  log('\n');

  process.exit(0);

})().catch(console.error);