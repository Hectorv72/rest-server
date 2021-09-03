const mongoose = require("mongoose");
// require('dotenv').config();
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.error(err));