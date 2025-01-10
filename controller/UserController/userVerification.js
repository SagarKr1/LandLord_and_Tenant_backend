const db = require('../../DataBase/mongoDB');


module.exports = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.json({
                statusCode: 404,
                body: "data should not be empty"
            })
        }

        const dbCon = await db.handler();
        const collection = await dbCon.collection('user');
        const findUser = await collection.findOne({ email: email, isVerified: false });
        console.log(findUser);

        if(!findUser){
            return res.json({
                statusCode:404,
                body:"SomeThing went wrong"
            });
        }
        console.log(Number(findUser.password)+" "+Number(otp));
        
        if(Number(findUser.password)!==Number(otp)){
            return res.json({
                statusCode:400,
                body:"Wrong otp"
            })
        }

        await collection.updateOne(
            {email},
            {$set:{isVerified:true}}
        );

        return res.json({
            statusCode: 200,
            body: "successfully verified. Create new Password"
        });
    } catch (e) {
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}