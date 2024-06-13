const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require('path');
const mongoose = require("mongoose");
const expError = require("./utils/expError.js");
const listingRoute = require("./routes/listing.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport= require("passport"); 
const authRoute= require("./routes/autentication.js");

mongoUrl = process.env.MONGO_URL; 

mongoose.connect(mongoUrl);

require("dotenv").config();

app.set ("view engine", "ejs");
app.engine("ejs",ejsMate); 
app.use (express.json());
app.use (express.urlencoded({extended:true}));
app.use (express.static(path.join(__dirname,"public")));

const store = MongoStore.create({
    mongoUrl:mongoUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600
})

store.on("error",()=>{
    console.log("Error in mongo session.");
})

const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUnitilized:true,
    cookie:{ 
        expires:Date.now() + 1*24*60*60*1000,
        maxAge: 1*24*60*60*1000,
        httpOnly:true

    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
  
//Middleware for flash messages 
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user;
    next();
}) 

app.use("/home", listingRoute);  //Router of listing 
app.use("/auth", authRoute); 

//Default route error
app.all("*",()=>{
    throw new expError(404,"Page not found");
})

// Error handling middleware
app.use((err,req,res,next)=>{
    const{status=400,message} = err;
    res.status(status);
    res.render("error",{err});
    next(err);
});

app.listen(3000,()=>{
    console.log("Server running...");
}); 
