App.DayListItemView = Ember.View.extend
  classNameBindings: ['isActive:active']
  templateName: 'day_list_item'

  # Public: Track the global App.currentDay object and update the active class
  # of this view.
  isActive: (->
    App.get('currentDay') == @get('content')
  ).property('App.currentDay')
