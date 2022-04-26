// Imports
var gulp = require('gulp');
var clean = require('gulp-clean');
var zip = require('gulp-zip');

// Variables
const pluginJson = require('./src/plugin.json');
const version = pluginJson.info.version;
var zip_matches = ['!key.txt', '**/*', '!src/**', '!node_modules/**', '!backups/**', '!bower_components/**', '!others/**', '!.git/**', '!archives/**', '!public/**', '!backup/**', '!spec/**', '!spec/__snapshots__/**','!externals/**'];
var zip_filename = process.env.FLOWCHARTING_BUILT_PATH + "/agenty-flowcharting-panel-" + version + "-SNAPSHOT.zip"

gulp.task('clean', () => {
  return gulp.src('./dist/').pipe(clean())
});

gulp.task('package', () => {
  return gulp.src(zip_matches).pipe(zip(zip_filename))  
});