// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
// "mongodb+srv://nandanith7563_db_user:pa1234@cluster0.4sjbxjg.mongodb.net/?appName=Cluster0"
//     );

//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.log("DB Connection Error:", error);
//   }
// };

// module.exports = connectDB;

require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    // Mongoose 7+ me options ki zarurat nahi
    await mongoose.connect(mongoURI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;