# Public: The main application router.
App.Router.map (match) ->
  match('/').to('index', (match) ->
    match('/').to('home')

    match('/days').to('days', (match) ->
      match('/:day_id').to('day')
    )

    match('/sessions').to('sessions', (match) ->
      match('/').to('sessionsIndex')
      match('/:session_id').to('session')
    )

    match('/speakers').to('speakers', (match) ->
      match('/').to('speakersIndex')
      match('/:day_id').to('speaker')
    )
  )

App.IndexRoute = Ember.Route.extend
  model: ->
    sessions = App.Session.find()
    speakers = App.Speaker.find()
    days = App.Day.daysData.map (dayData) ->
      App.Day.createRecord(dayData)

    deferred = Ember.Object.createWithMixins(Ember.DeferredMixin)

    setTimeout(=>
      @controllerFor('index').set('days', days)
      @controllerFor('index').set('sessions', sessions)
      @controllerFor('index').set('speakers', speakers)
      deferred.resolve()
    , 300)

    deferred

App.HomeRoute = Ember.Route.extend
  setupController: (controller, model) ->
    controller.set('days', @controllerFor('index').get('days'))

App.DayRoute = Ember.Route.extend
  setupController: (controller, model) ->
    controller.set('content', model)
    allSessions = @controllerFor('index').get('sessions')
    filteredSessions = allSessions.filter((session) ->
      session.isSameDay(model.get('moment'))
    )
    controller.set('sessions', filteredSessions)
    controller.set('speakers', @controllerFor('index').get('speakers'))

App.SpeakersIndexRoute = Ember.Route.extend
  setupController: (controller, model) ->
    controller.set('sessions', @controllerFor('index').get('sessions'))
    controller.set('speakers', @controllerFor('index').get('speakers'))
