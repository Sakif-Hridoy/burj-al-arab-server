const express = require('express')
const { initializeApp } = require('firebase-admin/app');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://arabian:arabianHorse55@cluster0.djg6r.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = 5000;
const app = express()

app.use(cors());
app.use(bodyParser.json());


// var admin = require("firebase-admin");

// var serviceAccount = require("burj-al-arab-8f7bc-firebase-adminsdk-sh6ky-e57a07ce1d.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://burj-al-arab.firebaseio.com'
// });



client.connect(err => {
  const bookings = client.db("burjAlArab").collection("bookings");
  // perform actions on the collection object
  // console.log("database connected successfully")
  app.post('/addBooking',(req,res)=>{
    const newBooking = req.body;
    bookings.insertOne(newBooking)
    .then(result=>{
      res.send(result.insertedCount > 0);
    })
    console.log(newBooking);
  
  })


  app.get('/bookings',(req,res)=>{
    // console.log(req.query.email);
    console.log(req.headers.authorization)
    bookings.find({email:req.query.email})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
