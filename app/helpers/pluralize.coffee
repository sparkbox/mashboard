Ember.Handlebars.registerBoundHelper('pluralize', (value, options) ->
  if value?
    modelName = value.get('firstObject.constructor')
      .toString()
      .split('.')
      .get('lastObject')
    if value.get('length') is 1 then modelName else "#{modelName}s"
  else
    ''
)