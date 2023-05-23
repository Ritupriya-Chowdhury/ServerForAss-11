const express = require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 1824;


app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vkhsa2w.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    

const AllToys=client.db('MangaAnime').collection('allToys');
const AddAToyCollection=client.db('MangaAnimeClient').collection('addAToy');



app.get('/all',async(req,res)=>{
  const cursor=AllToys.find();
  const result=await cursor.toArray();
  res.send(result);
      
})

app.get('/all/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id: new ObjectId(id)}
  const result=await AllToys.findOne(query);
  res.send(result);
})

// app.get('/all/:name',async(req,res)=>{

//   const name=req.params.name;
//    const query={name:name}
//    const result= await AllToys.findOne(query);
//    res.send(result);
//  })


const allt=client.db('categoryAll').collection('all');
app.get('/category',async(req,res)=>{
  const cursor=allt.find();
  const result=await cursor.toArray();
  res.send(result);
      
})

app.get('/category/:category',async(req,res)=>{

 const id=req.params.category;
  const query={category:id}
  const cursor= allt.find(query);
  const result=await cursor.toArray();
  res.send(result);
})

app.get('/category/:category/:id',async(req,res)=>{
  const id=req.params.id;
  console.log(id);
  const query={_id: new ObjectId(id)}
  const result=await allt.findOne(query);
  res.send(result);
})


app.get('/addAToy',async(req,res)=>{
  const result=await AddAToyCollection.find().toArray();
 
  res.send(result);
})
app.get('/addAToyID',async(req,res)=>{
  const result=await AddAToyCollection.find().toArray();
 
  res.send(result);
})

app.get('/addAToy/:email',async(req,res)=>{

  const id=req.params.email;
  const query={email:id}
  
   const cursor= AddAToyCollection.find(query);
   const result=await cursor.toArray();
   res.send(result);
 })
 app.get('/addAToyID/:id',async(req,res)=>{

  const id=req.params.id;
  const query={_id: new ObjectId(id)}
   const result= AddAToyCollection.findOne(query);
 
   res.send(result);
 })


// Include Add a toy
 app.post('/addAToy',async(req,res)=>{
  const addAToy=req.body;
  console.log(addAToy);
  const result=await  AddAToyCollection.insertOne(addAToy);
  res.send(result);
});


 app.delete('/addAToy/:id',async(req,res)=>{
  const id=req.params.id;
  const query={ _id :new ObjectId(id)}
  const result=await AddAToyCollection.deleteOne(query);
  res.send(result);
 });


//  app.put('/addAToy/:id',async(req,res)=>{
//   const id=req.params.id;
//   const query={_id:new ObjectId(id)}
//   const updateToys=req.body;
//  })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Manga Anime Shop Server Running')
})

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`)
})