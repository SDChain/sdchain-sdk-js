'use strict';

const script = () => {
  const {PackageManager, Shell} = require('@agrozyme/scripts-helper');
  const manager = PackageManager.detect();
  const packages = ['ts-node', 'jasmine'];

  if (false === manager.requireAllGlobalPackages(packages)) {
    process.exit(1);
  }

  const environment = {'NODE_OPTIONS': `--require ${manager.globalModulePath}/ts-node/register`};

  if (false === Shell.run('jasmine ./.test/**/*.test.ts', environment)) {
    process.exit(1);
  }

};

script();


