'use strict';

var grunt = require('grunt');
var assert = require('assert');

describe('grunt-tagged-replace', function() {

   it('replaces one tag in one file', function() {
      var actual = grunt.file.read('tmp/one-tag.txt');
      var expected = grunt.file.read('test/expected/one-tag.txt');
      assert.equal(actual, expected);
   });

   it('replaces tags in multiple files', function() {
      var actual = grunt.file.read('tmp/multfile-1.txt');
      var expected = grunt.file.read('test/expected/multfile-1.txt');
      assert.equal(actual, expected);

      actual = grunt.file.read('tmp/multfile-2.txt');
      expected = grunt.file.read('test/expected/multfile-2.txt');
      assert.equal(actual, expected);
   });

   it('replaces repeated tags in one file', function() {
      var actual = grunt.file.read('tmp/repeating-tags.txt');
      var expected = grunt.file.read('test/expected/repeating-tags.txt');
      assert.equal(actual, expected);
   });

   it('ignores unexistent files', function () {
      assert(!grunt.file.exists('tmp/doesnt-exist.txt'));
   });

   it('warns on encodings not generating strings', function () {
      assert(!grunt.file.exists('tmp/bad-encoding.txt'));
   });

});
