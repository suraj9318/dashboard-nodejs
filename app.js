const express = require('express');
const User = require('./db/User');
const cors = require('cors')
const app = express();
require('./db/config')
app.use(express.json())
app.use(cors())
app.post('/register',async(req,resp)=>{
    const user  = new User(req.body)
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result)
})

app.post('/login',async(req,resp)=>{
    let user = await User.find(req.body).select('-password');
   if(req.body.email && req.body.password){
    if(user.length > 0)
    {
        resp.send(user);
    }
    else{
         resp.send({result : 'user not found'})
    }
   }
   else{
    resp.send({result : 'user not found'})
}
    
})
app.listen(5000)



