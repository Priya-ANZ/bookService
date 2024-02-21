const db = require("../db/db.js");
const jwt = require("jsonwebtoken");

exports.checkUser = async function({email}){
       const user = await db('users')
                    .select('*')
                    .where('email',email) 
       return user
}

exports.register = async function({email, password,isAdmin}){
         const user = await db('users').insert([{
                                email: email,
                                password: password,
                                isAdmin: isAdmin
                     }])
        return user
}

exports.generateAuthToken =  function(userObj){
    const jwtPrivateKey = process.env.JWTKEY
        const token = jwt.sign(
          {
            
            isAdmin: userObj.isAdmin,
            email: userObj.email,
          },
          jwtPrivateKey
        );
        return token;
      };
