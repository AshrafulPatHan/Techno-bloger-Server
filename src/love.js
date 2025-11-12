const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");


module.exports = (collections) => {
    const { User, Blog } = collections;

    // add user watchLists  👨🏽‍🏫
    router.patch('/post-watchLists', async (req, res) => {
        try {
            // get blog id => id ; and user email => email |
            const { id, email } = req.body;
            if (!id || !email) {
                return res.status(400).send({ message: "❎ All fields are required" })
            }
            console.log('blog id is ', id);

            // check the id is real or fack 🚧
            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ message: '❎ Invalid ID format' });
            }

            // adding watchlist 💝
            const filter = { email: email }; // find the auther
            const addList = { $push: { watchlists: [id] } }; // 😎 push the objectId for blog inside user collection

            const result = await User.updateOne(filter, addList);
            console.log(`💯 A document was inserted with the _id: ${result.insertedId}`);
            res.send(result);
        } catch (error) {
            console.error('⚠️ Error inserting data:', error);
            res.status(500).send({ message: '❎ Error inserting data' });
        }
    });

    // gat watchLists data 
    router.post('/get-watchlists', async (req, res) => {
        const sendEmail = req.body.email;
        try {
            // const { email } = req.body;
            const email = 
            if (!email) {
                return res.status(400).send({ message: "❎ All fields are required" });
            }
            console.log("user email is ", email);

            const find_user = User.findOne({ email: email }); // find the 🧑🏽‍🎤 auther email
            const lovedBlog = find_user.watchlists;
            console.log("watchlist data ", lovedBlog); // 💡 see the watchlist data
            res.send(lovedBlog);
        } catch (error) {
            console.error('⚠️ Error retrieving data:', error);
            res.status(500).send({ message: `❎ Internal Server Error ${error}` });
        }
    });

    // delet watchlist
    router.delete('/watchlists/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const result = await wicCollection.deleteOne({ _id: new ObjectId(id) }); // ObjectId ব্যবহার করুন
            console.log("Delete result:", result);

            if (result.deletedCount === 0) {
                console.warn("⚠️ Data not found for ID:", id);
                return res.status(404).send({ message: "❎ Data not found" });
            }

            res.status(200).send({ message: "✅ Deleted successfully" });
        } catch (error) {
            console.error("Error deleting data:", error);
            res.status(500).send({ message: "❎ Error deleting data" });
        }
    });

    return router;
};
