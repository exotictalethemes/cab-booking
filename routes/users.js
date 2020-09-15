import express from "express"
import database from "../database.js"

const router = express.Router()

/**
 * @swagger
 *  /users:
 *   get:
 *     description : get all users registered
 *     responses:
 *        "200" :
 *           description : A successful response
 * 
 */

//pagination available using limit and skip
router.get('/',(req,res)=> {
    console.log("showing all users");
    let queryobj = {}
    if(req.query){
        if(req.query.limit){
            queryobj.limit = parseInt(req.query.limit, 10);
        }else if(req.query.skip){
            queryobj.offset = parseInt(req.query.skip, 10);
        }
    }else{
        queryobj.limit = 50 //by default limit to 10
    }

    database.getAllUsers(queryobj,res)   
})

 
router.post('/',(req,res) => {
    console.log("new user request");
        let user = req.body
        console.log(user);
        if(req.body.name && req.body.email  && req.body.password){
            database.createUser(user.name,user.email,user.password,res)
        }else{
            res.status(400).send("invaild 'name' or 'email' or 'password'")
        } 
        
})

router.get('/:id',(req,res)=> {
    console.log("get user by id");
    const { id } = req.params
    database.getById(id,res)
})


router.delete('/:id',(req,res)=> {
    console.log("delete user by id");
    const {id} = req.params
    database.deleteById(id,res)
})

router.patch('/:id',(req,res)=> {

    if(req.body.name && req.body.email  && req.body.password){
        console.log("updating user");
        const { id } = req.params
        const { name , email , password} = req.body
        let tempObj = {}
        if(name){   tempObj.name = name}
        if(email){  tempObj.email = email}
        if(password){ tempObj.password = password}
        database.patchById(id,tempObj,res)
    }else{
        res.status(400).send("missing 'name' or 'email' or 'password'")
    } 


})

router.all('/*',(req,res) => {
    res.status(400).send("only /users available")
})

 

export default router





/*
router.get('/',(req,res)=> {
    console.log("showing users");
    database.getAllUsers(res)
})

router.post('/',(req,res) => {
    console.log("new user request");
        let user = req.body
        if(!user.name || !user.email || !user.password ){
            res.send("please specify all required fields \n"+
                "which are name,email and password")
        }else{
            database.createUser(user.name,user.email,user.password,res)
        } 
        
})

router.get('/:id',(req,res)=> {
    console.log("get user by id");
    const { id } = req.params
    database.getById(id,res)
})


router.delete('/:id',(req,res)=> {
    console.log("delete user by id");
    const {id} = req.params
    database.deleteById(id,res)
})

router.patch('/:id',(req,res)=> {
    console.log("updating user");
    const {id} = req.params
    const { name , email , password} = req.body
    let tempObj = {}
    if(name){   tempObj.name = name}
    if(email){  tempObj.email = email}
    if(password){   tempObj.password = password}
    database.patchById(id,tempObj,res)
})

router.all('/*',(req,res) => {
    res.status(400).send("only /users available")
})

*/

















