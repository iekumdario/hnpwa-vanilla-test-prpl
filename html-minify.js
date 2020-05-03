const fs = require('fs');
const version = require('./package.json').version;
const FILE_PATHS = ['./public/index.html', './public/200.html'];
const DESTINATION_PATHS = ['./public/index.html', './public/200.html'];
const minify = require('html-minifier').minify;

for (let index = 0; index < FILE_PATHS.length; index++) {
    console.log('[html-minify] reading file');
    let fileData = fs.readFileSync(FILE_PATHS[index], 'utf8');
    let size = fileData.length;

    console.log('[html-minify] minify');
    fileData = minify(fileData, {
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        preserveLineBreaks: false
    });

    fileData = fileData.replace('{{ version }}', version);

    console.log('[html-minify] write file', DESTINATION_PATHS[index], ((1 - fileData.length / size) * 100).toFixed(2));
    fs.writeFileSync(DESTINATION_PATHS[index], fileData, 'utf8');
}

