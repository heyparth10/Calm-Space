const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const path = require('path');


//import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const blogTypeRoutes = require("./routes/blogTypeRoutes");
const blogRoute = require("./routes/blogRoutes");


//database connection
mongoose.connect(process.env.DATABASE, {
    // useNewUrlParser: true,
    // useCreateIndex: true,   
    // useUnifiedTopology: true,
    // useFindAndModify: false
}).then(() => console.log("DB Connected"))
.catch(err => console.log("DB Connection Error: ", err));

//Middleware 
// if (process.env.NODE_ENV === 'development') { 
app.use(morgan('dev'));
// }
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser()); //for authentication
app.use(cors()); //to make request to backend

//ROUTES MIDDLEWARE
// app.get("/", (req, res) => {
//     res.send("Hello from Node Js");
// });
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', blogTypeRoutes);
app.use('/api', blogRoute);

//Bonus
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')))
    
    app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
    
} else {    
    app.get('*', (req, res) => {
        res.send('API is running....')
    })
}

//error middleware
app.use(errorHandler)

//port
const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});