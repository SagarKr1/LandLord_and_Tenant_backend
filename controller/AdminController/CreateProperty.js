

module.exports = async (req,res)=>{
    try{
        const {roll_no,subject,attempt,date} = req.body;

        return res.json({
            statusCode: 200,
            body: req.body
        });
    }catch(e){
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}