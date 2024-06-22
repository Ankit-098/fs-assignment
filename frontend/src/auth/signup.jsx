import React, { useRef, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import CheckAuth from "./checkAuth";

function Signup() {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [username, setUserName] = useState("");
 

  // useEffect(()=>{
  //   let token=   localStorage.getItem("token")
  //   if(!token){
  //    navigate("/login")
  //    return
  //   }
  //    },[])

 
  let navigate = useNavigate();

  let ChangeUsername = (e) => {
    setUserName(e.target.value);
  };

  let Emailchange = (e) => {
    Setemail(e.target.value);
  };

  let Passwordchange = (e) => {
    Setpassword(e.target.value);
  };

  let signUp = async(e) => {

    if(username.trim().length==0){
      toast("Please enter Name")
      return
    }
    if(email.trim().length==0){
      toast("Please enter Email")
      return
    }if(password.trim().length==0){
      toast("Please enter Password")
      return
    }
      try {
        const response = await fetch("http://localhost:4000/auth/signup", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email: email, password: password, name: username }),
        });
    
        if (!response.ok) {
          // throw new Error(`HTTP status ${response.status}`);
          if(response.status==409){
            toast("Email Already Exists")
            return
          }
        }
    
        const data = await response.json();
        
        if (data.message === "User Registered") {
          localStorage.setItem("authToken", data.token);
          navigate("/");
        } else {
          toast(data.message || "Registration failed");
        }
      } catch (err) {
        console.error(err);
        toast(err.message || "An unexpected error occurred");
      }
  
  };

  return (
    <>
    <ToastContainer/>
      <Paper
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 3, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        style={{ padding: "3% 0%" }}
      >
        <p className="">Create New Account</p>
        <div>
          <TextField
            error={false}
            id="outlined-error-helper-text"
            label="Name"
            // defaultValue="Hello World"
            placeholder="Enter Your Name"
            onChange={(e) => ChangeUsername(e)}
          />

          <TextField
            error={false}
            id="outlined-error-helper-text"
            label="Password"
            onChange={(e) => Passwordchange(e)}
            type="password"
            // defaultValue="Hello World"
            // helperText="Incorrect entry."
          />
        </div>
        <TextField
          error={false}
          id="outlined-error-helper-text"
          label="Email"
          // defaultValue="Hello World"
          placeholder="Enter Email"
          onChange={(e) => Emailchange(e)}
        />
        <div>
          {/* <TextField
            error={false}
            id="outlined-error-helper-text"
            label="Email"
            // defaultValue="Hello World"
            placeholder="Enter Email"
          />
          <TextField
            error={false}
            id="outlined-error-helper-text"
            label="Password"
            // defaultValue="Hello World"
            // helperText="Incorrect entry."
          /> */}
          <Button variant="contained" onClick={signUp}>
            Register
          </Button>
        </div>
        <p className="">
          Have an Account ? <Link to="/login">Login</Link>
        </p>
      </Paper>
    </>
  );
}

export default Signup;
