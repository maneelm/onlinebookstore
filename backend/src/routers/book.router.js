import { Router } from "express";
// import { sample_books,sample_tags } from "../data.js";
import { BookModel } from "../models/book.model.js";
import handler from 'express-async-handler';


const router=Router();

router.get('/',handler(async (req,res)=>{
    const books=await BookModel.find({});
    res.send(books);
}));

router.get('/tags',handler(async (req,res)=>{
    const tags=await BookModel.aggregate([
        {
            $unwind:'$tags',
        },
        {
            $group:{
                _id:'$tags',
                count:{$sum:1},
            },
        },
        {
            $project:{
                _id:0,
                name:'$_id',
                count:'$count',
            },
        },
    ]).sort({count:-1});
    const all={
        name:'All',
        count:await BookModel.countDocuments(),
    };
    tags.unshift(all);

    res.send(tags);
}))

router.get('/search/:searchTerm',handler(async (req,res)=>{
    const {searchTerm}=req.params;
    const searchRegex=new RegExp(searchTerm,'i');
    const books= await BookModel.find({name:{$regex:searchRegex}});
    res.send(books);
}))

router.get('/tag/:tag',handler(async (req,res)=>{
    const {tag}=req.params;
    const books= await BookModel.find({tags:tag});
    res.send(books);
}))

router.get('/:bookId',handler(async (req,res)=>{
    const {bookId}=req.params;
    const book= await BookModel.findById(bookId)
    res.send(book)
}))



export default router;