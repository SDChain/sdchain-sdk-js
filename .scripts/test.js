'use strict';

const script = () => {
  const {PackageManagerFactory, shell} = require('scripts-helper');
  const manager = PackageManagerFactory.instance.detectManager();
  const packages = ['ts-node', 'jasmine'];

  if (false === manager.requireAllGlobalPackages(packages)) {
    process.exit(1);
  }

  const environment = {'NODE_OPTIONS': `--require ${manager.globalModulePath}/ts-node/register`};

  if (false === shell('jasmine ./.test/**/*.test.ts', environment)) {
    process.exit(1);
  }

};

script();


