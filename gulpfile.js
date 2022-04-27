// Imports
var {src, dest} = require('gulp');
var clean = require('gulp-clean');
var zip = require('gulp-zip');

// Variables
const plugin_json = require('./src/plugin.json');
const plugin_version = plugin_json.info.version
const plugin_name = plugin_json.name
const package_json = require('./package.json');
const package_version = package_json.version;
const zip_matches = ['!key.txt', '**/*', '!src/**', '!node_modules/**', '!backups/**', '!others/**', '!.git/**', '!archives/**', '!public/**', '!backup/**', '!spec/**', '!spec/__snapshots__/**'];
const zip_filename = `${plugin_name}-${plugin_version}-SNAPSHOT.zip` 
const zip_path = process.env.FLOWCHARTING_BUILT_PATH
const require_var = ['FLOWCHARTING_PLUGIN_HOME', 'FLOWCHARTING_BUILT_PATH',]

function clean() {
  return src('./dist/').pipe(clean())
}

function package() {
  console.log("Filename : " + zip_filename)
  console.log("Destination : " + zip_path)
  if(zip_path === null || zip_path === undefined || zip_path.length === 0) {
    console.error("variable FLOWCHARTING_BUILT_PATH not set")
    return false
  }
  return src(zip_matches).pipe(zip(zip_filename)).pipe(dest(zip_path))
}

function check() {
  //TODO Check vars
  //TODO check version
  //TODO Drawio update
}

module.exports = {
  clean,
  package,
}