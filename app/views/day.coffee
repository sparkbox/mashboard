App.DayView = Ember.View.extend
  sessionsText: (->
    if @get('controller.sessions').length == 1 then 'Session' else 'Sessions'
  ).property()
