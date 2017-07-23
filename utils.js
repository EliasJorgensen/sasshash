// Libs
const FS = require('fs'),
      Crypto = require('crypto')

exports.getHashFromFile = function (filepath, hashType = 'sha1') {
    const sum = Crypto.createHash(hashType)

    if (!FS.existsSync(filepath))
        return null

    sum.update(FS.readFileSync(filepath))
    return sum.digest('hex')
}