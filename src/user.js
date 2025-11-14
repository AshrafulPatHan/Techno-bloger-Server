const express = require("express");
const router = express.Router();

module.exports = (collections) => {
    const { User, Blog } = collections;

    // post user data (name email)
    router.post('/user-data', async (req, res) => {
        try {
            // get dat from frontend
            const { name, email, photoURL } = req.body;
            const User_data = { name, email, photoURL, watchlists: [], dashboard: [{ Portfolio: "", facebook: " ", github: " ", x: " ", instagram: "", followers: 0, following: 0, baner: "https://i.ibb.co.com/MVwBCf5/pexels-morningtrain-18104.jpg", aboutme: "Hello" }] }
            console.log('user data', User_data);
            // insert the dat on data base
            const result = await User.insertOne(User_data);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.send(result);
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).send({ message: 'Error inserting data' });
        }
    });
    // post user data on login with google (name email)
    router.post('/google-auth', async (req, res) => {
        try {
            // get dat from frontend
            const { _userName, gmail, _userphoto } = req.body;
            // fix the variable
            const name = _userName;
            const email = gmail;
            const photoURL = _userphoto
            const User_data = { name, email, photoURL, watchlists: [], dashboard: [{ Portfolio: "", facebook: " ", github: " ", x: " ", instagram: "", followers: 0, following: 0, baner: "https://i.ibb.co.com/MVwBCf5/pexels-morningtrain-18104.jpg", aboutme: "Hello" }] }
            console.log('user data', User_data);

            // check the user is exist or not
            const _mongoUuser = await User.findOne({ email: gmail });
            if (_mongoUuser) {
                return res.status(200).json({ exists: true, message: 'Email already exists' });
            } else {
                const result = await User.insertOne(User_data);
                return res.status(200).send(result);
            }

            // insert the dat on data base
            // const result = await User.insertOne(User_data);
            // console.log(`A document was inserted with the _id: ${result.insertedId}`);
            // res.send(result);
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).send({ message: 'Error inserting data' });
        }
    });
    // get user data
    router.post('/get-user', async (req, res) => {
        try {
            const email = req.body.email;
            const userData = await User.findOne({ email: email })
            res.status(200).send(userData)
        } catch (error) {
            console.error('error find data:', error);
            res.status(500).send({ message: 'error is comming on find user' })
        }
    })

    return router;
};
