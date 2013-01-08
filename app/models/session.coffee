App.Session = DS.Model.extend

  title: DS.attr('string')
  abstract: DS.attr('string')
  start: DS.attr('date')
  end: DS.attr('date')
  room: DS.attr('string')
  difficulty: DS.attr('string')
  speakerName: DS.attr('string')
  technology: DS.attr('string')
  uri: DS.attr('string')
  eventType: DS.attr('string')
  sessionLookupId: DS.attr('string')
  speakerURI: DS.attr('string')

  dateFomat: 'h:mma'

  difficultyLabelClass: (->
    switch @get('difficulty')
      when 'Beginner' then 'label-success'
      when 'Intermediate' then 'label-warning'
      when 'Advanced' then 'label-important'
      else ''
  ).property('difficulty')

  # Public: The English day that this talk falls on, based on the start time.
  dayLabel: (->
    moment(@get('start')).format('dddd')
  ).property('start')

  momentStart: (->
    start = @get('start')
    if Ember.isEmpty(start)
      null
    else
      moment start
  ).property('start')

  momentEnd: (->
    end = @get('end')
    if Ember.isEmpty(end)
      null
    else
      moment end
  ).property('end')

  timeLabel: (->
    label = ''
    label += @get('momentStart').format(@dateFomat) if @get('momentStart')
    label += " - #{@get('momentEnd').format(@dateFomat)} "if @get('momentEnd')
    label
  ).property('momentStart', 'momentEnd')

  length: (->
    return false unless @get('momentStart') and @get('momentEnd')
    seconds = @get('momentEnd').unix() - @get('momentStart').unix()
  ).property('momentStart', 'momentEnd')

  lengthLabel: (->
    moment.duration(@get('length'), "seconds").humanize()
  ).property('length')
