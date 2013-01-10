# Public: The interface to localStorage, through store.js, that saves the the
# sessions the user has marked.
App.SavedSessions = Ember.Object.extend

  sessionsUpdated: 0
  _savedSessionsKey: 'savedSessionIds'

  _savedSessionSet: ->
    if savedSessionIds = store.get(@_savedSessionsKey)
      new Ember.Set(savedSessionIds)
    else
      new Ember.Set()

  # Public: Add a session to the saved sessions list.
  #
  # Returns nothing.
  addSession: (session) ->
    savedSessionsSet = @_savedSessionSet()
    savedSessionsSet.add(session.get('id'))
    store.set('savedSessionIds', savedSessionsSet.toArray())
    @incrementProperty('sessionsUpdated')

  removeSession: (session) ->
    savedSessionsSet = @_savedSessionSet()
    savedSessionsSet.remove(session.get('id'))
    store.set('savedSessionIds', savedSessionsSet.toArray())
    @incrementProperty('sessionsUpdated')

  # Public: Returns the list of saved sessions.
  sessions: (->
    savedSessionIds = store.get(@_savedSessionsKey)
    return [] unless savedSessionIds?
    store.get(@_savedSessionsKey).map (sessionId) ->
      App.Session.find(sessionId)
  ).property('sessionsUpdated')
