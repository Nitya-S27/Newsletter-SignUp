//jshint esversion:6

const express = require("express")

const bodyParser = require("body-parser")

const https = require("https")

const app = express()

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))

app.get("/" , function (req , res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/" , function (req , res) {
    
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.Email;
    //var password = req.body.Password;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/b6315e7eb4"

    const options = {
        method: "POST",
        auth: "nitya:aed7eeb0aff9a4549a303b7b11c23e47-us6"
    }

    const request = https.request(url , options , function (response) {
        response.on("data" , function (data) {
            console.log(JSON.parse(data));
        })

        if (response.statusCode  === 200) {
             res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }
    })

    request.write(jsonData)
    request.end()

})

// app.post("/failure" , function (req , res) {
//     res.sendFile(__dirname + "/signup.html")
// })

// app.post("/success" , function (req , res) {
//     res.sendFile(__dirname + "/signup.html")
// })

app.listen(process.env.PORT || 3000 , function (req , res) {
    console.log("The server is linked to port 3000.");
})

//API key
//aed7eeb0aff9a4549a303b7b11c23e47-us6

//List Id
//b6315e7eb4