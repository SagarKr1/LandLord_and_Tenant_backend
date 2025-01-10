const db = require('../../DataBase/mongoDB');
var bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                statusCode: 404,
                body: "data should not be empty"
            })
        }

        const dbCon = await db.handler();
        const collection = await dbCon.collection('user');
        const findUser = await collection.findOne({ email: email, isVerified: true });
        console.log(findUser);

        if (!findUser) {
            return res.json({
                statusCode: 404,
                body: "SomeThing went wrong"
            });
        }

        var salt = bcrypt.genSaltSync(8);
        var hash = bcrypt.hashSync(password, salt);
        console.log(hash);
        
        await collection.updateOne(
            {email},
            {$set:{password:hash}}
        );
        return res.json({
            statusCode: 200,
            body: "password set"
        });
    } catch (e) {
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}