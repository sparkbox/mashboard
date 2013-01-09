Ember.Handlebars.registerBoundHelper('pluralize', (value, options) ->
  if value? and value.get('firstObject.constructor')?
    modelName = value.get('firstObject.constructor')
      .toString()
      .split('.')
      .get('lastObject')
    if value.get('length') is 1 then modelName else "#{modelName}s"
  else
    ''
)
