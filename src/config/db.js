const mongoose = require("mongoose");
const connectToDb = async () => {
  mongoose
    .connect("mongodb://localhost:27017/ems_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToDb;
