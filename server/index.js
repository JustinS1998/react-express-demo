const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
    res.json({message: "Hello from server"});
});

const MongoClient = require('mongodb').MongoClient;
const username = 'admin';
const password = '8uEUQySVIJkTNB9T';
const connectionString = `mongodb+srv://${username}:${password}@cluster0.drkd2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
app.post("/message", (req, res) => {
    console.log('Got a POST request');
    console.log(req.body);
    MongoClient.connect(connectionString, {useUnifiedTopology:true})
    .then((client) => {
        console.log('Connected to database');
        const db = client.db('test');
        const testCollection = db.collection('testCollection');
        testCollection.insertOne(req.body);
    })
    .catch((error) => console.error(error));
})