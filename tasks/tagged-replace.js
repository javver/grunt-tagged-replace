/*
 * grunt-tagged-replace
 * https://github.com/javver/grunt-tagged-replace
 *
 * Copyright (c) 2016 Javier Cardona
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var util = require('util');

  var chalk = require('chalk');
  var taggedReplace = require('tagged-replace');

  var desc = 'Replace pieces of your source using comment ' +
    'tags to identify the location.';
  grunt.registerMultiTask('taggedReplace', desc, function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      startPrefix: '/*',
      startSuffix: '*/',
      endPrefix: '/*/',
      endSuffix: '*/',
      space: true,
      encoding: grunt.file.defaultEncoding,
      values: {}
    });

    var replaceOptions = {
      startPrefix: options.startPrefix,
      startSuffix: options.startSuffix,
      endPrefix: options.endPrefix,
      endSuffix: options.endSuffix,
      space: options.space,
    };

    var noValues = Object.keys(options.values).length === 0;
    if (noValues) {
      grunt.log.warn('Values dictionary is empty');
    }

    grunt.verbose.writeln('Replacing with values: ' +
      JSON.stringify(options.values));

    // Iterate over all specified file groups.
    this.files.forEach(function(file) {
      var replaced = file.src
        .filter(function(filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          console.log(filepath);
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath +
              '" not found.');
            return false;
          }
          return true;
        })
        .map(function(path) {
          return grunt.file.read(path, {
            encoding: options.encoding
          });
        })
        .map(function(content) {
          if (!util.isString(content)) {
            grunt.warn('Encoding "' + options.encoding +
              '" for file did not produce string.');
            return '';
          }
          return taggedReplace(content, options.values,
            replaceOptions);
        })
        .join('');

      grunt.file.write(file.dest, replaced, {
        encoding: options.encoding
      });

      grunt.verbose.writeln('File "' + chalk.cyan(file.dest) +
        '" created.');
    });

  });

};
