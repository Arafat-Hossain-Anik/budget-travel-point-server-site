const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vsocy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.weuxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);
async function run() {
    try {
        await client.connect();
        const database = client.db('travel-point');
        const serviceCollection = database.collection('places');
        const myOrderCollection = database.collection('usersBooking');
        console.log('database connected');
        // inserting data 
        app.get('/places', async (req, res) => {
            const result = await serviceCollection.insertMany(places);
            console.log(`${result.insertedCount} documents were inserted`);
            res.send('Travel server is running');
        })
        // getting from database 
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({})
            const services = await cursor.toArray();
            res.send(services)
        });
    }
    finally {

    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Travel server is running');
})

app.listen(port, () => {
    console.log("server is running", port);
})