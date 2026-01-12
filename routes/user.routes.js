const express=require("express");
const router=express.Router();

const { body, validationResult } = require('express-validator');//user ki details valid hai ki nhi check karta hai

const userModel=require('../models/user.model.js');// user ke schema ko require kiya

const bcrypt=require('bcrypt');//for incrypt the password

const jwt=require('jsonwebtoken');// for the jwt token generation



router.get('/login',(req,res)=>{
    res.render("login");
})

router.post('/login',
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),

    async (req,res)=>{
        const error=validationResult(req);
        if(!error.isEmpty())
        {
            return res.status(400).json({
                error:error.array(),
                message:'Invalide Data'
            })
        }
        const {username,password}=req.body;
        const user=await userModel.findOne({
            username:username
        })
        if(!user)
        {
            return res.status(400).json({
                message:"Username or Password is Incorrect"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch)
        {
            return res.status(400).json({
                message:'Username or Password is Incorrect'
            })
        }


        const token=jwt.sign({
            userId:user._id,
            email:user.email,
            username:user.username
        },
            process.env.jwtSecret
        )

        res.cookie('token',token);
        res.send("Logged In")
    }
)






router.get("/register",(req,res)=>{
    res.render("register");
})

router.post("/register",
    body('email').trim().isEmail().isLength({min:13}),

    body('password').trim().isLength({min:5}),

    body('username').trim().isLength({min:3}),
    
    async (req,res)=>{
        const errors=validationResult(req); 
        if(!errors.isEmpty())
        {
            return res.status(400).json({
                errors:errors.array(),
                message:"Invalid Data"
            })
        }
        
        
        const {username,email,password}=req.body;

        const hashPassword= await bcrypt.hash(password,10)//password hashing

        const newUser= await userModel.create({
        username,
        email,
        password:hashPassword

       })

       res.json({newUser,message:"User Register Done"});
})


module.exports=router;
