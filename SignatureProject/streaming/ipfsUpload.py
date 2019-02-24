import subprocess
import json


result = subprocess.check_output(["node", "ipfsUpload.js", "../media/documents/2019", "First_Step.mp3"]).decode('utf-8')
a = result.find("hash") + 7
b = a + 46
hash = result[a:b]
print(result[a:b])
