const express = require('express');
const User = require('./db/User');
const cors = require('cors')
const app = express();
require('./db/config')
app.use(express.json())
app.use(cors())
app.post('/register',async(req,resp)=>{
    const user  = new User(req.body)
    const result = await user.save();
    resp.send(result)
})
app.listen(5000)



