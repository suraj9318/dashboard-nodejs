const express = require('express');
const User = require('./db/User');
const Product = require('./db/Product');
const cors = require('cors')
const app = express();
require('./db/config')
app.use(express.json())
app.use(cors())

// signup
app.post('/register',async(req,resp)=>{
    const user  = new User(req.body)
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result)
})
// login
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

// add Product
app.post('/add-product', async(req,resp)=>{
    if(req.body.name !== undefined && req.body.price !== undefined && req.body.category !== undefined && req.body.company !== undefined && req.body.userId !== undefined){
    let data = new Product(req.body)
    let result = await data.save();
    resp.send(result);
    }
    else{
        resp.send({result : 'bad request'})
    }
})

// get all products
app.get('/get-products',async(req,resp)=>{
    let request = await Product.find();
    if(request.length>0){
        resp.send(request);
    }
    else{
        resp.send({response : 'no data found'})
    }
})


// delete product 
app.delete('/delete-product/:_id',async(req,resp)=>{
    let request = await Product.deleteOne(req.params)
    resp.send(request)
})
app.listen(5000)



