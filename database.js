import Sequelize  from "sequelize"
import { v4 as uuidv4 } from 'uuid'
import cabs from "./cabsLocation.js"
import config from "./config/config.json"

var database = {}

const sequelize = new Sequelize(`${config.development.dialect}://${config.development.username}:${config.development.password}@${config.development.host}:3306/${config.development.database}`)

const user = sequelize.define('users',{
    id: { type: Sequelize.UUID,defaultValue: Sequelize.UUIDV4 , primaryKey: true},
    name : { type : Sequelize.STRING, allowNull : false },
    email : {type : Sequelize.STRING, allowNull : false },
    password : {type : Sequelize.STRING, allowNull : false },
},{
    timestamps: false
  }
);

const bookings = sequelize.define('bookings',{
    id: { type: Sequelize.INTEGER , autoIncrement: true, primaryKey: true},
    userid : { type: Sequelize.UUID, allowNull : false ,primaryKey: false},
    to : { type : Sequelize.STRING, allowNull : false },
    from : { type : Sequelize.STRING, allowNull : false },
},{
    timestamps: false
  }
)

database.connectDB = function () {
    console.log("connecting to db");
    sequelize
    .authenticate()
    .then(()=> {
        console.log("db connection success!");
        sequelize.sync()
        //sequelize.sync({ force: true })
    })
    .catch(err => {
        console.log(err);
        connectDB()
    })
}

database.getAllUsers = function (queryobj,res) {
    queryobj.attributes = ['id','name', 'email']
    user.findAll( queryobj )
        .then(data => {
        if(data === null){
            console.log("no users found");
            res.send("no users found")
        }else{
            if(data.length == 0 ){
                res.send("there are currently no users")
            }
            else{
                res.send(data) 
            }
        }
        })
}


database.createUser = function(name, email,password,res) {
                    user.findOne({ where: { email: email } })
                    .then(queryemail => {
                    if (queryemail === null) {
                    let id = uuidv4()
                    const newUser = user.build({id : id ,name: name , email : email , password : password})
                    newUser.save()
                    .then(resp => {
                         //console.log(resp);
                        let text ="\nnote down your id as it will be required to use other apis"
                        res.send("your id is : "+resp.id + text )
                    })
                    .catch(err => {
                         console.error(err);
                         console.log("try after sometime : insert error")
                         res.status(500).end()
                     })                
                } else {
                        //console.log(queryemail);
                        res.send("email already used")
                        }
})
} 


database.getById = function(id,res) {
    user.findOne({ where: { id  : id } })
    .then(qid => {
    if (qid === null) {
        res.status(404).send("User not found")          
    } else {
        //console.log(queryemail);
        res.send(qid)
        }
    })
    .catch(err => {
        console.error(err);
        console.log("try after sometime : error in getById")
        res.status(500).end()
    })

}

database.deleteById = function (id,res) {
    user.findOne({ where: { id  : id } })
    .then(qid => {
    if (qid === null) {
        res.status(404).send("no such user with that id exist")          
    } else {
        user.destroy({
            where: {
                id : id
            }
        })
        .then(dbres => {
            console.log(dbres);
            res.send("user with id "+id+" deleted")
        })
        .catch(err => {
            console.log(err);
            console.log("error deleting user with id "+id) 
            res.status(500).end()
        })
        }
    })


}

database.patchById= function(id,updateobj,res){
    user.findOne({ where: { id: id } }).then(qid => {
        if(qid === null){
            res.status(400).send("please register first")
        }else{
            user.update(updateobj,{
                where : {
                    id : id
                }
            }).then(dbres => {
                res.send("updated details for id "+id)
            }).catch(err=> {
                console.log("error patching for id "+id)
                res.status(500).end()
            })
        }})

}

database.book = function (id,obj,res) {
    user.findOne({ where: { id: id } }).then(qid => {
        if(qid === null){
            res.status(400).send("please register first")
        }else{
            //booking
            obj.userid = id
            console.log(obj);
            const newbooking = bookings.build(obj)
            newbooking.save()
            .then(resp => {
                res.send("booking done! from "+obj.from+ " to "+obj.to +" for id "+ id)
            })
            .catch(err => {
                console.log(err)
                console.log("booking error for "+obj.from+ " to "+obj.to +" for id "+ id)
                res.status(500).end()
              
            })

        }})
        .catch(err => {
            console.log("error in book");
            console.error(err);
        }) 
}

database.getAllBookings = function (res) {
    bookings.findAll({  attributes: ['from','to']})
        .then(data => {
            console.log("data length"+data.length);
        if(data === null){
            res.send("no bookings found ")
        }else{
            if(data.length == 0){
                res.send("no bookings done yet ")
            }else{
                res.send(data) 
            }
            
        }
        }).catch(err => {
            console.log("error in getAllBookings");
            console.error(err);
            res.status(500).end()
        }) 
}
 
database.getAllBookingsForUser = function (userid,queryobj,res) {
    user.findOne({ where: { id  : userid } })
    .then(qid => {
        if (qid === null) {
            res.send("no user with id "+userid)           
        } else {
            queryobj.where = { userid  : userid }
            queryobj.attributes = ['from','to']
            bookings.findAll(queryobj)
            .then(data => {
            if(data === null){
                res.send("no bookings done by user with id "+userid)
            }else{
                if(data.length == 0){
                    if(queryobj.offset){
                        res.send("no more.. you may reset skip")
                    }
                }else{
                    res.send(data) 
                } 
            }
            }).catch(err => {
                res.status(500).end()
                console.log("error in getAllBookings for user with id "+userid);
                console.error(err);
            })             
        }})

}

import WorldCities from "worldcities"
import distFrom from "distance-from"

database.getNearby = function (isCity,userid,cityOrObj,limit,res) {
    user.findOne({ where: { id  : userid } })
    .then(qid => {
    if (qid === null) {
        res.send("no user with id "+userid)           
    } else {

        let userlatitude = null
        let userlongitude =null

        if(isCity){
            const city = WorldCities.getByName(cityOrObj)
            if(city){
                userlatitude = city.latitude
                userlongitude =city.longitude
            }else{
                res.status(400).send("please recheck city name")
            }

        }else{
            userlatitude = cityOrObj.latitude
            userlongitude =cityOrObj.longitude
        }
        
            let calData = []

            for (let i = 0; i < cabs.data.length; i++) {
                const cabData = cabs.data[i]
                let cabLocation = cabData[0]
                let cablatitude = cabData[1]
                let cablongitude = cabData[2]

                let distance = distFrom([userlatitude,userlongitude]).to([cablatitude,cablongitude]).in('km');

                console.log(distance+" km from " + cabLocation);

                calData.push(["cab nearby in "+cabLocation ,(~~distance)])
            }

            calData.sort((a,b)=> {return a[1]-b[1]})
            calData.length=limit
            console.log("shortest 5")
            console.log(calData)
            for (let i = 0; i < calData.length; i++) {
                 calData[i][1]= calData[i][1] + " km"
                
            }

            res.send(calData)
 
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).end()
    })
}



export default database


