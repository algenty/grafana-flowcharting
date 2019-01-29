module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');

  var grafana_plugin_path = 'D:/Dev/grafana-5.4.3/data/plugins/agenty-grafana-flowcharting';
  grunt.initConfig({

    clean: {
      options: { force: true },
      stuff : ['dist', grafana_plugin_path]
    },

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.js', '!**/*.scss', '!img/**/*', '.*'],
        dest: 'dist'
      },
      globals_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/globals.js'],
        dest: 'dist'
      },
    // version node_modules/mxgraph
    //   libs_to_dist: {
		//     cwd: 'node_modules',
    //     expand: true,
		//     src: ['mxgraph/javascript/src/**/*','mxgraph/javascript/dist/**/*'],
		//     dest: 'dist/libs'
		// },
      libs_to_dist: {
        cwd: 'node_modules',
        expand: true,
        src: ['mxgraph-js/dist/mxgraph-js.js'],
        dest: 'dist/libs'
      },
      readme: {
        expand: true,
        src: ['README.md'],
        dest: 'dist',
      },
      js_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*.js'],
        dest: 'dist'
      },
      grafana: {
        cwd: './',
        expand: true,
        src: ['**/*', '!**/bower_components/**', '!**/node_modules/**', '!gitignore', '!others', '!.git', "dist/.angular-cli.json"],
        dest: grafana_plugin_path
      },
      sass: {
        dist: {
          options: {
            style: "expanded",
          },
          files: [
          {
            expand: true,
            cwd: "src/css/",
            src: ["*.scss"],
            dest: "dist/css/",
            ext: ".css",
          },
        ],
      },
    },
    img_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['img/**/*'],
        dest: 'dist/'
      },
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*', 'README.md'],
        tasks: ['default'],
        options: {spawn: false}
      },
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015'],
        plugins: ['transform-es2015-modules-systemjs', 'transform-es2015-for-of'],
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['*.js', '!**/globals.js' ],
          dest: 'dist',
          ext: '.js'
        }]
      },
    },

  });

  grunt.registerTask('default', ['clean', 'copy:src_to_dist', 'copy:sass', 'copy:readme', 'copy:globals_to_dist', 'copy:libs_to_dist', 'copy:img_to_dist', 'babel']);
};
