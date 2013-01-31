TWITTER_API_URL = 'https://api.twitter.com/1'

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
    if @get('hasTwitterHandle')
      "#{TWITTER_API_URL}/users/profile_image?screen_name=#{@get('twitterUserName')}"
    else
      "images/codemash_bw.png"
  ).property('twitterUserName', 'hasTwitterHandle')

  mediumAvatarURL: (->
    if @get('hasTwitterHandle')
      "#{@get('avatarURL')}&size=bigger"
    else
      "images/codemash_bw_medium.png"
  ).property('twitterUserName', 'hasTwitterHandle')

  hasTwitterHandle: (->
    not Ember.isEmpty(@get('twitterHandle'))
  ).property('twitterHandle')
