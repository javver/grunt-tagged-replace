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
         'one-tag': {
            options: {
               values: {
                  tag: 'replace value'
               }
            },
            expand: true,
            cwd: 'test/fixtures',
            src: 'one-tag.txt',
            dest: 'tmp/'
         },
         'multifile': {
            options: {
               values: {
                  firstTag: 'first tag',
                  secondTag: 'second tag',
               }
            },
            expand: true,
            cwd: 'test/fixtures',
            src: 'multifile*.js',
            dest: 'tmp/'
         },
      },

      // Unit tests.
      mocha: {
         src: ['./test/*.js']
      },

   });

   // Actually load this plugin's task(s).
   grunt.loadTasks('tasks');

   // Whenever the "test" task is run, first clean the "tmp" dir, then run this
   // plugin's task(s), then test the result.
   grunt.registerTask('test', ['clean', 'taggedReplace', 'mocha']);

   // By default, lint and run all tests.
   grunt.registerTask('default', ['jshint', 'test']);

};
