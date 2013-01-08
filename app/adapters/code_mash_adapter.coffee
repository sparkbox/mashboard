serializer = App.CodeMashSerializer.create()
serializer.configure App.Session,
  primaryKey: 'SessionLookupId'

serializer.configure App.Speaker,
  primaryKey: 'LookupId'

App.CodeMashAdapter = DS.RESTAdapter.extend
  serializer: serializer

App.CodeMashAdapter.configure 'plurals',
  session: 'sessions.json'
  speaker: 'speakers.json'
