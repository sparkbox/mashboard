App.Speaker = DS.Model.extend
  name: DS.attr('string')
  biography: DS.attr('string')
  speakerURI: DS.attr('string')
  twitterHandle: DS.attr('string')
  blogURL: DS.attr('string')
  lookupId: DS.attr('string')
  sessions: DS.hasMany('App.Session')

  twitterURL: (->
    "http://twitter.com/#{@get('twitterHandle')}"
  ).property('twitterHandle')

