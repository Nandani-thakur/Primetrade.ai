
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER
exports.register = async (req, res) => {

try{

const { name, email, password } = req.body

if(!name || !email || !password){
return res.status(400).json({message:"All fields required"})
}

const exist = await User.findOne({ email })

if (exist) {
return res.status(400).json({ message: "User already exists" })
}

const hash = await bcrypt.hash(password, 10)

const user = await User.create({
name,
email,
password: hash,
role: "user"
})

res.json({
message:"User registered successfully",
user
})

}catch(err){
res.status(500).json({message:"Server error"})
}

}

// LOGIN
exports.login = async (req, res) => {

try{

const { email, password } = req.body

if(!email || !password){
return res.status(400).json({message:"Email and password required"})
}

const user = await User.findOne({ email })

if (!user) {
return res.status(400).json({ message: "Invalid email" })
}

const valid = await bcrypt.compare(password, user.password)

if (!valid) {
return res.status(400).json({ message: "Invalid password" })
}

const token = jwt.sign(
{
id: user._id,
role: user.role
},
"secret123",
{
expiresIn: "1d"
}
)

res.json({
message:"Login successful",
token,
role:user.role
})

}catch(err){
res.status(500).json({message:"Server error"})
}

}
