import React, { useRef, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "../css/auth/login.css";
import { Button, Paper } from "@mui/material";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import checkAuth from "./checkAuth";
// import { useNavigate } from "react-router-dom";


function Login() {
  let navigate=useNavigate()

  useEffect(()=>{
    async ()=>{

      let token=   localStorage.getItem("authToken")
      if(!token){
       navigate("/login")
       return
      }else{
       navigate(await checkAuth())
     
      }
    }
  },[])


  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");

  let Emailchange = (e) => {
    Setemail(e.target.value);
  };
  let Passwordchange = (e) => {
    Setpassword(e.target.value);
  };




  let login = async(e) => {
    if(email.trim().length=0){
      toast("Please Enter Email Address")
      return
    } if(password.trim().length=0){
      toast("Please Enter Password")
      return
    }
    try{

      let response=await  fetch("http://localhost:5000/login", {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ email: email.trim().toLowerCase(), password: password.trim() }),
       })
       
         if (!response.ok) {
           // throw new Error(`HTTP status ${response.status}`);
           if(response.status==404){
             toast("Email Not Registered")
             return
           }
         }
     
         const data = await response.json();
     
         // userid.setUserId(data.userName);
         // alert(userid.userId);
         // console.log(userid.userId);
     
         if (data.message === "User loggedin") {
           localStorage.setItem("authToken", data.token);
           navigate("/");
         } else {
           toast(data.message || "Login failed");
         }
    
      } catch (err) {
        console.error(err);
        toast(err.message || "An unexpected error occurred");
      }
      
  };

  return (
    <>
      {/* <form className="parent-login">
        <div className="login-main" ref={centerdiv}>
          <div className="login-logo-div">
            <div className="login-logo">
              <img src="" />
            </div>
          </div>
          <h3 className="login-h3">Login</h3>
          <label className="label-email" for="email">
            Email
          </label>
          <div className="relative-input">
            <input
              type="email"
              placeholder="enter your email id"
              id="email"
              onChange={(e) => Emailchange(e)}
              value={email}
              required
            />
            <div className="div-absolute">
              <svg
                width="18"
                height="13"
                viewBox="0 0 24 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23 1L12 10.7778L1 1"
                  stroke="#012951"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1 1H23V16.1111C23 16.3469 22.9034 16.573 22.7315 16.7397C22.5596 16.9064 22.3264 17 22.0833 17H1.91667C1.67355 17 1.44039 16.9064 1.26849 16.7397C1.09658 16.573 1 16.3469 1 16.1111V1Z"
                  stroke="#012951"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.99471 9L1.28638 16.7444"
                  stroke="#012951"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.7135 16.7444L14.0051 9"
                  stroke="#012951"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <label className="label-email label-password" for="password">
            Password
          </label>
          <div className="relative-input">
            <input
              type="password"
              placeholder="please enter your password"
              id="password"
              onChange={(e) => Passwordchange(e)}
              value={password}
              required
            />
            <div className="div-absolute">
              <svg
                width="17"
                height="17"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 8.24792V1.86932C1 1.63876 1.09159 1.41764 1.25462 1.25462C1.41764 1.09159 1.63876 1 1.86932 1H19.2556C19.4862 1 19.7073 1.09159 19.8703 1.25462C20.0333 1.41764 20.1249 1.63876 20.1249 1.86932V8.24792C20.1249 17.3757 12.3772 20.3966 10.8341 20.9073C10.6588 20.9722 10.4661 20.9722 10.2908 20.9073C8.74777 20.3966 1 17.3757 1 8.24792Z"
                  stroke="#012951"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.6473 14.4851L10.5627 8.82373L2.47803 14.4851"
                  stroke="#012951"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="forget-button">Forget Password?</div>
          <button className="login-button" onClick={(e) => login(e)}>
            Login
          </button>
        </div>
      </form> */}

      <Paper
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 3, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        style={{ padding: "3% 0%" }}
      >
        <p className="">Login</p>
        <div>
          <TextField
            error={false}
            id="outlined-error-helper-text"
            label="Email"
            // defaultValue="Hello World"
            onChange={(e) => Emailchange(e)}
            placeholder="Enter Email"
          />
          <TextField
            error={false}
            id="outlined-error-helper-text"
            label="Password"
            // defaultValue="Hello World"
            // helperText="Incorrect entry."
            onChange={(e) => Passwordchange(e)}
          />
        </div>
        <div>
          <Button variant="contained" onClick={(e) => login(e)}>
            Login
          </Button>
        </div>
        <p className="">
          Not Have an Account ? <Link to="/signup">Register</Link>
        </p>
      </Paper>
    </>
  );
}

export default Login;
