import 'dotenv/config';
import express from 'express'
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const app = express()
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
//   run();


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/api/send-name', async (req, res) => {

  try {
    //   const { studentName, date, keyword } = req.body;

    //   if (!studentName || !date || !keyword) {
    //     return res.status(400).json({ error: 'Missing required fields' });
    //   }

    const db = client.db('cis486');
    const collection = db.collection('dryrun');
    const result = await collection.insertOne({name: 'barry'});

    res.json({ message: 'name recorded', id: result.insertedId });
  } 
  catch (error) {
    console.error('Error creating attendance:', error);
    res.status(500).json({ error: 'Failed to record name' });
  }

});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})