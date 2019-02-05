var path = require("path"),
    fs = require("fs"),
    mxClientContent,
    deps;


module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  const sass = require('node-sass');

  mxClientContent = fs.readFileSync(
    path.join(process.cwd(), "./javascript/src/js/mxClient.js"),
    "utf8"
  );
  deps = mxClientContent.match(/mxClient\.include\([^"']+["'](.*?)["']/gi).map(function(str) {
    return "." + str.match(/mxClient\.include\([^"']+["'](.*?)["']/)[1];
  });
  deps = ["./js/mxClient.js"].concat(deps.slice(0));

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
      externals_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['externals/**/*'],
        dest: 'dist'
      },
      libs_to_dist: {
        cwd: 'node_modules',
        expand: true,
        src: ['mxgraph-js/dist/mxgraph-js.js', 'mxgraph/javascript/src/**/*'],
        dest: 'dist/libs'
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
        implementation: sass,
      },
      dist: {
        files: {
          'dist/css/diagram.css': 'src/css/diagram.scss'
        }
      }
    },

    babel: {
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['*.js'],
          dest: 'dist',
          ext: '.js'
        }]
      },
    },

  });

  grunt.registerTask('default', ['clean', 'copy:src_to_dist', 'sass', 'copy:readme', 'copy:img_to_dist', 'babel', 'copy:libs_to_dist', ]);
};
