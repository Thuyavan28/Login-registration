const db = require('../db'); 

async function getallsignup({ name, email, password }) {
    try {
        const checkQuery = 'select * from signup where email =$1';
        const Result = await db.query(checkQuery,[email])
        if(Result.rows.length>0){
            throw new Error("email already registered")
        }


        const query = 'INSERT INTO signup(name, email, password) VALUES ($1, $2, $3) RETURNING *';
        const result = await db.query(query, [name, email, password]);
        return result.rows[0]; 
    } catch (e) {
        throw e;
    }
}
async function getLogin({name,password}) {
    try{
        const query='select * from signup where name=$1 and password=$2';
        const Result= await db.query(query,[name,password])
        if(Result.rows.length > 0){
             return Result.rows[0];
        }
        else{
            throw new Error("invalid name or password ")
        }

    }
    catch(e){
        throw e;
    }
    
}

module.exports = {getLogin, getallsignup};