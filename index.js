const express = require('express')
const { initializeApp } = require('firebase-admin/app');
require('dotenv').config();
// import { getAuth} from "firebase/auth";

// const auth = getAuth(firebaseApp);
// onAuthStateChanged(auth, user => {
//   // Check for user status arabianHorse55
// });
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.djg6r.mongodb.net/burjAlArab?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(process.env.DB_USER)
const port = 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());


var admin = require("firebase-admin");
// generate key from service account of firebase and and this file to project directory and rewrite the path name pf serviceAccount var
var serviceAccount = require("./configs/burj-al-arab-8f7bc-firebase-adminsdk-sh6ky-e57a07ce1d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRE_DB
});



client.connect(err => {
  const bookings = client.db("burjAlArab").collection("bookings");
  // perform actions on the collection object
  // console.log("database connected successfully")
  app.post('/addBooking', (req, res) => {
    const newBooking = req.body;
    bookings.insertOne(newBooking)
      .then(result => {
        res.send(result.insertedCount > 0);
      })
    console.log(newBooking);

  })


  app.get('/bookings', (req, res) => {
    // console.log(req.query.email);
    const bearer = req.headers.authorization;
    if (bearer && bearer.startsWith('Bearer ')) {
      const idToken = bearer.split(' ')[1];
      console.log({ idToken });
      // idToken comes from the client app
      admin.auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
          const tokenEmail = decodedToken.email;
          const queryEmail = req.query.email;
          console.log(tokenEmail,queryEmail);
          if (tokenEmail == req.query.email) {
            // access user data api via email
            bookings.find({ email: req.query.email })
              .toArray((err, documents) => {
                res.status(200).send(documents)
              })
          }
          console.log("uid", uid);
          // ...
        })
        .catch((error) => {
          // res.status(401).send('unauthorized access');
        });
    }
    else{
      res.status(401).send('unauthorized access');
    }
    



  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
