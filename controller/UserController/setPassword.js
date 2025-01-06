

module.exports = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.json({
                statusCode:404,
                body:"data should not be empty"
            })
        }
        return res.json({
            statusCode: 200,
            body: "password set"
        });
    }catch(e){
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}