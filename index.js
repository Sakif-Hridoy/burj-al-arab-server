const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://arabian:arabianHorse55@cluster0.djg6r.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = 5000;
const app = express()

app.use(cors());
app.use(bodyParser.json());

client.connect(err => {
  const collection = client.db("burjAlArab").collection("bookings");
  // perform actions on the collection object
  console.log("database connected successfully")
  client.close();
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/addBooking',(req,res)=>{
  const newBooking = req.body;
  console.log(newBooking);

})