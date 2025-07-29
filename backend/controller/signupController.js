const {getallsignup,getLogin} = require("../model/Models");

async function sign(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fill all fields",
            });
        }
        const response = await getallsignup({ name, email, password });
        res.status(200).json({
            success: true,
            message: 'User can retrieve the data',
            data: response,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message, // Fixed from error.message
        });
    }
}
async function login(req,res) {
    try{
        const{name,password} = req.body;
        if(!name || !password){
            return res.status(400).json({
                success:false,
                message:"fill all fields"
            });
        }
        const response = await getLogin({name,password})
            res.status(200).json({
                success:true,
                message:"user data is presented in db",
                data:response,
  
            });

        }
        catch(e){
            res.status(500).json({
                success:false,
                message:"user data is no found in db"
            })
        }
    }
    


module.exports = {sign,login}