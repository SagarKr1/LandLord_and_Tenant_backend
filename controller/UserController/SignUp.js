const mail = require('../../model/mail/SignupMail');
const db = require('../../DataBase/mongoDB');


module.exports = async (req, res) => {
    try {
        const { email, phone, name, age } = req.body;
        if (!email || !phone || !name || !age) {
            return res.json({
                statusCode: 404,
                body: "data should not be empty"
            })
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
        const userData = {
            name,
            phone: Number(phone),
            email,
            age: Number(age),
            isVerified: false,
            password: verificationCode
        }
        const dbCon = await db.handler();
        const collection = await dbCon.collection('user');
        const findUser = await collection.findOne({ email: email, isVerified: false });
        console.log(findUser);
        if (findUser) {
            if (!findUser.isVerified) {
                // Delete the unverified user
                await collection.deleteOne({ email: email });
                console.log(`Deleted unverified user with email: ${email}`);
            } else {
                return res.json({
                    statusCode: 200,
                    body: "User already exist"
                })
            }
        }
        const user = await collection.insertOne(userData);
        console.log(user);


        const sent = await mail(verificationCode, email);
        if (sent['status'] == false) {
            return res.json({
                statusCode: 400,
                body: "Something went wrong"
            })
        }
        return res.json({
            statusCode: 200,
            body: "Verification code sent to your gmail"
        });
    } catch (e) {
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}