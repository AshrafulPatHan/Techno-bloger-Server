const express = require("express");
const router = express.Router();

module.exports = (collections) => {
    const { User, Blog } = collections;

    // post blog
    router.post('/postblog', async (req, res) => {
        try {
            const Title = req.body.Title;
            const shortdescription = req.body.shortdescription;
            const longdescription = req.body.longdescription;
            const Image = req.body.Image;
            const category = req.body.category;
            const username = req.body.username;
            const userEmail = req.body.userEmail;
            const date = req.body.date;

            const _Data = {Title,shortdescription,longdescription,Image,category,username,userEmail,date};
            console.log('', _Data);
            const result = await Blog.insertOne(_Data);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.send(result);
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).send({ message: 'Error inserting data' });
        }
    });

    // get all blog data
    router.get('/all-blog', async (req, res) => {
        try {
            const cursor = Blog.find({}).sort({ _id: -1 });
            const result = await cursor.toArray();
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(result);
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
            res.send(result);
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
            res.send(result);
        } catch (error) {
            console.error('Error retrieving limited data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    // update blog data
    router.put('/blog/:id', async (req, res) => {
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
        res.send(result);
    });


    return router;
};
