require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const https = require("https");
const { url } = require('inspector');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);


mongoose.connect("mongodb://localhost:27017/ceramica")

const pieceSchema = {
   nombre: String,
   cantidad: Number,
   precio: Number,
   image: String
}

const Piece = mongoose.model("piece", pieceSchema)


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static("public"))


async function getItems(){

    return await Piece.find({});
  
  }


app.get("/", function(req, res){
    res.render("index");
})

app.get("/Colba", function(req, res){
    res.render("Colba")
})

app.get("/Solstego", function(req, res){
    res.render("Solstego")
})

app.get("/Contacto", function(req, res){
    res.render("Contacto")
})

app.get("/Tienda", function(req, res){

    getItems().then(function(FoundPieces){
        console.log(FoundPieces)
        res.render("Tienda", {newListItems:FoundPieces})
    })
    
})

app.get("/cancel", function(req, res){
    res.render("cancel")
})

app.get("/success", function(req, res){
    res.render("success")
})


app.post("/", function(req, res){
    
    const email = req.body.email


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: "N/A",
                    LNAME: "N/A"
                    }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/dc2b35dac0"
    const options = {
        method: "POST",
        auth: "alex:86e8be7d61f0f9bda150e910d16d495b-us21"
    }

    const request = https.request(url, options, function(reponse){
        reponse.on("data", function(data){
        })
    })

    request.write(jsonData);
    request.end();

    setTimeout(() => res.render("index"), 5500)
    
})

app.post("/payment", async function(req, res){
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], //add paypal
            mode: 'payment',
            line_items: req.body.items.map(item =>{
                return{
                    price_data:{
                        currency: 'usd',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: Number(item.precio) //Convert to cents
                    },
                    quantity: item.amount
                }
            }),
            success_url: `${process.env.SERVER_URL}/success`,
            cancel_url: `${process.env.SERVER_URL}/cancel`
        })
        console.log(url)
        res.json({url: session.url})
    }
    catch(e){
        res.status(500).json({error: e.message});
    }   
})


app.post("/Contacto", function(req, res){
    
    const email = req.body.cemail


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: "CONTACTO",
                    LNAME: "N/A"
                    }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/dc2b35dac0"
    const options = {
        method: "POST",
        auth: "alex:86e8be7d61f0f9bda150e910d16d495b-us21"
    }

    const request = https.request(url, options, function(reponse){
        reponse.on("data", function(data){
        })
    })

    request.write(jsonData);
    request.end();

    setTimeout(() => res.render("index"), 5500)
    
})

app.listen(3000, function(req, res){
    console.log("uhu")
})

