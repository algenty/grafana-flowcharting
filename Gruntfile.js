var path = require("path"),
  fs = require("fs");
const sass = require('node-sass');
module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-compress');

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
        src: ['**/*', '!**/*.js', '!**/*.scss', '!img/**/*', '.*', '!__mocks__'],
        dest: 'dist'
      },
      vkbeautify_to_dist : {
        cwd: 'node_modules',
        expand: true,
        src: ['vkbeautify/index.js'],
        dest: 'dist/libs'
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
          src: ['*.js', '!mxHandler.js', "!Graph.js", "!init.js", "!utils.js", "!backup/**/*", "!__mocks__"],
          dest: 'dist',
          ext: '.js'
        }]
      },
    },

    webpack: {
      mxgraph: {
        entry: "./src/mxHandler.js",
        mode: "development",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components|externals)/,
              use: {
                loader: 'babel-loader',
              }
            },
          ]
        },
        output: {
          path: path.resolve(process.cwd(), "./dist"),
          filename: "mxHandler.js",
          library: "mxHandler",
          libraryTarget: "umd"
        },
        externals: {
          "jquery": "jquery",
          "lodash": "lodash",
        }
      },
      mxgraph: {
        entry: "./src/graph_class.js",
        mode: "development",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components|externals)/,
              use: {
                loader: 'babel-loader',
              }
            },
          ]
        },
        output: {
          path: path.resolve(process.cwd(), "./dist"),
          filename: "graph_class.js",
          library: "graph_class",
          libraryTarget: "umd"
        },
        externals: {
          "jquery": "jquery",
          "lodash": "lodash",
        }
      },
      utils: {
        entry: "./src/utils.js",
        mode: "development",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components|externals)/,
              use: {
                loader: 'babel-loader',
              }
            },
          ]
        },
        output: {
          path: path.resolve(process.cwd(), "./dist"),
          filename: "utils.js",
          library: "utils",
          libraryTarget: "umd"
        },
        externals: {
          "jquery": "jquery",
          "lodash": "lodash",
        }
      }
    },

    compress: {
      main: {
        options: {
          archive: 'archives/agenty-flowcharting-panel.zip'
        },
        expand: true,
        cwd: '.',
        src: ['**/*', '!node_modules/**', '!bower_components/**','!others/**', '!.git/**','!archives/**' ],
        dest: 'grafana-flowcharting'
      }
    }
  });

  grunt.registerTask('default', ['clean', 'copy:src_to_dist', 'sass', 'copy:readme', 'copy:img_to_dist', 'babel', 'webpack', 'copy:res_to_dist', 'copy:bower_to_dist', 'copy:vkbeautify_to_dist']);
  grunt.registerTask('dev', ['default', 'watch']);
  grunt.registerTask('archive', ['default', 'compress:main']);

};
