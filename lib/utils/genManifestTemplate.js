const jsonfile = require('jsonfile');

const resolvePath = require('./resolvePath');
const resolveBrowserPath = require('./resolveBrowserPath');

const packageInfo = require(
  resolvePath('package.json')
);

module.exports = function genManifestTemplate() {
  const baseManifest = jsonfile.readFileSync(
    resolvePath('browser/base/manifest.json')
  );

  const browserBaseManifest = jsonfile.readFileSync(
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

  const browserEnvManifest = jsonfile.readFileSync(
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