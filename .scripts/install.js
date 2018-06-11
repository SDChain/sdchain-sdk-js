'use strict';

const script = () => {
  const {PackageManagerFactory, shell} = require('scripts-helper');
  const manager = PackageManagerFactory.instance.detectManager();
  const packages = ['typescript'];

  if (false === manager.requireAllGlobalPackages(packages)) {
    process.exit(1);
  }

  if (false === shell('tsc')) {
    process.exit(1);
  }
};

script();
