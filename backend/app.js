// const express=require("express")
// const cors=require("cors")

// const authRoutes=require("./routes/authRoutes")
// const taskRoutes=require("./routes/taskRoutes")

// const swaggerUI=require("swagger-ui-express")
// const swaggerSpec=require("./swagger")

// const app=express()

// app.use(cors())
// app.use(express.json())

// app.use("/api/v1/auth",authRoutes)
// app.use("/api/v1/tasks",taskRoutes)

// app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec))

// module.exports=app

const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")

const swaggerUI = require("swagger-ui-express")
const swaggerSpec = require("./swagger")

const app = express()

app.use(cors({
  origin: "https://primetrade-ai-2ss5.vercel.app",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}))

app.use(express.json())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/tasks", taskRoutes)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

module.exports = app