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
