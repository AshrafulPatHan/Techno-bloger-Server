const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URL

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        
        const db = client.db("Pathan-Blogger");
        return {
            User: db.collection('User'),
            Admin: db.collection('Admin'),
            Blog: db.collection('Blog'),
        };
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
  } catch(error) {
    // Ensures that the client will close when you finish/error
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}


module.exports = connectDB;
