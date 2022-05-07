const express = require('express');
const app = express();
var cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 5000;



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cavll.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
      await client.connect();
      console.log('db connect')
      app.post('/uploadPd',async(req,res)=>{
          const product = req.body;
          console.log(product)
      })
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('running my node abc computer server')
});

app.listen(port,()=>{
    console.log('abc computer server is running');
})