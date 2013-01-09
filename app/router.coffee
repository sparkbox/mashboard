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
      match('/:speaker_id').to('speaker')
    )
  )

App.IndexRoute = Ember.Route.extend
  model: ->
    if not App.get('loadedData')
      sessions = App.Session.find()
      speakers = App.Speaker.find()
      days = App.Day.daysData.map (dayData) ->
        App.Day.createRecord(dayData)

      deferred = Ember.Object.createWithMixins(Ember.DeferredMixin)

      # An artifical timeout to ensure all models have loaded.
      # TODO Replace this with proper lifecycle hooks for querying the models.
      setTimeout(=>
        App.set('loadedData', true)
        @controllerFor('index').set('days', days)
        @controllerFor('index').set('sessions', sessions)
        @controllerFor('index').set('speakers', speakers)
        deferred.resolve()
      , 300)

      deferred

App.HomeRoute = Ember.Route.extend
  setupController: (controller, model) ->
    controller.set('days', @controllerFor('index').get('days'))
    controller.set('sessions', @controllerFor('index').get('sessions'))

App.DayRoute = Ember.Route.extend
  exit: -> App.set('currentDay', null)
  setupController: (controller, model) ->
    # Using global App object is bad to track this state, but it's the only
    # way I've found to do it so far.
    App.set('currentDay', model)

    controller.set('content', model)
    allSessions = @controllerFor('index').get('sessions')
    filteredSessions = allSessions.filter((session) ->
      model.containsDate(session.get('start'))
    )
    controller.set('sessions', filteredSessions)
    controller.set('speakers', @controllerFor('index').get('speakers'))

# Without this route we clobber the session by automatically rendering the
# sessions template
App.SessionsRoute = Ember.Route.extend
  renderTemplate: -> false

App.SpeakerRoute = Ember.Route.extend
  model: (params) ->
    speakers = @controllerFor('index').get('speakers')
    speakers.findProperty('id', params.speaker_id)
