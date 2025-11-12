const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");


module.exports = (collections) => {
    const { User, Blog } = collections;

    // add user watchLists  👨🏽‍🏫
    router.patch('/post-watchlists', async (req, res) => {
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
            const addList = { $push: { watchlists: { id } } }; // 😎 push the objectId for blog inside user collection

            const result = await User.updateOne(filter, addList);
            console.log(`💯 WatchLists is add on user collection`);
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
            const { email } = req.body;
            // const email = "bangladesh@gmail.com";
            if (!email) {
                return res.status(400).send({ message: "❎ All fields are required" });
            }
            console.log("user email is ", email);

            const find_user = await User.findOne({ email: email }); // find the 🧑🏽‍🎤 auther email
            // console.log("user data", find_user); // user data

            const lovedBlog_id = await find_user.watchlists;
            // console.log("watchlists data ", lovedBlog_id); // 💡 see the watchlist data

            // get all liked blog data
            const _lovedBlog = await Promise.all(
                lovedBlog_id.map(async (data) => ({
                    id_: data.id,
                    blog: await (async function FindBlog(data) {
                        let iD = data.id;
                        let End_result = await Blog.find({ _id: new ObjectId(iD) });
                        return End_result.toArray();
                    }(data))
                }))
            )

            // console.log("the likes of user : --", _lovedBlog);

            res.send(_lovedBlog);
        } catch (error) {
            console.error('⚠️ Error retrieving data:', error);
            res.status(500).send({ message: `❎ Internal Server Error ${error}` });
        }
    });


    return router;
};
