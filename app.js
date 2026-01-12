const express=require('express');
const app=express();// express ko laaye

const userroute= require("./routes/user.routes"); //user route ko laaye
app.use('/user', userroute);

const indexrouter=require("./routes/index.routes")// index route ko laaye
app.use('/', indexrouter);

const dotenv=require('dotenv');//env ko laaye
dotenv.config();                // sare secrets env me rakhte hain jaise ki monogoDb ka connect url

const connectToDb=require('./config/db');//db ko laaye
connectToDb();

const cookieParser = require("cookie-parser");
app.use(cookieParser());// middleware 3 for token


app.set('view engine','ejs')//view engine set kiya

app.use(express.json());            // middleware 1
app.use(express.urlencoded({extended:true})); // middleware 2





app.listen(3000,()=>{console.log("Server is runing")})