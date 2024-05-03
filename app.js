const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https = require("https");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname; 
    const email=req.body.email;

    const data = {
        members: [
           {
            email_address: email,
            status: "subscribed",
            merge_fields: {
               FNAME: firstName,
               LNAME:lastName,
            }
           }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url="https://us8.api.mailchimp.com/3.0/lists/2359b28157";

    const options = {
        method: "POST",
        auth: "aman:2d1b77acb9f3f3d26a33d59bb06f4a53-us8"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT || 3000 ,function(){
    console.log("server is running on port 3000");
});
