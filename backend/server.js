import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import cors from 'cors';


dotenv.config() 
const app = express()
const port = 3000
app.use(express.json());
app.use(cors());

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'KeyVault';

await client.connect();

app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const results = await collection.find({}).toArray();
  res.json(results);
})

app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.insertOne(password);
  res.send({success : true, result : result});
})
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.deleteOne(password)
  res.send({success : true, result : result});
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
