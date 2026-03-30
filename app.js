const express=require('express');
const app=express();// express ko laaye

const dotenv=require('dotenv');//env ko laaye
dotenv.config();                // sare secrets env me rakhte hain jaise ki monogoDb ka connect url

const cookieParser = require("cookie-parser");
app.use(cookieParser());// middleware 3 for token

app.use(express.json());            // middleware 1
app.use(express.urlencoded({extended:true})); // middleware 2


const userroute= require("./routes/user.routes"); //user route ko laaye
app.use('/user', userroute);

const indexrouter=require("./routes/index.routes")// index route ko laaye
app.use('/', indexrouter);


const connectToDb=require('./config/db');//db ko laaye
connectToDb();



app.set('view engine','ejs')//view engine set kiya






app.listen(3000,()=>{console.log("Server is runing")})