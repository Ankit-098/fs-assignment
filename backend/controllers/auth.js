const jwt = require("jsonwebtoken");

let { user } = require("../models/user");

exports.signup = async (req, res, next) => {
  const { name, password, email } = req.body;
  let isExist = await user.findOne({ email: email });

  if (isExist) {
    return res.status(409).json({ message: "Email already Exist" });
  } else {
    let userId = await user.create({
      name: name,
      email: email,
      password: password,
    });

    let token = jwt.sign( {user_id:userId._id}, process.env.JWT_KEY, {expiresIn:"1m"});

    return res
      .status(200)
      .json({ message: "User Registered", token, res: true });
  }
};


exports.login=async(req,res,next)=>{
  const {  password, email } = req.body;
  let isExist = await user.findOne({ email: email });

  if (!isExist) {
    return res.status(404).json({ message: "Email Not Registered" });
  } else {

    let userId= user.findOne({email,password})
    if(userId){
          let token = jwt.sign( {user_id:userId._id}, process.env.JWT_KEY, {expiresIn:"1m"});
          return res
            .status(200)
            .json({ message: "User loggedin", token, res: true });
    }else{
    return res.status(401).json({ message: "Unauthorized" });

    }

  }
  if (
    !req.headers.authorization ||
    !req.headers?.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let token= req.headers?.authorization.split(" ")[1]
  try {
    let decoded = jwt.verify(token, process.env.JWT_KEY);
    let user_id= decoded.user_id
    let userData= await user.findById({user_id})
    if(userData){
      req.user_id=user_id
      res.status(200).json({message:"success",res:true,})
    }else{
    return res.status(401).json({ message: "Unauthorized" });
    }
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}


exports.checkAuth = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers?.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }
let token= req.headers?.authorization.split(" ")[1]
  try {
    let decoded = jwt.verify(token, process.env.JWT_KEY);
    let user_id= decoded.user_id
    req.user_id=user_id
    res.status(200).json({message:"success",})
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};