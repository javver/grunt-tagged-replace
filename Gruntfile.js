/*
 * grunt-tagged-replace
 * https://github.com/javver/grunt-tagged-replace
 *
 * Copyright (c) 2016 Javier Cardona
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {

  });

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    taggedReplace: {
      test: {
        options: {
          values: {
            tag: 'replace value'
          }
        },
        expand: true,
        cwd: 'test/fixtures/',
        src: '*',
        dest: '.tmp/'
      },
      emptyValues: {
        expand: true,
        cwd: 'test/fixtures/',
        src: ['*', 'adsdfgl'],
        dest: '.tmp/',
        nonull: true
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'tagged_replace', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
