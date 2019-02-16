var path = require("path"),
  fs = require("fs");
const sass = require('node-sass');
const grafana = {
  cmd: "D:/Dev/grafana-5.4.3/bin/grafana-server.exe",
  homepath: "D:/Dev/grafana-5.4.3",
  pidfile: "D:/Dev/grafana-5.4.3/grafana.pid"
}

module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-external-daemon');
  grunt.loadNpmTasks('grunt-service');

  const sass = require('node-sass');
  grunt.initConfig({

    clean: {
      options: {
        force: true
      },
      stuff: ['dist']
    },

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.js', '!**/*.scss', '!img/**/*', '.*'],
        dest: 'dist'
      },
      libs_to_dist: {
        cwd: 'node_modules',
        expand: true,
        src: ['mxgraph/javascript/dist/**/*','!**/*.js'],
        dest: 'dist/libs'
      },
      res_to_dist: {
        cwd: 'node_modules/mxgraph/javascript/src',
        expand: true,
        src: ['**/*','!**/*.js'],
        dest: 'dist/libs/mxgraph/javascript/dist'
      },
      bower_to_dist : {
        cwd: 'bower_components/mxgraph/javascript/examples/grapheditor/www',
        expand: true,
        src: ['**/*','!**/*.js'],
        dest: 'dist/libs/mxgraph/javascript/dist'
      },

      readme: {
        expand: true,
        src: ['README.md'],
        dest: 'dist',
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
        options: {
          spawn: false
        }
      },
    },


    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      dist: {
        files: {
          'dist/css/flowchart.dark.css': 'src/css/flowchart.dark.scss',
          'dist/css/flowchart.light.css': 'src/css/flowchart.light.scss'
        }
      }
    },
    babel: {
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['*.js', "!mxgraph.js"],
          dest: 'dist',
          ext: '.js'
        }]
      },
    },

    webpack: {
      mxgraph: {
        entry: "./src/mxgraph.js",
        mode: "development",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components|externals)/,
              use: {
                loader: 'babel-loader',
              }
            }
          ]
        },
        output: {
          path: path.resolve(process.cwd(), "./dist"),
          filename: "mxgraph.js",
          library: "mxgraph",
          libraryTarget: "umd"
        }
      }
    },
  });

  grunt.registerTask('default', ['clean', 'copy:src_to_dist', 'sass', 'copy:readme', 'copy:img_to_dist', 'babel', 'webpack', 'copy:libs_to_dist', 'copy:res_to_dist', 'copy:bower_to_dist']);
  grunt.registerTask('dev', ['default', 'watch']);
};
