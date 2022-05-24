
const mongoClient = require('mongodb').MongoClient
const state = {
    dbs:null
}

module.exports.connect = function(done){
    const url = 'mongodb://localhost:27017'
    const dbname = 'Shopping'
        mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.dbs = data.db(dbname)
    })

    done()

}
         
module.exports.get = function(){  
    return state.dbs 
}
