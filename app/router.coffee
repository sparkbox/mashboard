# Public: The main application router.
App.Router.map ->
  @route 'my_mashboard'

  @resource('days')
  @resource('day', path: '/days/:day_id')
  @resource('sessions')
  @resource('session', path: '/sessions/:session_id')
  @resource('speakers')
  @resource('speaker', path: '/speakers/:speaker_id')

App.IndexRoute = Ember.Route.extend
  redirect: ->
    # Redirect to the current day if it's in the list of days
    now = new Date
    days = @controllerFor('application').get('days')
    currentDay = days.find (day) ->
      day.containsDate(now)
    if currentDay and not App.get('redirected')
      App.set('redirected', true)
      @transitionTo('day', currentDay)
    else
      @transitionTo('sessions')

  setupController: (controller, model) ->
    controller.set('days', @controllerFor('application').get('days'))

App.DayRoute = Ember.Route.extend
  exit: -> App.set('currentDay', null)
  setupController: (controller, model) ->
    # Using global App object is bad to track this state, but it's the only
    # way I've found to do it so far.
    App.set('currentDay', model)
    controller.set('content', model)

# Without this route we clobber the session by automatically rendering the
# sessions template

App.SpeakerRoute = Ember.Route.extend
  model: (params) ->
    speakers = @controllerFor('application').get('speakers')
    speakers.findProperty('id', params.speaker_id)

App.MyMashboardRoute = Ember.Route.extend
  model: -> App.get('savedSessions.sessions')

  setupController: (controller, model) ->
    controller.set('sessions', model)

App.SessionsRoute = Ember.Route.extend
  setupController: (controller) ->
    days = @controllerFor('application').get('days')
    sessions = days.reduce((sessions, day) ->
      sessions.pushObjects(day.get('sessions').toArray())
      sessions
    , [])
    controller.set('sessions', sessions)
