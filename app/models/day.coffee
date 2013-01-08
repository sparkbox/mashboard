App.Day = DS.Model.extend
  date: DS.attr('date')

  moment: (->
    moment.utc(@get('date'))
  ).property('date')

  weekDay: (->
    @get('moment').format('dddd')
  ).property('date')
