const PORT=5555
const express=require('express');
const connect = require('./Config/db.config');
const router=require('./router')
const cors=require('cors')
require('dotenv').config()
const app=express();
app.use(cors())
app.use(express.json())
app.use('/',router);
(async () => {
    await connect()
    app.listen(PORT, () => {

        console.log("Connected at " + PORT)
    })
})();