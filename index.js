require('express-async-errors');
const express = require("express");
const winston = require("winston");
const app  = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const book = require("./routes/book");
const user = require("./routes/user");
const error = require("./middleware/error");

process.on('uncaughtException',(ex)=>{
    winston.error(ex.message,ex);
    process.exit(1);
   })
   
process.on('unhandledRejection',(ex)=>{
     winston.error(ex.message,ex);
     process.exit(1);
})

winston.add(new winston.transports.File({filename:'logFile.log'}));

app.use(cors());
app.use(express.json());
app.use('/', user);
app.use('/book', book);
app.use(error);

const server = app.listen(5000, ()=> console.log("listening to port 3000"));

module.exports = server;