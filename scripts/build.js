const { render } = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const { outputFile } = require('fs-extra');
const sassImporter = require('node-sass-import');

const SRC = './kraft.scss';
const DEST = './dist/kraft.min.css';

render({ file: SRC, importer: sassImporter }, (err, result) => {
  if (err) throw err;

  postcss([ autoprefixer, csso({ restructure: false }) ])
    .process(result.css, { from: SRC, to: DEST })
    .then(result => outputFile(DEST, result))
    .then(() => console.log(`Successfully compiled to ${DEST}`))
    .catch(err => console.error(err));
});
