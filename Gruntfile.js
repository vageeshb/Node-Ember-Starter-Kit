'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({

    // JS Linting
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      app: {
        src: ['app/**/*.js']
      },
      server: {
        src: ['server/**/*.js']
      },
      gruntFile: {
        src: ['Gruntfile.js']
      }
    },

    // Watching for changes
    watch: {
      options: {
        livereload: true,
      },
      express: {
        files:  [ 'server/**/*.js' ],
        tasks:  [ 'jshint', 'bowerInstall', 'injector', 'express:dev' ],
      },
      scripts: {
        files: ['Gruntfile.js', 'app/**/*.js' ],
        tasks: ['jshint', 'bowerInstall', 'injector'],
      },
      templates: {
        files: ['app/templates/**/*.hbs'],
        tasks: ['bowerInstall', 'injector'],
      }
    },

    // Installing bower dependencies
    bowerInstall: {
      target:{
        src: 'server/views/index.html',
        ignorePath: '../public'
      }
    },

    // Injecting Ember scripts and Handlebar templates
    injector: {
      options: {
        ignorePath: "app/"
      },
      ember_files: {
        files: {
          'server/views/index.html': ['app/**/*.js'],
        }
      },
      hbs_templates: {
        options: {
          starttag: '<!-- injector:hbs -->',
          endtag: '<!-- endinjector -->',
          transform: function (file) {
            var filePath = path.join(__dirname, 'app' + file);
            var fn = file.split('/');
            fn = fn[fn.length-1];
            var content = "<!-- " + fn + " -->\n";
            content += fs.readFileSync(filePath, 'utf8');
            content += "\n<!-- end template -->";
            return content;
          },
        },
        files: {
          'server/views/index.html': ['app/templates/**/*.hbs'],
        }
      },
    },

    // Launching express server
    express: {
      dev: {
        options: {
          script: 'server/app.js'          
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-install');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-injector');

  grunt.registerTask('default', ['jshint', 'bowerInstall', 'injector', 'express', 'watch']);
};