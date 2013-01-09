App.SessionView = Ember.View.extend
  templateName: 'session'
  showAbstract: false
  clickedShowAbstract: -> @toggleProperty('showAbstract')
