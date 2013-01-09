App.SpeakerController = Ember.ObjectController.extend
  loadedSessions: (->
    @get('sessions').map (session) ->
      sessionId = session.get('id').split('/').get('lastObject')
      App.Session.find(sessionId)
  ).property('sessions')
