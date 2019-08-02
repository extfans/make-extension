const fs = require('fs-extra');

const resolvePath = require('./resolvePath');
const resolveBrowserPath = require('./resolveBrowserPath');

const packageInfo = require(
  resolvePath('package.json')
);

module.exports = function genManifestTemplate() {
  const baseManifest = fs.readJsonSync(
    resolvePath('browser/base/manifest.json')
  );

  const browserBaseManifest = fs.readJsonSync(
    resolveBrowserPath('manifest/base.json')
  );

  let browserManifestPath;
  switch (process.env.NODE_ENV) {
    case 'development':
      browserManifestPath = 'manifest/dev.json';
      break;
    case 'production':
      browserManifestPath = 'manifest/prod.json';
      break;
  }

  const browserEnvManifest = fs.readJsonSync(
    resolveBrowserPath(browserManifestPath)
  );

  const manifest = Object.assign(
    {},
    baseManifest,
    browserBaseManifest,
    browserEnvManifest
  );

  manifest.version = packageInfo.version;

  return manifest;
};