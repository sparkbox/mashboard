App.SessionView = Ember.View.extend
  templateName: 'session'
  showAbstract: false
  clickedShowAbstract: -> @toggleProperty('showAbstract')

  toggleSavedSession: ->
    session = @get('context')
    savedSessions = App.get('savedSessions')
    if session.get('isSaved')
      savedSessions.removeSession(session)
    else
      savedSessions.addSession(session)
