App.SessionView = Ember.View.extend
  templateName: 'session'
  click: (mode) ->
    router = @get('container').lookup('router:main')
    router.transitionTo('session', @get('context'))
