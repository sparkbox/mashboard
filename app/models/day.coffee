App.Day = DS.Model.extend
  date: DS.attr('date')
  sessions: DS.hasMany('App.Session')

  momentDate: (->
    moment.utc(@get('date'))
  ).property('date')

  weekDayLabel: (->
    @get('momentDate').format('dddd')
  ).property('date')

  shortWeekDayLabel: (->
    @get('momentDate').format('ddd')
  ).property('date')

  containsDate: (date) ->
    momentDate = @get('momentDate')
    moment(date).year() is momentDate.year() and
    moment(date).month() is momentDate.month() and
    moment(date).day() is momentDate.day()

  hours: (->
    hours = @get('sessions').reduce((hours, session) ->
      return hours unless session.get('start')
      hour = hours.findProperty('hour', session.get('startMoment').hours())
      if hour
        hour.get('sessions').pushObject(session)
      else
        hour = App.Hour.createRecord
          time: session.get('start')
        hour.get('sessions').pushObject(session)
        hours.pushObject hour

      hours
    [])
    Ember.ArrayController.create
      content: hours
      sortProperties: ['hour']
  ).property('sessions')

App.Day.reopenClass
  daysData: [
    {id: 'tuesday', date: '2013-01-08T00:00:00+00:00'}
    {id: 'wednesday', date: '2013-01-09T00:00:00+00:00'}
    {id: 'thursday', date: '2013-01-10T00:00:00+00:00'}
    {id: 'friday', date: '2013-01-11T00:00:00+00:00'}
  ]
