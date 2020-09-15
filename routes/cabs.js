import express from "express"
import database from "../database.js"

const router = express.Router()



router.get('/:id',(req,res)=> {
    console.log("get nearby cabs")
    const {id} = req.params
    let limit = 5
    if(req.query.limit){
        limit = req.query.limit
    }
    if(req.query.currentCity){
        const {currentCity} = req.query
        database.getNearby(true,id,currentCity,limit,res) 
    }else if(req.query.longitude && req.query.latitude){
        const {longitude,latitude} = req.query
        database.getNearby(false,id,{longitude : longitude, latitude: latitude},limit,res) 
    }else{
        res.status(400).send("missing currentCity")
    }  
})

 

router.all('/*',(req,res) => {
    res.status(400).send("only path '/cabs' available")
})


export default router




/*
router.get('/:id',(req,res)=> {
    console.log("get nearby cabs");
    const { id } = req.params
    const { currentCity} = req.body
    database.getNearby(id,currentCity,res)   
})

 */