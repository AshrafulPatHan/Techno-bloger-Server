require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require("./DB/_mongodb");
const app = express();
const PORT = process.env.PORT || 5022;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running 1.4');
});


connectDB().then((collections) => {
  const publicRoutes = require("./routes/_public")(collections);
  const adminRoutes = require("./routes/_admin")(collections);
  const UserRoutes = require("./routes/_user")(collections);
  const AuthRoutes = require("./routes/_auth")(collections);

  app.use(publicRoutes);
  app.use(UserRoutes);
  app.use("/auth",AuthRoutes);
  app.use("/admin", adminRoutes);

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

