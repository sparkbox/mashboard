# Public: The view that encompasses the entire application, everything is
# rendered as a child of this view.
App.ApplicationView = Ember.View.extend
  templateName: 'index'
  classNames: 'content'
