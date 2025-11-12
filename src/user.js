const express = require("express");
const router = express.Router();

module.exports = (collections) => {
    const { User, Blog } = collections;

    // post user data (name email)
    router.post('/user-data', async (req, res) => {
        try {
            // get dat from frontend
            const {name,email,photoURL} = req.body;
            const User_data = {name,email,photoURL,watchlists:[],dashboard:[{Portfolio:"",facebook:" ",github:" ",x:" ",followers:0,following:0,baner:"https://i.ibb.co.com/MVwBCf5/pexels-morningtrain-18104.jpg",aboutme:"Hello"}]}
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
    // get user data
    router.post('/get-user',async (req,res)=>{
        try{
            const email = req.body.email;
            const userData = await User.findOne({email:email})
            res.status(200).send(userData)
        }catch(error){
            console.error('error find data:',error);
            res.status(500).send({message: 'error is comming on find user'})
        }
    })

    return router;
};
