// const app=require("./app")
// const connectDB=require("./config/db")

// connectDB()

// app.listen(5000,()=>{

// console.log("Server running on port 5000")

// })
require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// MongoDB connect
connectDB();

// PORT ko .env se load karo, default 5000 agar .env me na ho
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});