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

const places = [
    {
        "id": 1,
        "name": "Cox’s Bazar",
        "description": "Spilling out into the Bay of Bengal is Cox’s Bazar, an area covered in salty fishing skiffs and bustling jetties.This little town in the far south-east of Bangladesh is known for its stunning beach which stretches for an amazing 120 kilometers from north to south along the side of the balmy Indian Ocean.",
        "time": "5 Days & 6 Nights",
        "rating": 5,
        "price": 1610,
        "img": "https://cdn.thecrazytourist.com/wp-content/uploads/2017/03/Cox%E2%80%99s-Bazar-scaled.jpg"
    },
    {
        "id": 2,
        "name": "The Sundarbans",
        "description": "The Sundarbans are located at the point where the mighty waterways of the Brahmaputra and the scared Ganges crash into each other at the edge of the Bay of Bengal.As you would expect, the area is also covered in spectacular wildlife and is a UNESCO World Heritage Site.Here you will find Bengal tigers stalking the mangroves as well as rhesus macaques swinging in the canopies.",
        "rating": 5,
        "price": 470,
        "img": "https://cdn.thecrazytourist.com/wp-content/uploads/2017/03/The-Sundarbans.jpg"
    },
    {
        "id": 3,
        "name": "Dhaka",
        "description": "t may seem a world away from the wilds of area like the Sundarbans mangroves but the city of Dhaka offers you a jungle of a different kind.Sprawling along the Buriganga River, Dhaka used to be the home of the British Raj during the colonial period as well as Mughal princes and the likes of Shah Jahan (the architect of the iconic Taj Mahal). Nowadays more than 17 million people call this city home and you can expect temples, churches, mosques monuments, and colorful and aromatic bazaars.",
        "time": "2 Days & 3 Nights",
        "rating": 5,
        "price": 700,
        "img": "https://cdn.thecrazytourist.com/wp-content/uploads/2017/03/Dhaka.jpg"
    },
    {
        "id": 4,
        "name": "Srimangal",
        "description": "Srimangal is the tea-growing capital of Bangladesh and the area is a riot of different hues of green.The area is famous for its rains which help the tea to grow and you will find a sea of different plantations here as you explore the highlands and the hamlets that make up Srimangal.On a trip here make sure to visit a local tea processing plant which will usually include a trip to a tasting house so that you can enjoy a cup of fragrant tea whilst enjoying the views over the rippling fields.",
        "time": "5 Days & 6 Nights",
        "rating": 5,
        "price": 820,
        "img": "https://cdn.thecrazytourist.com/wp-content/uploads/2017/03/Srimangal.jpg"
    },
    {
        "id": 5,
        "name": "Chittagong",
        "description": "Chittagong has a population of 2.5 million which is nothing when you compare it to other cities like Dhaka. That said, this frenetic port town is still worth a visit, particularly if you are traveling to the beautiful Hill Tracts of Bangladesh. These gorgeous trails that include pretty Foy’s Lake are hidden along scenic valleys and Chittagong is widely considered to be the jumping off point if you are planning a trek.",
        "time": "4 Days & 5 Nights",
        "rating": 5,
        "price": 1170,
        "img": "https://cdn.thecrazytourist.com/wp-content/uploads/2017/03/Chittagong-Ship-Breaking-Yard-.jpg"
    },
    {
        "id": 6,
        "name": "Saint Martin",
        "description": "The little enclave of Saint Martin is like nowhere else in Bangladesh as this is the only coral island in the country. The region is covered in shifting sands and lapping seas, all nestled close to coconut groves. In many ways it looks more like the Caribbean than South Asia, and you will find delicious seafood here including fiery curries. Scuba diving is also a popular pastime, so if you want to check out some of the country’s amazing aquatic life then this is the place to do it.",
        "time": "3 Days & 4 Nights",
        "rating": 5,
        "price": 980,
        "img": "https://cdn.thecrazytourist.com/wp-content/uploads/2017/03/Saint-Martin.jpg"
    },
    {
        "id": 7,
        "name": "Kuakata",
        "description": "Kuakata Beach juts out into the Indian Ocean from the southern side of the river islands of central Bangladesh. One of the great reasons to come here is to watch the sunset over the sea with the glowing Sundarbans in the distance.The beach is fringed with tropical palm trees and you will also find small rivers that cut through the land to the Bay of Bengal.",
        "time": "5 Days & 6 Nights",
        "rating": 5,
        "price": 1020,
        "img": "https://cdn.thecrazytourist.com/wp-content/uploads/2017/03/Kuakata.jpg"
    },
    {
        "id": 8,
        "name": "'Sonargaon",
        "description": "Sonargaon used to be a thriving trading hub but now it is something of a ghost town that straddles the Ganges. Here you will find eerie carved mansions and docks, old mosques, and jungle vines twisting in between everything. If you want to see a completely different side of Bangladesh that many people don’t experience, then this is the place to come.",
        "time": "3 Days & 4 Nights",
        "rating": 5,
        "price": 1080,
        "img": "https://cdn.thecrazytourist.com/wp-content/uploads/2017/03/Sonargaon.jpg"
    },
    {
        "id": 9,
        "name": "Barisal",
        "description": "If you were to look at Barisal from above then it would resemble a patchwork of muddy brown and deep green fields.This river town on the Ganges Delta is covered in fields of shrimp farms and rice paddies and if you make it here then be sure to check out the floating markets that sell local vegetables, fruits, and seafood.",
        "rating": 5,
        "price": 980,
        "img": "https://cdn.thecrazytourist.com/wp-content/uploads/2017/03/Barisal.jpg"
    }
];
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