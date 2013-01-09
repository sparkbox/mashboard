App.SpeakerView = Ember.View.extend
  sessionsText: (->
    if @get('controller.content.sessions.length') is 1 then 'Session' else 'Sessions'
  ).property('controller.content.loadedSessions')
