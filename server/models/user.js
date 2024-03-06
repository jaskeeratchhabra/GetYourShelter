const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    phone:{
       type:String,
       unique:true,
       required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},
    {
      timestamps:true,
    }
)


const userModel=mongoose.model('users',userSchema)

module.exports =userModel;