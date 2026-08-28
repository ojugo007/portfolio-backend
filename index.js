const express = require("express");
const DB = require("./database/database");
const messageRoute = require("./routes/message.route");
const educationRoute = require("./routes/education.route");
const authRoute = require("./routes/auth.route");
const experienceRoute = require("./routes/experience.route");
const projectRoute = require("./routes/project.route");
const myServiceRoute = require("./routes/myServices.route");
const stackRoute = require("./routes/stack.route");
const testimonialRoute = require("./routes/testimonial.route");
require("dotenv").config()
const cors = require("cors");


const app = express()
DB.connectDB()

// body parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// cors
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://your-portfolio.com"
    ]
}));

// add rate limiter
app.use("/auth", authRoute)
app.use("/message", messageRoute)
app.use("/edu", educationRoute)
app.use("/experience", experienceRoute)
app.use("/project", projectRoute)
app.use("/service", myServiceRoute)
app.use("/stack", stackRoute)
app.use("/testimonial", testimonialRoute)


const PORT = process.env.PORT
app.get('/', (req, res)=>{
    res.send("we are live than ever")
})
app.use((error, req, res, next)=>{
    console.log(req.path)
    console.log(error)
    const statusCode = error.status || 500;
    const message = error.message || "internal server error"
    res.status(statusCode).json({
        code : statusCode,
        message
    })
})
app.listen(PORT||3000, ()=>{
    console.log(`app is listening on http://localhost:${PORT}`)
})
