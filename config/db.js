const mongoose=require('mongoose');
function connectToDb()
{
    mongoose.connect(process.env.mongo_url).then(()=>{
        console.log("Connected to Db");
    });
}

module.exports=connectToDb;