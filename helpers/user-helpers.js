var db = require('../config/connection');
var collection = require('../config/collections');
const bcrypt = require('bcrypt');
const { response } = require('express');
module.exports={

    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{

        userData.password=await bcrypt.hash(userData.password,10)
        db.get().collection(collection.USERS_COLLECTION).insertOne(userData).then((data)=>{
            resolve(data.ops[0])
        })
        })
    },
    doLogin:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            let response = {}
            let user = await db.get().collection(collection.USERS_COLLECTION).findOne({email:userData.email})
            if (user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log("Login Success !");
                        response.user = user
                        response.status = true
                        resolve(response)
                    }else{
                        resolve({status:false})
                    }
                })
            }else{
                resolve({status:false})
            }
        })
    }
}