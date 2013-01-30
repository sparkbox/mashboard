Ember.Application.initializer
  name: 'setupData'

  initialize: (container, application) ->
    console.log 'initialize'
    sessions = App.Session.find({})
    speakers = App.Speaker.find({})
    days = App.Day.daysData.map (dayData) ->
      App.Day.createRecord(dayData)

    deferred = Ember.Object.createWithMixins(Ember.DeferredMixin)

    sessions.then(=>
      # Add the sessions to the day they occur.
      sessions.forEach (session) ->
        days.forEach (day) ->
          if day.containsDate(session.get('start'))
            day.get('sessions').pushObject(session)
      speakers.then(=>

        container.optionsForType('days', instantiate: false, singleton: true)
        container.register('days', 'all', days)
        container.optionsForType('sessions', instantiate: false, singleton: true)
        container.register('sessions', 'all', sessions)
        container.optionsForType('speakers', instantiate: false, singleton: true)
        container.register('speakers', 'all', speakers)

        deferred.resolve(sessions)
      )
    )
    deferred

Ember.Application.initializer
  name: 'injectData'
  after: 'setupData'

  initialize: (container) ->
    container.injection('controller:application', 'days', 'days:all')
    container.typeInjection('route', 'days', 'all:days')
    container.injection('controller:application', 'sessions', 'sessions:all')
    container.typeInjection('route', 'sessions', 'all:sessions')
    container.injection('controller:application', 'speakers', 'speakers:all')
    container.typeInjection('route', 'speakers', 'all:speakers')
