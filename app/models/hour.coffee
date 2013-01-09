App.Hour = DS.Model.extend
  sessions: DS.hasMany('App.Session')
  time: DS.attr('date')

  timeMoment: (->
    moment(@get('time'))
  ).property('time')

  timeLabel: (->
    @get('timeMoment').format('dddd, MMMM Do YYYY, h:mma')
  ).property('timeMoment')

  shortTimeLabel: (->
    @get('timeMoment').format('h:mma')
  ).property('timeMoment')

  hour: (->
    @get('timeMoment').hours()
  ).property('timeMoment')
