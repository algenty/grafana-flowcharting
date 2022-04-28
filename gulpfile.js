// Imports
var {src, dest, series} = require('gulp');
var clean = require('gulp-clean');
var zip = require('gulp-zip');

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
  var env = process.env["envName"]
  if(env === null || env === undefined || env.length === 0) {
    return false 
  }
}

// Tasks
function clean() {
  return src('./dist/').pipe(clean())
}

function package() {
  console.log("Filename : " + zip_filename)
  console.log("Destination : " + zip_path)
  if(! _is_Set("FLOWCHARTING_BUILT_PATH") ) {
    throw new Error("variable FLOWCHARTING_BUILT_PATH not set")
  }
  return src(zip_matches).pipe(zip(zip_filename)).pipe(dest(zip_path))
}

function checkVars() {
  require_env.map((envName) => {
    if (! _is_Set(envName)) {
      let message = `variable ${envName} not set`;
      throw new Error(message)
    }
  });
}

function checkVersion() {
  if( plugin_json === package_version ) {
    let message = `properties version in ${plugin_file} doen't equal version in ${package_file}`;
    console.log(message)
    throw new Error(message)
    return false;
  }
  done();
}

module.exports = {
  clean,
  package,
  checkVars,
  checkVersion,
}