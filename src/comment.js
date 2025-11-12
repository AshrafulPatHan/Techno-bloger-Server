const express = require("express");
const router = express.Router();

module.exports = (collections) => {
    const { User, Blog } = collections;



    // comment on blog
    app.patch('/comment', async (req, res) => {
        const { Comment, username, userEmail, userphotoURL, _id } = req.body;

        if (!Comment || !username || !userEmail || !userphotoURL || !_id) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        if (!ObjectId.isValid(_id)) {
            return res.status(400).send({ message: 'Invalid ID format' });
        }

        try {
            const filter = { _id: new ObjectId(_id) };
            const updateDoc = {
                $push: { comments: { Comment, username, userphotoURL, userEmail, date: new Date() } },
            };
            const result = await onerCollection.updateOne(filter, updateDoc);
            res.send(result);
        } catch (error) {
            console.error('Error updating comment:', error);
            res.status(500).send({ message: 'Error updating comment' });
        }
    });



    return router;
};
