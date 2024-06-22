let { user } = require("../models/user");


exports.allData=async (req,res,next)=>{
    let user_id= req.user_id

    try{
   let data= await user.findById(user_id)
   
   res.status(200).json({message:"success ",data})

    }catch{
        res.status(500).json({message:"Something Went Wrong "})
    }

    console.log(data)

}