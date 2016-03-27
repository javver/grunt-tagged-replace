# grunt-tagged-replace

A grunt plugin that replaces pieces of your source using comment tags to identify the location.

It takes code like:

```javascript
let server = /*server*/ DEVSERVER /*/server*/
```

And allows you to configure a target like:

```javascript
grunt.initConfig({
  taggedReplace: {
    dev: {
      tags: [
        {
          server: 'DEVSERVER'
        }
      ]
    },
    prod: {
    tags: [
      {
        server: 'PRODSERVER'
      }
    ]
    }
  }
})

grunt.registerTask('buildprod', ['taggedReplace:prod'])
grunt.registerTask('builddev', ['taggedReplace:dev'])
```

Then just run: `grunt buildprod`
