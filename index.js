require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const connectDB = require("./DB/mongodb");
const port = process.env.PORT || 5222;
const app = express();



app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server is running in vartion 1.2')
})



connectDB().then((collections) => {
  const blog = require("./src/blog")(collections);
  const comment = require("./src/comment")(collections);
  const love = require("./src/love")(collections);
  const user = require("./src/user")(collections);
  

  app.use(blog);
  app.use(comment);
  app.use(love);
  app.use(user);

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

