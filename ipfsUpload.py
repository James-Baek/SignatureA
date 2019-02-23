import subprocess
import json

# print("start")


class HashMake():
result = subprocess.check_output(["node", "ipfsUpload.js", "./SignatureProject/media/documents/2019", "butterfly.mp3"]).decode('utf-8')
a = result.find("hash") + 7
b = a + 46
hash = result[a:b]
# print(result[a:b])

