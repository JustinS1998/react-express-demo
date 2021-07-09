const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server" });
});

const dotenv = require("dotenv");
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const connectionString = `mongodb+srv://${username}:${password}@cluster0.drkd2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
app.post("/message", (req, res) => {
    console.log('Got a POST request');
    console.log(req.body);
    MongoClient.connect(connectionString, { useUnifiedTopology: true })
        .then((client) => {
            // console.log('Connected to database');
            const db = client.db('test');
            const testCollection = db.collection('testCollection');
            testCollection.insertOne(req.body, (err, myRes) => {
                if (err) throw err;
                console.log("item inserted");
                res.send("item inserted");
            });
        })
        .catch((error) => console.error(error));
})

app.get("/message", (req, res) => {
    MongoClient.connect(connectionString, { useUnifiedTopology: true })
        .then((client) => {
            // console.log('Connected to database');
            const db = client.db('test');
            const testCollection = db.collection('testCollection');
            testCollection.find({}).toArray((err, result) => {
                if (err) throw err;
                res.send(result);
            });
        })
        .catch((error) => console.error(error));
});

app.delete("/message", (req, res) => {
    console.log("Got a DELETE request");
    MongoClient.connect(connectionString, { useUnifiedTopology: true })
        .then((client) => {
            const db = client.db('test');
            const testCollection = db.collection('testCollection');
            testCollection.deleteOne(req.body, (err, obj) => {
                if (err) throw err;
                res.send("1 item deleted");
            })
        })
        .catch((error) => console.error(error));
});

