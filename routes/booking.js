import express from "express"
import database from "../database.js"

const router = express.Router()

router.post('/:id',(req,res)=> {
    console.log("book cabe");
    if(req.body.from && req.body.to){
        const {id} = req.params
        const { from , to } = req.body
        let obj = {}
        obj.from = from
        obj.to = to
        database.book(id,obj,res)
    }else{
        res.status(400).send("missing 'from' or 'to'")
    }

})

//pagination available using limit and skip
router.get('/:id',(req,res) => {
    //console.log(req.params);
    //console.log(req.query);
    console.log("get bookings done by user");
    const {id} = req.params
    let queryobj = {}
    if(req.query){
        if(req.query.limit){
            queryobj.limit = parseInt(req.query.limit, 10);
        }
        if(req.query.skip){
            queryobj.offset = parseInt(req.query.skip, 10);
        }
    }else{
        queryobj.limit = 50 //by default limit to 10
    }

    database.getAllBookingsForUser(id,queryobj,res)

})

router.all('/*',(req,res) => {
    res.status(400).send("only /booking available")
})



 


export default router



/*

router.post('/:id',(req,res)=> {
    console.log("book cabe");
    const { id } = req.params
    const { from , to } = req.body
    let obj = {}
    obj.from = from
    obj.to = to
    database.book(id,obj,res)
})

 
router.get('/:id',(req,res) => {
    console.log("get bookings done by user");
    const { id } = req.params
    database.getAllBookingsForUser(id,res)
})

router.get('/*',(req,res) => {
    res.status(204).send("nothing there")
})


*/