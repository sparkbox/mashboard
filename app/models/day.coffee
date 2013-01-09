App.Day = DS.Model.extend
  date: DS.attr('date')

  momentDate: (->
    moment.utc(@get('date'))
  ).property('date')

  weekDay: (->
    @get('momentDate').format('dddd')
  ).property('date')

  containsDate: (date) ->
    momentDate = @get('momentDate')
    startOfDay = momentDate.clone().hours(0).minutes(0).seconds(0)
    endOfDay = momentDate.clone().hours(23).minutes(59).seconds(59)

    unixTime = moment(date).unix()
    unixTime > startOfDay.unix() and unixTime < endOfDay.unix()
