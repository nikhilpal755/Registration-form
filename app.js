const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const {UserData} = require("./models/user");




// instance of express 
const app = express();

// listening  to the port

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log("server started at port 3000");
})


// Body parser 
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//mongoose connect
mongoose.connect('mongodb://localhost:27017/registration-form' , {useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex:true})
.then( () => { console.log("mongoose connect ho gya");})
.catch((err) => console.log(err));


// sending HTMLfile to the server
app.get("/" , (req , res) =>{
    try{
        
        res.sendFile(__dirname + "/index.html");
    }catch(err){
        console.log(err);
    }    

})    

// MODEL
app.set("UserData" , UserData);






// Catpuring post request
app.post("/" , async(req, res) =>{

   const userName = req.body.USERNAME;
   const userEmail = req.body.EMAIL;

   const userPassword= req.body.PASSWORD;
   const cPassword = req.body.CPASSWORD;

  console.log(userName , userEmail , userPassword  , cPassword);


  //------------ User Validation ------------- 
  
  // checking if user have strong password or not 
   if(!validator.isStrongPassword(userPassword)){
        res.send("weak password");
   }

   // checking if ( password === confirm password)
  if(userPassword !== cPassword){
      res.send("your password is not matching");
  }
   
//   checking if email is already present or not 
  let user = await UserData.findOne({email_id : userEmail});
  if(user){
      return res.status(400).send("You're already registered !");  
  }

//   checking if username is already taken
  let checkname = await UserData.findOne({username : userName});
  if(checkname){
      return res.send("UserName already taken");
  }
  


   // ab ye data bhejna hai database ko

    try{
        const user =  UserData({
            username : userName, 
            email_id : userEmail ,
            password : userPassword ,
            confirmPassword : cPassword 
        });
        const result = await user.save();
        // console.log(result);

        res.send("you're registered now");

    }catch(err){
        console.log(err);
        res.send(err);
    }




})

