'use strict';

const script = () => {
  const {generateTSFiles} = require('swagger-ts-generator');
  const {emptyDirSync} = require('fs-extra');

  const source = __dirname + '/../source';
  const model = source + '/Model';
  const file = source + '/swagger20-with-extensions.json';
  emptyDirSync(model);
  generateTSFiles(file, {modelFolder: model, enumTSFile: model + '/enums.ts', generateClasses: false});
};

script();
