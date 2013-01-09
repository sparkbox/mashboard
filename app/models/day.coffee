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
