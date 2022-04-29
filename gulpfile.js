// Imports
const { src, dest, series, done } = require('gulp');
const del = require('del');
const zip = require('gulp-zip');
const utils = require('fancy-log');
const { exec } = require('child_process');

// Variables
const plugin_file = './src/plugin.json';
const plugin_json = require(plugin_file);
const plugin_version = plugin_json.info.version
const plugin_name = plugin_json.name
const package_file = './package.json'
const package_json = require(package_file);
const package_version = package_json.version;
const zip_matches = ['!key.txt', '**/*', '!src/**', '!node_modules/**', '!backups/**', '!others/**', '!.git/**', '!archives/**', '!public/**', '!backup/**', '!spec/**', '!spec/__snapshots__/**'];
const zip_filename = `${plugin_name}-${plugin_version}-SNAPSHOT.zip`
const zip_path = process.env.FLOWCHARTING_BUILT_PATH
const require_env = ['FLOWCHARTING_PLUGIN_HOME', 'FLOWCHARTING_BUILT_PATH',]

// Private functions
function _is_Set(envName) {
  // console.log("envName",envName);
  // console.log("process.env[envName]",process.env[envName]);
  var env = process.env[envName];
  if (env === null || env === undefined || env.length === 0) {
    return false;
  }
  return true;
}

// Tasks
function clean() {
  return del('./dist/**/*');
}

function package() {
  utils.info(`File name : '${zip_filename}'`);
  utils.info(`Path destination : '${zip_path}'`);
  if (!_is_Set("FLOWCHARTING_BUILT_PATH")) {
    utils.error("variable 'FLOWCHARTING_BUILT_PATH' not set")
  }
  return src(zip_matches).pipe(zip(zip_filename)).pipe(dest(zip_path));
}

function check_vars() {
  return Promise.all(
    require_env.map(
      async (envName) => {
        if (!_is_Set(envName)) {
          utils.error(`variable ${envName} not set`);
          reject();
        }
        utils.info(`${envName} : ${process.env[envName]}`);
        return process.env[envName];
      }
    )
  )
}

function build() {
  return exec('npx grafana-toolkit plugin:build')
}

async function check_version() {
  if (plugin_version === package_version) {
    utils.info(`${plugin_file}.version : ${plugin_version}`)
    return plugin_version;
  }
  utils.error(`properties version in ${plugin_file} not the same in ${package_file}`);
  reject();
}

module.exports = {
  clean,
  package,
  check : series([check_vars, check_version])
}
