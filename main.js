import  express   from "express"
import bodyParser from "body-parser"
import usersRoutes from "./routes/users.js"
import bookingRoutes from "./routes/booking.js"
import cabsRoutes from "./routes/cabs.js"
import database from "./database.js"
import rateLimit from "express-rate-limit"
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swaggerDocs.json"
import cabs from "./cabsLocation.js"

const app = express()
const PORT = 4000
app.use(bodyParser.json())

const swaggerOptions = {
    swaggerDefinition : {
        openai : '3.0.0',
        info : {
            title : "cabs api",
            description : "A user can book a cab , view past booking and can get nearby cabs",
            contact : {
                name : "aanishacharyaa@gmail.com"
            },
            servers : "http://localhost:4000"
        }
    },
    apis: ["./routes/*"]
}

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs,swaggerOptions))
 
const userApiLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 , // limit each IP to 100 requests per windowMs
    message: "Limit reached, please try again after 15 min",
  })
const bookingApiLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300 , // limit each IP to 100 requests per windowMs
    message: "Limit reached, please try again after 15 min",
})

app.use (function (error, req, res, next){
    //Catch json error
    console.log(error);
    res.status(406).send("invalid json request")
})

app.use('/users',userApiLimit,usersRoutes)
app.use('/booking',bookingApiLimit,bookingRoutes)
app.use('/cabs',bookingApiLimit,cabsRoutes)

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Sorry!Something broke!')
})

app.all('/*', (req,res) => {
    res.status(400).send('available end-points are /users, /booking and /cabs')
 })

app.listen(PORT , async () => {
    console.log("up and running on port "+PORT);
    database.connectDB()
    await cabs.getdata()
    console.log("update complete!");
})






