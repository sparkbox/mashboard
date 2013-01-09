Ember.Handlebars.registerBoundHelper('pluralize', (value, options) ->
  result = ''
  if value? and value.get('firstObject.constructor')?
    modelName = value.get('firstObject.constructor')
      .toString()
      .split('.')
      .get('lastObject')
    result = if value.get('length') is 1 then modelName else "#{modelName}s"
    result = result.toLowerCase() if Ember.get(options, 'hash.lowerCase')

  result
)
