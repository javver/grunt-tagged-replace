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
            src: 'multfile-*.txt',
            dest: 'tmp/'
         },
         'repeating-tags': {
            options: {
               values: {
                  tag: 'replaced content'
               },
            },
            expand: true,
            cwd: 'test/fixtures',
            src: 'repeating-tags.txt',
            dest: 'tmp/'
         },
         'two-tags': {
            options: {
               values: {
                  tag1: 'replaced content 1',
                  tag2: 'replaced content 2'
               },
            },
            expand: true,
            cwd: 'test/fixtures',
            src: 'two-tags.txt',
            dest: 'tmp/'
         },
         'unexistent': {
            expand: true,
            cwd: 'test/fixtures',
            src: 'doesnt-exist.txt',
            dest: 'tmp/',
            nonull: true
         },
         'bad-encoding': {
            options: {
               values: {
               },
               encoding: null
            },
            expand: true,
            cwd: 'test/fixtures',
            src: 'bad-encoding.txt',
            dest: 'tmp/'
         },
      },

      // Unit tests.
      mochaTest: {
         src: ['./test/*.js']
      },

   });

   // Actually load this plugin's task(s).
   grunt.loadTasks('tasks');

   // Whenever the "test" task is run, first clean the "tmp" dir, then run this
   // plugin's task(s), then test the result.
   grunt.registerTask('test', ['clean', 'taggedReplace', 'mochaTest']);

   // By default, lint and run all tests.
   grunt.registerTask('default', ['jshint', 'test']);

};
