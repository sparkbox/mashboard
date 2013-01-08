App.Speaker = DS.Model.extend
  primaryKey: 'LookupId'

  name: DS.attr('string')
  biography: DS.attr('string')
  speakerURI: DS.attr('string')
  twitterHandle: DS.attr('string')
  blogURL: DS.attr('string')
  lookupId: DS.attr('string')
  sessions: DS.hasMany('App.Session')
