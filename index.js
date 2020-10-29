const express = require('express') 
const app = express() 
const redis = require("redis");
const client = redis.createClient({
            port: 18059, 
            // replace with your port 
            host : 'redis-18059.c212.ap-south-1-1.ec2.cloud.redislabs.com', 
            // replace with your hostanme or IP address 
            password : '2aaJidSJfCgtYadTkTnQfjD46Q4LD3dZ', 
            // replace with your password 
        }) 
        client.on("error", function(error) { console.error(error); });  
        app.get('/data',(req,res)=>{  
            client.get("data",(err,result) => {   
                if(!err && result == null){  
                    setTimeout(() => { 
                        res.json({ data:{data:"asdf"}, err: true })  
                        client.set("data", JSON.stringify({data:"asdf"}))  }, 1000);  
                    } else{ 
                        res.json({ data:JSON.parse(result), err: false })  
                    }})
                })  
        app.get('/delete',(req,res) => {
            client.flushall() 
            res.json({done:true})
        })
        app.listen(3000,()=>{ console.log('listing on 3000')})