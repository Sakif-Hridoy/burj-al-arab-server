const express = require('express')
const app = express()
const port = 5000


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://arabian:arabianHorse55@cluster0.djg6r.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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