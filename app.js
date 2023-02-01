const express = require('express')
const app = express();

app.get('/',(req,resp)=>{
    resp.send('project started...')
})
app.listen(5000)