const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");


module.exports = (collections) => {
    const { User, Blog } = collections;

    // post watchLists data
    router.post('/post-watchLists', async (req, res) => {
        const addatas = req.body;
        console.log('All watchLists-------------', addatas);

        try {
            const result = await wicCollection.insertOne(addatas);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.send(result);
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).send({ message: 'Error inserting data' });
        }
    });

    // gat watchLists data
    router.post('/get-watchlists', async (req, res) => {
        const sendEmail = req.body.email;
        try {
            const cursor = wicCollection.find({ userEmail: sendEmail });
            const arraydata = await cursor.toArray();
            // const result = arraydata.filter(user => user.userEmail === sendEmail );
            res.send(arraydata);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send({ message: `Internal Server Error ${error}` });
        }
    });

    // delet watchlist
    router.delete('/watchlists/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const result = await wicCollection.deleteOne({ _id: new ObjectId(id) }); // ObjectId ব্যবহার করুন
            console.log("Delete result:", result);

            if (result.deletedCount === 0) {
                console.warn("Data not found for ID:", id);
                return res.status(404).send({ message: "Data not found" });
            }

            res.status(200).send({ message: "Deleted successfully" });
        } catch (error) {
            console.error("Error deleting data:", error);
            res.status(500).send({ message: "Error deleting data" });
        }
    });

    return router;
};
