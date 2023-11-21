const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");


const app = express();
app.use(cors());
const Port = 8080;

app.use('/api/User' , require('./Routes/User'));
app.use('/api/UserAudit' , require('./Routes/UserAudit'));
app.use('/api/Books' , require('./Routes/Books'));
app.use('/api/BookAudit' , require('./Routes/BooksAudit'));
app.use('/api/Category' , require('./Routes/Category'));
app.use('/api/RentBook' , require('./Routes/RentBook'));
app.use('/api/Reserved' , require('./Routes/Reserved'));
// app.use('/api/Order' , require('./Routes/Order'));

connectToMongo();
app.listen(Port, () => console.log("Server is running"));