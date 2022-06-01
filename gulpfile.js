// Imports
const { src, dest, series, done } = require('gulp');
const del = require('del');
const { error, info, warn } = require('fancy-log');
const zip = require('gulp-zip');
const { generate } = require('build-number-generator');
const { exec } = require('child_process');
const jeditor = require('gulp-json-editor');


// Variables
const plugin_file = './src/plugin.json';
const plugin_json = require(plugin_file);
const plugin_version = plugin_json.info.version;
const plugin_id = plugin_json.id;
const package_file = './package.json'
const package_json = require(package_file);
const built_version = _getBuildNumber();
const built_plugin_json = './dist/plugin.json';
const package_version = package_json.version;
const zip_matches = [ 'package.json', '!key.txt', '!blocknote.txt', '**/*', '!src/**', '!node_modules/**', '!.git/**', '!spec/**', '!spec/__snapshots__/**', '!./*.sh', '!coverage/**', '!config/**', '!built', '!.flowcharting_env', '!/site',];
const zip_filename = `${plugin_id}-${built_version}-SNAPSHOT.zip`;
var zip_path = process.env.FLOWCHARTING_BUILT_PATH;
const require_env = ['FLOWCHARTING_PLUGIN_HOME', 'FLOWCHARTING_BUILT_PATH',];

//##### Private functions
function _is_Set(envName) {
  // console.log("envName",envName);
  // console.log("process.env[envName]",process.env[envName]);
  var env = process.env[envName];
  if (env === null || env === undefined || env.length === 0) {
    return false;
  }
  return true;
}

function _getBuildNumber(version = plugin_version) {
  return generate(version);
}

//##### Tasks
function clean() {
  return del(['./dist/**/*', './built/*']);
}

function buildPackage() {
  info(`File name : '${zip_filename}'`);
  info(`Path destination : '${zip_path}'`);
  if (!_is_Set("FLOWCHARTING_BUILT_PATH")) {
    warn("variable 'FLOWCHARTING_BUILT_PATH' not set, current path is set to destination");
    zip_path = '.';
  }
  return src(zip_matches).pipe(zip(zip_filename)).pipe(dest(zip_path));
}

function check_vars() {
  return Promise.all(
    require_env.map(
      async (envName) => {
        if (!_is_Set(envName)) {
          error(`variable ${envName} not set`);
        }
        info(`${envName} : ${process.env[envName]}`);
        return process.env[envName];
      }
    )
  )
}

async function check_version() {
  if (plugin_version === package_version) {
    info(`${plugin_file}.version : ${plugin_version}`)
    return plugin_version;
  }
  error(`properties version in ${plugin_file} not the same in ${package_file}`);
  return false;
}

// function check() {
//   return series([check_vars, check_version]);
// }

function update_built_version() {
  return src(built_plugin_json).pipe(jeditor((json) => {
    json.info.version = built_version;
    return json;
  }
  )).pipe(dest('./dist'))
}

function build() {
  info(`Building '${plugin_id}' version '${built_version}'`);
  return exec('yarn build', (error, stdout, stderr) => {
    info(stdout)
  });
}

function sign() {
  return exec('yarn sign')
}


module.exports = {
  default: series([check_version, check_vars, clean, build, update_built_version, sign, buildPackage]),
  clean: clean,
  build: build,
  package: buildPackage,
  version: update_built_version,
}

