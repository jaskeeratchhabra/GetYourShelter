const mongoose=require("mongoose")

const roomSchema=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    address: {
        nearestCollege:{
           type:String,
           required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        }
    },
     maxCount:{
        type:Number,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    bedLeft:{
        type:Number,
        required:true
    }
    ,
    rentpermonth:{
        type:Number,
        required:true
    },
    imageurls:[],
    basicAmmenities:[],
    currentbookings:[],
    
    type:{
        type:String,
        required:true
    },

    description:{
       type:String
    }
  },
    {
      timestamps:true
    }
)


const roomModel=mongoose.model('rooms',roomSchema)

module.exports =roomModel;