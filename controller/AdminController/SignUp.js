

module.exports = async (req,res)=>{
    try{
        const {} = req.body;
        return res.json({
            statusCode: 200,
            body:req.body
        });
    }catch(e){
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}