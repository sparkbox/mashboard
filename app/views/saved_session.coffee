App.SavedSessionView = Ember.View.extend
  undid: false
  # Hack to get the isSaved flag to update
  undoCount: 0
  templateName: 'saved_session'
  undoRemoveSession: ->
    session = @get('context')
    App.get('savedSessions').addSession session
    @set('undid', true)
    @incrementProperty('undoCount')

  isSaved: (->
    @get('context.isSaved')
  ).property('context.isSaved', 'undoCount', 'undid')
