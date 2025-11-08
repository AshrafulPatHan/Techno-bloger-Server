const express = require('express');
const router = express.Router();


// start the route
router.get('/', (res, req) => {
    res.send('user route')
});


module.exports = router;