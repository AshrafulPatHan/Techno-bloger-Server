const express = require("express");
const router = express.Router();

module.exports = (collections) => {
    const { User,Blog } = collections;

// Test the server
router.get('/test-auth',async (req,res) =>{
    try {
        const data = "server is ok"
        res.status(200).send(data)
    }catch(error){
        console.error("something is wrong on server",error);
        res.status(500).send({massage:'Error inserting data'}) 
    }
});

return router;
};
