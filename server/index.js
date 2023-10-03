const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
const Port = process.env.Port || 8081;

app.use('/api/User' , require('./Routes/User'));
app.use('/api/Product' , require('./Routes/Product'));
app.use('/api/Order' , require('./Routes/Order'));

connectToMongo();
app.listen(Port, () => console.log("Server is running"));