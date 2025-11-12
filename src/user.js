const express = require("express");
const router = express.Router();

module.exports = (collections) => {
    const { User, Blog } = collections;

    // post user data (name email)
    app.post('/userData', async (req, res) => {
      const addatas = req.body;
      console.log('All userData-------------', addatas);

      try {
        const result = await userDataCollection.insertOne(addatas);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.send(result);
      } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send({ message: 'Error inserting data' });
      }
    });

    return router;
};
