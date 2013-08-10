'use strict';

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var fruitConfig = {
    src: 'src',
    mockup: '.'
  };

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    fruit: fruitConfig,
    watch: {
      stylus: {
        files: ['<%= fruit.src %>/style/{,*/}*.styl'],
        tasks: ['stylus:development'],
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
          '<%= fruit.mockup %>/{,*/}*.html',
          '<%= fruit.mockup %>/{,*/}*.css',
          '<%= fruit.mockup %>/{,*/}*.js',
          '<%= fruit.mockup %>/{,*/}*.{png,jpg,jpeg,gif}'
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
          '<%= fruit.mockup %>/css/style.css': '<%= fruit.src %>/style/*.build.styl' // compile and concat into single file
        }
      },
      production: {
        options: {
          urlfunc: 'embedurl'
        },
        files: {
          '<%= fruit.mockup %>/css/style.css': '<%= fruit.src %>/style/*.build.styl'
        }
      }
    }
  });

  grunt.registerTask('build', [
    'stylus:production'
  ]);

  // build alias
  grunt.registerTask('b', ['build']);

  grunt.registerTask('server', [
    'stylus:development',
    'watch'
  ]);

  grunt.registerTask('default', [
    'server'
  ]);

};
