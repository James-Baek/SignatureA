import soundcloud 

client = soundcloud.Client(client_id="b58fafed3cba2066d07ae1cd704f7c39")

track = client.get('/tracks/30709985')
print(track.title)

