const db = require('../../DataBase/mongoDB');
var bcrypt = require('bcryptjs');


module.exports = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || ! password){
            return res.json({
                statusCode:404,
                body:"data should not be empty"
            })
        }
        const dbCon = await db.handler();
        const collection = await dbCon.collection('user');
        const user = await collection.findOne({ email: email, isVerified: true });
        console.log(user);
        if(!user){
            return res.json({
                statusCode:404,
                body:"User not found"
            })
        }
        const checkPassword = await bcrypt.compareSync(password, user.password);
        console.log(checkPassword);
        if(!checkPassword){
            return res.json({
                statusCode:404,
                body:"Wong password"
            })
        }
        const data = {
            name:user.name,
            email:user.email,
            phone:user.phone,
            age:user.age
        }
        return res.json({
            statusCode: 200,
            body: data
        });
    }catch(e){
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}