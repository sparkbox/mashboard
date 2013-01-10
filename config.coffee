fs   = require 'fs'
path = require 'path'

# See docs at http://brunch.readthedocs.org/en/latest/config.html.

exports.config =

  files:
    javascripts:
      defaultExtension: 'js'
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/

      order:
        before: [
          'vendor/scripts/console-helper.js'
          'vendor/scripts/jquery-1.8.3.js'
          'vendor/scripts/handlebars-1.0.rc.1.js'
          'vendor/scripts/ember-latest.js'
          'vendor/scripts/ember-data-latest.js'
          'vendor/scripts/moment.js'
          'vendor/scripts/store.js'
        ]

    stylesheets:
      defaultExtension: 'css'
      joinTo: 'stylesheets/app.css'
      order:
        before: [
          'vendor/styles/bootstrap.css'
          'vendor/styles/bootstrap-responsive.css'
        ]

    templates:
      precompile: true
      defaultExtension: 'hbs'
      stripRootFolder: true
      joinTo: 'javascripts/app.js' : /^app/

  modules:
    wrapper: (path, data) ->
      """
      window.require.define({#{path}: function(exports, require, module) {
        #{data}
      }});
      window.moduleNames.push(#{path});
      \n\n
      """

  server:
    port: 3333
    base: '/'
    run: no
