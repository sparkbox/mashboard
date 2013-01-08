# Public: The main application router.
App.Router.map (match) ->
  match('/').to('index')
  match('/days').to('days', (match) ->
    match('/').to('daysIndex')
    match('/:day_id').to('day')
  )
  match('/speakers').to('speakers', (match) ->
    match('/').to('speakersIndex')
    match('/:day_id').to('speaker')
  )

App.IndexRoute = Ember.Route.extend
  redirect: ->
    @transitionTo('daysIndex')

App.DaysRoute = Ember.Route.extend
  model: ->
    App.Day.daysData.map (dayData) ->
      App.Day.createRecord(dayData)

App.DaysIndexRoute = Ember.Route.extend
  model: (router) -> @controllerFor('days').get('content')
  setupController: (controller, model) ->
    controller.set('content', model)
    controller.set('sessions', App.Session.find())
    controller.set('speakers', App.Speaker.find())
