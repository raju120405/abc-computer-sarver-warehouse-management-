const express = require('express');
const app = express();
var cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 5000;



const { MongoClient, ServerApiVersion } = require('mongodb');
const res = require('express/lib/response');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cavll.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
      await client.connect();
      console.log('db connect')
        const productCollection = client.db("abcComputer").collection('products');

        app.get('/products', async(req, res)=>{
            const query = {}
            const cursor = productCollection.find(query);
            const product = await cursor.toArray();
            res.send(product)
        })

        app.post("/login",(req,res)=>{
            const email = req.body;
            console.log(email)

        })

      app.post('/uploadPd',async(req,res)=>{
          const product = req.body;
          console.log(product)
          const result = await productCollection.insertOne(product);
          res.send({success:"product upload success"})

      })
    
    } finally {
      
    }
  }
  run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('running my node abc computer server')
});

app.listen(port,()=>{
    console.log('abc computer server is running');
})