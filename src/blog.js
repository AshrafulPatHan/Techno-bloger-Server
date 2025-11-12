const express = require("express");
const router = express.Router();

module.exports = (collections) => {
    const { User, Blog } = collections;

    // post blog
    app.post('/postblog', async (req, res) => {
        const addata = req.body;
        console.log('All Data-------------', addata);

        try {
            const result = await onerCollection.insertOne(addata);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.send(result);
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).send({ message: 'Error inserting data' });
        }
    });

    // get all blog data
    app.get('/alldata', async (req, res) => {
      try {
        const cursor = onerCollection.find({}).sort({ _id: -1 });
        const result = await cursor.toArray();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(result);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });

    // get resent blog post
    app.get('/limited-data', async (req, res) => {
      const limit = parseInt(req.query.limit) || 4;
      try {
        const cursor = onerCollection.find({}).sort({ _id: -1 }).limit(limit);
        const result = await cursor.toArray();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(result);
      } catch (error) {
        console.error('Error retrieving limited data:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });

    //  Featured Blogs / populer blog
    app.get('/featured-blogs', async (req, res) => {
      const limit = parseInt(req.query.limit) || 10;
      try {
        const cursor = onerCollection.find().limit(limit);
        const result = await cursor.toArray();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(result);
      } catch (error) {
        console.error('Error retrieving limited data:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });

    // update blog data
    app.put('/update/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateData = req.body;

      const updateDoc = {
        $set: {
          Title: updateData.Title,
          shortdescription: updateData.shortdescription,
          longdescription: updateData.longdescription,
          Image: updateData.Image,
          username: updateData.username,
          userEmail: updateData.userEmail,
          category: updateData.category,
        },
      };

      const result = await onerCollection.updateOne(filter, updateDoc, { upsert: true });
      res.send(result);
    });
    

    return router;
};
