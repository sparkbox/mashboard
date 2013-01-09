App.Day = DS.Model.extend
  date: DS.attr('date')
  sessions: DS.hasMany('App.Session')

  momentDate: (->
    moment.utc(@get('date'))
  ).property('date')

  weekDayLabel: (->
    @get('momentDate').format('dddd')
  ).property('date')

  containsDate: (date) ->
    momentDate = @get('momentDate')
    startOfDay = momentDate.clone().hours(0).minutes(0).seconds(0)
    endOfDay = momentDate.clone().hours(23).minutes(59).seconds(59)

    unixTime = moment(date).unix()
    unixTime > startOfDay.unix() and unixTime < endOfDay.unix()
App.Day.reopenClass
  daysData: [
    {id: 'tuesday', date: '2013-01-08T00:00:00+00:00'}
    {id: 'wednesday', date: '2013-01-09T00:00:00+00:00'}
    {id: 'thursday', date: '2013-01-10T00:00:00+00:00'}
    {id: 'friday', date: '2013-01-11T00:00:00+00:00'}
    {id: 'saturday', date: '2013-01-12T00:00:00+00:00'}
  ]
