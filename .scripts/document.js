'use strict';

const script = () => {
  const {PackageManager, Shell} = require('@agrozyme/scripts-helper');
  const manager = PackageManager.detect();
  const packages = ['typescript', 'typedoc'];

  if (false === manager.requireAllGlobalPackages(packages)) {
    process.exit(1);
  }

  require('./model');

  if (false === Shell.run('typedoc --out document --readme README.md')) {
    process.exit(1);
  }
};

script();
