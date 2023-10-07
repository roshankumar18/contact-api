const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required :[true,"Please add the username"]
    },
    email:{
        type:String,
        required :[true,"Please add the email"],
        unique:[true,"please enter unique email"]
    },
    password:{
        type:String,
        required :[true,"Please add the password"],
    }
}, {
    timestamps:true
}
)
module.exports = mongoose.model('UserModel',userSchema)