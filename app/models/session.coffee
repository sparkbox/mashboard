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

  # Constants
  dateFomat: 'h:mma'
  abstractCharacterLimit: 150

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

  startMoment: (->
    start = @get('start')
    if Ember.isEmpty(start)
      null
    else
      moment start
  ).property('start')

  endMoment: (->
    end = @get('end')
    if Ember.isEmpty(end)
      null
    else
      moment end
  ).property('end')

  timeLabel: (->
    label = ''
    label += @get('startMoment').format(@dateFomat) if @get('startMoment')
    label += " - #{@get('endMoment').format(@dateFomat)} "if @get('endMoment')
    label
  ).property('startMoment', 'endMoment')

  length: (->
    return false unless @get('startMoment') and @get('endMoment')
    seconds = @get('endMoment').unix() - @get('startMoment').unix()
  ).property('startMoment', 'endMoment')

  lengthLabel: (->
    moment.duration(@get('length'), "seconds").humanize()
  ).property('length')

  speaker: (->
    App.Speaker.find(@get('speakerURI').split('/').get('lastObject'))
  ).property('speakerURI')

  shortenedAbstract: (->
    @get('abstract')?.slice(0, @abstractCharacterLimit)
  ).property('abstract')

  hasMoreAbstract: (->
    @get('abstract.length') > @abstractCharacterLimit
  ).property('abstract')

  hasAbstract: (->
    not Ember.isEmpty @get('abstract')
  ).property('abstract')
