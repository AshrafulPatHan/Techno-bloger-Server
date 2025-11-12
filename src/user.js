const express = require("express");
const router = express.Router();

module.exports = (collections) => {
    const { User, Blog } = collections;

    // post user data (name email)
    router.post('/user-data', async (req, res) => {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const photoURL = req.body.photoURL;
            const User_data = {name,email,photoURL,watchlists:[],dashboard:[{Portfolio:"",facebook:" ",github:" ",x:" ",followers:0,following:0,baner:"https://i.ibb.co.com/MVwBCf5/pexels-morningtrain-18104.jpg",aboutme:"Hello"}]}
            console.log('user data', User_data);
            const result = await userDataCollection.insertOne(User_data);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.send(result);
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).send({ message: 'Error inserting data' });
        }
    });
    // get user data
    

    return router;
};
