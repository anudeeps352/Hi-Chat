const dotenv=require('dotenv');
dotenv.config();
const express = require("express");
const {chats} = require("./data/data");
const connectDB = require("./config/db");
const app = express();
const userRoutes=require("./routes/userRoutes");
const chatRoutes=require("./routes/chatRoutes");
const messageRoutes=require("./routes/messageRoutes");
const { notFound,errorHandler }=require('./middleware/errorMiddleware');

connectDB();
app.use(express.json()); //for accepting json data

app.get('/', (req, res) => {
    res.send("api is running");
});

app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
app.use("/api/message",messageRoutes)
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT;
app.listen(5000, console.log("Server on 5000"));
