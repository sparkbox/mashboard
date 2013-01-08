App.CodeMashSerializer = DS.JSONSerializer.extend
  extractMany: (loader, json, type, records) ->
    if type is App.Session
      @_super(loader, {'sessions.json': json}, type, records)
    else if type is App.Speaker
      @_super(loader, {'speakers.json': json}, type, records)
    else
      @_super(loader, json, type, records)

  keyForAttributeName: (type, name) ->
    upperFirst = name[0].toUpperCase()
    "#{upperFirst}#{name[1..]}"
