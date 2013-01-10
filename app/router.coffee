# Public: The main application router.
App.Router.map (match) ->
  match('/').to('index', (match) ->
    match('/').to('home')

    match('/my_mashboard').to('my_mashboard')

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
          App.set('loadedData', true)
          @controllerFor('index').set('days', days)
          @controllerFor('index').set('sessions', sessions)
          @controllerFor('index').set('speakers', speakers)

          deferred.resolve(sessions)
        )
      )
      deferred

App.HomeRoute = Ember.Route.extend
  redirect: ->
    # Redirect to the current day if it's in the list of days
    now = new Date
    days = @controllerFor('index').get('days')
    currentDay = days.find (day) ->
      day.containsDate(now)
    if currentDay
      @transitionTo('day', currentDay)
  setupController: (controller, model) ->
    controller.set('days', @controllerFor('index').get('days'))

App.DayRoute = Ember.Route.extend
  exit: -> App.set('currentDay', null)
  setupController: (controller, model) ->
    # Using global App object is bad to track this state, but it's the only
    # way I've found to do it so far.
    App.set('currentDay', model)

    controller.set('content', model)

# Without this route we clobber the session by automatically rendering the
# sessions template
App.SessionsRoute = Ember.Route.extend
  renderTemplate: -> false

App.SpeakerRoute = Ember.Route.extend
  model: (params) ->
    speakers = @controllerFor('index').get('speakers')
    speakers.findProperty('id', params.speaker_id)

App.MyMashboardRoute = Ember.Route.extend()
