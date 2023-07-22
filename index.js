require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const https = require("https");
const { url } = require('inspector');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);


mongoose.connect("mongodb://localhost:27017/ceramica");

const pieceSchema = {
   nombre: String,
   cantidad: Number,
   precio: Number,
   image: String
}

const orderSchema = {
    pieza: String,
    cantidad: Number,
    precio: Number,
    total: String,
    add1: String,
    add2: String,
    city: String,
    state: String,
    ZIP: String
 }

const Piece = mongoose.model("piece", pieceSchema);
const Order = mongoose.model("order", orderSchema);


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
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
        res.render("Tienda", {newListItems:FoundPieces})
    })
    
})

app.get("/stockerror", function(req, res){
    console.log(req.headers)
    origin = JSON.stringify(req.headers['sec-fetch-site'])
    res.render("stockerror")
    // if (origin === "cross-site"){
    //     res.render("stockerror")
    // }
    // else{
    //     res.redirect("/")
    // }
    
})



app.get("/success", function(req, res){
    origin = JSON.stringify(req.headers['sec-fetch-site'])
    res.render("success")
    // if (origin === "none"){
    //     res.render("success")
    // }
    // else{
    //     res.redirect("/")
    // }
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


async function handlePaymentIntentSucceeded(data){
    console.log(data)
    console.log(JSON.parse(data))
    console.log(typeof JSON.parse(data))
    await Order.create(JSON.parse(data))

}

const endpointSecret = 'whsec_022bf863d3a61390b6d6654539c533b167df79df95559516480f931636c8c220';


app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(paymentIntent)
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


app.use(express.json())

app.post("/payment", async function(req, res){

    req.body.items.forEach(element => async function() {
        if (!await Piece.find({nombre: element.name, cantidad: {$gte: element.amount}})){
            res.redirect("/cancel");
            console.log("testing")
        }
    });

    try{
        // let items = json.stringify(req.body.items)
        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['MX']
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount:{
                            amount: 0,
                            currency: 'mxn',
                        },
                        display_name: 'Free Shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7
                            },
                        }
                    }
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount:{
                            amount: 50000,
                            currency: 'mxn',
                        },
                        display_name: 'Next Day',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 1
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 1
                            },
                        }
                    }
                }

            ],
            payment_method_types: ['card'], //add paypal
            mode: 'payment',
            payment_intent_data:{
                metadata:{
                    items: JSON.stringify(req.body.items)
                }
            },
            line_items: req.body.items.map(item =>{
                return{
                    price_data:{
                        currency: 'mxn',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: Number(item.precio)*100
                    },
                    quantity: item.amount
                }
            }),
            success_url: `${process.env.SERVER_URL}/success`,
            cancel_url: `${process.env.SERVER_URL}/`
        })
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

