import subprocess
import json

print("start")
result = subprocess.check_output(["node", "ipfsUpload.js", "./SignatureProject/media/documents/2019", "Forrest_Gump_-_10_-_Washington_Reunion_ghoyGD4.mp3"]).decode('utf-8')
print(result)

a = result.find("hash") + 7
b = a + 46

print(result[a:b])

hash = result[a:b]