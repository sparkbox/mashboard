App.Speaker = DS.Model.extend
  name: DS.attr('string')
  biography: DS.attr('string')
  speakerURI: DS.attr('string')
  twitterHandle: DS.attr('string')
  blogURL: DS.attr('string')
  lookupId: DS.attr('string')
  sessions: DS.hasMany('App.Session')

  twitterUserName: (->
    @get('twitterHandle')?.replace(/^@/, '')
  ).property('twitterHandle')

  twitterURL: (->
    "http://twitter.com/#{@get('twitterUserName')}"
  ).property('twitterUserName')

  avatarURL: (->
    "http://avatars.io/twitter/#{@get('twitterUserName')}"
  ).property('twitterUserName')

  avatarURLWithBackup: (->
    if @get('hasTwitterHandle')
      @get('avatarURL')
    else
      "images/codemash_bw.png"
  ).property('twitterUserName', 'hasTwitterHandle')

  mediumAvatarURL: (->
    "#{@get('avatarURL')}?size=medium"
  ).property('avatarURL')

  hasTwitterHandle: (->
    not Ember.isEmpty(@get('twitterHandle'))
  ).property('twitterHandle')
