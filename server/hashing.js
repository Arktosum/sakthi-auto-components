function hash(hashFunction,data){
    let crypto = require('crypto');
    let hash = crypto.createHash(hashFunction).update(data).digest('hex');
    return hash
}

module.exports = {hash}