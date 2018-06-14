'use strict';

const script = () => {
  const {PackageManager, Shell} = require('@agrozyme/scripts-helper');
  const manager = PackageManager.detect();
  const packages = ['typescript'];

  if (false === manager.requireAllGlobalPackages(packages)) {
    process.exit(1);
  }

  if (false === Shell.run('tsc')) {
    process.exit(1);
  }
};

script();
