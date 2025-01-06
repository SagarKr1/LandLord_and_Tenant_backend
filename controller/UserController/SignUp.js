const mail = require('../../model/mail/SignupMail');

module.exports = async (req,res)=>{
    try{
        const {email,phone,name,age} = req.body;
        if(!email || ! phone || !name || !age){
            return res.json({
                statusCode:404,
                body:"data should not be empty"
            })
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
        const sent =await mail(verificationCode,email);
        if(sent['status']==false){
            return res.json({
                statusCode:400,
                body:"Something went wrong"
            })
        }
        return res.json({
            statusCode: 200,
            body: "Verification code sent to your gmail"
        });
    }catch(e){
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}