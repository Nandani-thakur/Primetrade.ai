// const jwt = require("jsonwebtoken");

// module.exports=(req,res,next)=>{

// const header=req.headers.authorization;

// if(!header){
// return res.status(401).json({message:"Token missing"})
// }

// try{

// const token=header.split(" ")[1];

// const decoded=jwt.verify(token,"secret123");

// req.user=decoded;

// next()

// }
// catch(err){
// res.status(401).json({message:"Invalid token"})
// }

// }

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;