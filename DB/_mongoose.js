// config/db.js
const mongoose = require('mongoose')
require('dotenv').config();


const MongooseDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'Pathan-Blogger',
        });
        console.log('✅ Mongoose Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = MongooseDB;