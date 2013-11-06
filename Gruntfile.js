'use strict';

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      src: 'src'
    , mockup: '.'
    },
    watch: {
      stylus: {
        files: ['<%= config.src %>/css/{,*/}*.styl'],
        tasks: ['stylus:development'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      template: {
        files: ['<%= config.src %>/html/{,*/}*.hbs', '<%= config.src %>/html/data.json'],
        tasks: ['template'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      development: {
        options: {
          nospawn: true,
          livereload: true
        },
        files: [
          '<%= config.mockup %>/{,*/}*.html',
          '<%= config.mockup %>/{,*/}*.css',
          '<%= config.mockup %>/{,*/}*.js',
          '<%= config.mockup %>/{,*/}*.{png,jpg,jpeg,gif}'
        ],
        tasks: []
      }
    },
    stylus: {
      development: {
        options: {
          urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
          compress: false,
          linenos: true
        },
        files: {
          '<%= config.mockup %>/css/style.css': '<%= config.src %>/css/*.build.styl' // compile and concat into single file
        }
      },
      production: {
        options: {
          urlfunc: 'embedurl'
        },
        files: {
          '<%= config.mockup %>/css/style.css': '<%= config.src %>/css/*.build.styl'
        }
      }
    },
    clean: {
      all: {
        src: ['<%= config.mockup %>/*.html']
      }
    },
    template: {
      all: {
        engine: 'handlebars',
        cwd: '<%= config.src %>/html/',
        partials: ['<%= config.src %>/html/partials/*.hbs'],
        data: '<%= config.src %>/html/data.json',
        options: {
        },
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: '<%= config.src %>/html/',      // Src matches are relative to this path.
            src: '*.hbs', // Actual pattern(s) to match.
            dest: '<%= config.mockup %>/',   // Destination path prefix.
            ext: '.html'  // Dest filepaths will have this extension.
          }
        ]
      }
    }
  });

  grunt.registerTask('build', [
    'stylus:production',
    'clean',
    'template'
  ]);

  // build alias
  grunt.registerTask('b', ['build']);

  grunt.registerTask('server', [
    'stylus:development',
    'clean',
    'template',
    'watch'
  ]);

  grunt.registerTask('default', [
    'server'
  ]);

};
