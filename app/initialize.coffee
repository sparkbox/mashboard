# Public: Initialize the application. This is the only file that is required
# explicitly in index.html.

# Defining App globally before the rest of the requires ensures we can use it
# in those files explicitly requiring it.
window.App = Ember.Application.create()

# The router doesn't live in a folder, so we require it explicitly.
require 'router'

# The order in which each module should be required.
folderOrder = 'models serializers adapters data helpers templates controllers views'.w()
# Programatically require the modules in each sub-folder so we don't have to do
# it explicitly. This sort of defeats the purpose of AMD, but I don't care.
folderOrder.forEach (folder) ->
  # Go through the prefixes in order and rquire them
  window.moduleNames.filter((moduleName) ->
    new RegExp("^#{folder}").test(moduleName)
  ).forEach((matchingModule) -> require(matchingModule))

App.Store = DS.Store.extend
  revision: 11
  adapter: App.CodeMashAdapter.create
    namespace: 'mashboard/data'

if store.enabled
  App.set('localStorageEnabled', true)
  App.set('savedSessions', App.SavedSessions.create())
else
  App.set('localStorageEnabled', false)

require 'initializers'
App.initialize()
