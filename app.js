const express = require('express');
const User = require('./db/User');
const Product = require('./db/Product');
const cors = require('cors')

const app = express();
require('./db/config')
app.use(express.json())
app.use(cors())

const Jwt = require('jsonwebtoken');
const jwtKey ='e-commerce';
// signup
app.post('/register',async(req,resp)=>{
    const user  = new User(req.body)
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},jwtKey,{expiresIn:'4h'},(error,token)=>{
        if(error){
            resp.send({result : 'Something went wrong'})
        }
        else{
            resp.send({result,auth : token});
        }
    })  
})
// login
app.post('/login',async(req,resp)=>{
    let user = await User.find(req.body).select('-password');
   if(req.body.email && req.body.password){
    if(user.length > 0)
    {
        Jwt.sign({user},jwtKey,{expiresIn:'4h'},(error,token)=>{
            if(error){
                resp.send({result : 'user not found'})
            }
            else{
                resp.send({user,auth : token});
            }
        })   
        
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


// Get single product by id
app.get('/getProductById/:id', async(req,resp)  =>{
    let request =await Product.find({_id:req.params.id})
    resp.send(request);

})  

// updata api

app.put('/update/:id',async(req,res)=>{
    console.log(req.body)
    let request = await Product.updateOne(
        {_id : req.params.id},
        {$set:req.body}
    )
    res.send(request);
})


// Search API

app.get("/search/:key",async(req,resp)=>{
    let result = await Product.find({
        "$or":[
            {name : {$regex:req.params.key} },
            {company : {$regex:req.params.key} },
            {category : {$regex:req.params.key} },
        ]
    })
    if(result.length>0){
        resp.send(result);
    }
    else{
        resp.send({result : "no result found"})
    }
})