const authService = require("../service/auth.service")

const Login = async(req, res)=>{
    const {email, password} = req.body
    if(!email|| !password){
        return res.status(400).json({message:"both fields are needed", data: null, success: false})
    }
    const response = await authService.Login(email, password)

    return res.status(response.code).json({message: response.message, data: response.data, success: response.success})
    
}

module.exports = {
    Login
}
