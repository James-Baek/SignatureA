import subprocess
import json

result = subprocess.check_output(["node", "ipfsUpload.js", "./documents/2019", "butterfly.mp3"]).decode('utf-8')
print(result)

a = result.find("hash") + 7
b = a + 46

print(result[a:b])

hash = result[a:b]