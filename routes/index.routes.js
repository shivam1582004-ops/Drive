const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const upload = require("../config/upload");
const fileModel=require("../models/files.model")

const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../config/s3.config");

router.get("/home", auth, async (req, res) => {

const userFiles=await fileModel.find({
  user: req.user.userId
})

  console.log(userFiles);

  res.render("home",{
    files:userFiles
  });
});



router.post("/uploadfile", auth, upload.single("file"), async (req, res) => {
   
 
  const newFile=await fileModel.create({
    path: req.file.key,
    originalname: req.file.originalname,
    user: req.user.userId

  })

  res.json(newFile);

});

router.get('/download/:key',auth, async (req,res)=>{

  const loggedInUserId= req.user.userId;
  const key=req.params.key;

  const file=await fileModel.findOne({
    user: loggedInUserId,
    path:key
  })

  if(!file){
    return res.status(401).json({
      message:'Unauthorized'
    })
  }
  
  const command = new GetObjectCommand({
    Bucket: process.env.aws_bucket_name,
    Key: key,
    ResponseContentDisposition: `attachment; filename="${file.originalname}"`
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

   res.redirect(signedUrl);

})

module.exports = router;