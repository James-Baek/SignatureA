var fs = require('fs');
var Promise = require('promise');
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

const args = process.argv;

uploadToIpfs(args[2], args[3]);

function uploadToIpfs(outputDirectory, name) {
    return new Promise(function (resolve, reject) {
     uploadFiles = []
  
      var files = fs.readdirSync(outputDirectory);
      files
        .filter(file => file.substr(file.indexOf('.'), file.length) != "m3u8")
        .forEach(function (file) {
          uploadFiles.push({
            path: name + "/" + file,
            content: fs.createReadStream(outputDirectory + "/" + file)
          })
        })
  
      ipfs.files.add(uploadFiles, function (err, files) {
        if (!err) {
        //   console.log("uploaded to ipfs")
        } else { 
        //   resolve(err)
        }
        console.log(files[0])
  
        fs.readFile(outputDirectory + "/", "utf8", function(err, data) {
          files.forEach(function(ipfsHash) { 
            split = ipfsHash.path.split('/')
            segment = split[split.length-1]
          })

        });
      })
    })
  }