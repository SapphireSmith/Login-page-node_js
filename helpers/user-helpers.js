var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const async = require('hbs/lib/async')
const { ObjectId } = require('mongodb')
const { response } = require('../app')

// Save user login details
// It will be save using bcrypt (Password)
module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.Password = await bcrypt.hash(userData.Password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data.insertedId)

            })
        })
    },
    //used for login (email id and password checking )
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            // let loginStatus=false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ Email: userData.Email })
            if (user) {
                bcrypt.compare(userData.Password, user.Password).then((status) => {
                    //Checking conditions ... If user is available or not or cridentials is Invalid ...
                    if (status) {
                        console.log('Login Success')
                        response.user = user;
                        response.status = true;
                        resolve(response);

                    } else {
                        console.log('Login failed');
                        resolve({ status: false })
                    }
                })
                //no user fount 
            } else {
                console.log('no user');
                resolve({ status: false })
            }
        })
    },

    
} 