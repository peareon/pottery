const express = require("express");
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mailchimpClient = require('@mailchimp/mailchimp_transactional')('41c17aa84f65aea434d97184b7a6481e-us21')
// 0911d8ea5301c6dd3066645620b1a564-us21

  

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))


app.get("/", function(req, res){
    res.render("index");
    const mailchimpTx = require("@mailchimp/mailchimp_transactional")("41c17aa84f65aea434d97184b7a6481e-us21");

    async function run() {
        const response = await mailchimpTx.users.ping();
        console.log(response);
    }

    run();
})

app.get("/Colba", function(req, res){
    res.render("Colba")
})

app.get("/Solstego", function(req, res){
    res.render("Solstego")
})

app.post("/", function(req, res){
    var email = req.body.email
    
    // const run = async () => {
    //     const response = await mailchimpClient.allowlists.add({
    //       email: email
    //     });
    //     console.log(response);
    //   };
      
    //   run();
})

app.listen(3000, function(req, res){
    console.log("uhu")
})



// ccfe4c41639f35423a144b01158e38da-us21
// dc2b35dac0