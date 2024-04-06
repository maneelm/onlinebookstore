import { model,Schema } from "mongoose";

export const BookScehma=new Schema(
    {
        name:{type:String, required:true},
        price:{type:Number,required:true},
        tags:{type:[String]},
        imageUrl:{type:String,required:true},
        publisher:{type:String,required:true},
    },
    {
        toJSON:{
            virtuals:true,
        },
        toObject:{
            virtuals:true,
        },
        timestamps:true,
    }
)

export const BookModel=model('book',BookScehma)