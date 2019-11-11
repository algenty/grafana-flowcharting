const path = require("path");
const sass = require('node-sass');
// const plugin = require('./src/plugin.js');
const version = "0.6.0";

module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.initConfig({

    clean: {
      before_init: {
        src: ['externals/**/*'],
      },
      after_init: {
        src: ['externals/**/.git'],
      },
    },

    copy: {
      // Copy Shapes from draw.io to src/lib
      shapes2src:  {
        cwd: 'externals/drawio/src/main/webapp/shapes',
        expand: true,
        src: ['**/*.js'],
        dest: 'src/libs/shapes',
      },
      // Copy files not supported by toolkit to dist like css     
      src2dist: {
        cwd: 'src',
        expand: true,
        src: ['css/**/*'],
        dest: 'dist',
      },
      // Copy ressources to src/libs
      mxRes2src: {
        cwd: 'node_modules/mxgraph/javascript/src',
        expand: true,
        src: ['**/*', '!**/*.js'],
        dest: 'src/libs/mxgraph/javascript/dist',
      },
      // Copy editor maxgraph libs to src/libs
      mxEditor2src: {
        cwd: 'externals/mxgraph/javascript/examples/grapheditor/www',
        expand: true,
        src: ['**/*', '!**/*.js'],
        dest: 'dist/libs/mxgraph/javascript/dist',
      },
      stencils2src: {
        cwd: 'externals/drawio/src/main/webapp/stencils',
        expand: true,
        src: ['**/*', '!**/*.js'],
        dest: 'src/libs/mxgraph/javascript/dist/stencils',
      },
    },

    makeArchive: {
      main: {
        options: {
          archive: "archives/agenty-flowcharting-panel-" + version + "-SNAPSHOT.zip",
        },
        expand: true,
        cwd: '.',
        src: ['**/*', '!src/**', '!node_modules/**', '!bower_components/**', '!others/**', '!.git/**', '!archives/**', '!public/**', '!backup/**', '!spec/**', '!spec/__snapshots__/**','!externals/**'],
        dest: 'grafana-flowcharting',
      },
    },

    gitclone: {
      mxgraph: {
        options: {
          repository: 'https://github.com/jgraph/mxgraph',
          branch: 'master',
          depth: 1,
          tags: "v4.0.4",
          directory: 'externals/mxgraph',
          verbose: true,
        }
      },
      drawio: {
        options: {
            repository: 'https://github.com/jgraph/drawio',
            branch: 'master',
            depth: 1,
            tags : "v11.2.8",
            directory: 'externals/drawio',
            verbose: true,
        }
      }
    },

  });

  grunt.registerTask('default', ['clean:build', 'copy:src_to_dist', 'sass', 'copy:readme', 'copy:img_to_dist', 'babel', 'webpack', 'copy:res_to_dist', 'copy:mxgraph_to_dist', 'copy:stencils_to_dist']);
  grunt.registerTask('microbuild', ['copy:src_to_dist', 'sass', 'babel', 'webpack' ]);
  grunt.registerTask('dev', ['default', 'watch:rebuild_all']);
  grunt.registerTask('microdev', ['microbuild', 'watch:microbuild']);
  grunt.registerTask('archive', ['compress:main']);
  grunt.registerTask('init', ['clean:before_init','gitclone:mxgraph','gitclone:drawio','clean:after_init']);
};
