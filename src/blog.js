const express = require("express");
const router = express.Router();

module.exports = (collections) => {
    const { User, Blog } = collections;

    // post blog
    router.post('/postblog', async (req, res) => {
        try {
            const { Title, shortdescription, longdescription, Image, category, username, userEmail, date } = req.body; // get all dat to user
            const _Data = { Title, shortdescription, longdescription, Image, category, username, userEmail, date };
            console.log('', _Data);
            const result = await Blog.insertOne(_Data);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.status(200).send(result);
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).send({ message: 'Error inserting data' });
        }
    });

    // get all blog data
    router.get('/all-blog', async (req, res) => {
        try {
            const cursor = Blog.find({}).sort({ _id: -1 }); // sort the data on reverce counte
            const result = await cursor.toArray();
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send(result);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    // get resent blog post
    router.get('/latest-blog', async (req, res) => {
        const limit = parseInt(req.query.limit) || 4;
        try {
            const cursor = Blog.find({}).sort({ _id: -1 }).limit(limit);
            const result = await cursor.toArray();
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send(result);
        } catch (error) {
            console.error('Error retrieving limited data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    //  Featured Blogs / populer blog
    router.get('/featured-blogs', async (req, res) => {
        const limit = parseInt(req.query.limit) || 4;
        try {
            const cursor = Blog.find().limit(limit);
            const result = await cursor.toArray();
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send(result);
        } catch (error) {
            console.error('Error retrieving limited data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    // update blog data
    router.put('/blog/:id', async (req, res) => {
        try {
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

            const result = await Blog.updateOne(filter, updateDoc, { upsert: true });
            res.status(200).send(result);
        } catch (error) {
            console.error('Error retrieving limited data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    router.delete('/user/blog/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const UserMail_ = req.body.email;

            if (!id) return res.status(400).send({ message: "❌ ID not provided" }); // check the id

            const DeleteBlog = await Blog.deleteOne({ _id: new ObjectId(id) }); // delete the blog

            // check the blog is delete or not
            if (DeleteBlog.deletedCount > 0) {
                res.status(200).send({ message: "✅ blog deleted successfully" });
            } else {
                res.status(404).send({ message: "❌ blog not found" });
            }
        } catch (error) {
            console.error('Error retrieving limited data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    })


    return router;
};
