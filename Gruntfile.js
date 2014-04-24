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
      scripts: {
        src: ['Gruntfile.js', 'app.js', 'app/**/*.js']
      }
    },

    // Watching for changes
    watch: {
      options: {
        livereload: true,
      },
      express: {
        files:  [ 'app.js' ],
        tasks:  [ 'jshint', 'bowerInstall', 'injector', 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      scripts: {
        files: ['Gruntfile.js', 'app/**/*.js' ],
        tasks: ['jshint', 'bowerInstall', 'injector'],
      },
    },

    // Installing bower dependencies
    bowerInstall: {
      target:{
        src: 'views/index.html',
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
          'views/index.html': ['app/**/*.js'],
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
          'views/index.html': ['app/templates/**/*.hbs'],
        }
      },
    },

    // Launching express server
    express: {
      dev: {
        options: {
          script: 'bin/www'          
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