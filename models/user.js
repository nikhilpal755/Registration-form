const mongoose = require("mongoose");


// user schema
const userSchema = new mongoose.Schema({
   username : {
        type : String,
        required : true,

    },
    email_id : {
        type : String , 
        required : true,
   
    },
    password : {
        type : String ,
        required : true,
        
    } ,
    confirmPassword : {
        type : String, 
        required : true,
 
    }

})


// model
const UserData = mongoose.model("UserData" , userSchema);


module.exports.UserData = UserData;
