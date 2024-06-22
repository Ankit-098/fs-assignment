let express = require("express");
let mongoose= require("mongoose")
let cors= require("cors")
 require("dotenv").config({})

const user= require("./routes/user/user")
const auth= require("./routes/auth/auth")

let app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.use("/user",user)
app.use("/auth",auth)

mongoose.connect('mongodb+srv://ap384069:newpassword098@new-db.xcfslbt.mongodb.net/?retryWrites=true&w=majority&appName=new-database').then(()=>{
  app.listen(4000, () => {
    console.log("listening");
  });
  
})
