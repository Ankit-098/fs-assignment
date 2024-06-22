


 async  function CheckAuth(){
    // let navigate= useNavigate()
    let accessToken=localStorage.getItem("token")
      const response = await fetch("http://localhost:4000/auth/checkToken", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if(!response.ok){
        if(response.status==500){
          toast("Internal Server Error")
          return
        }
        // console.log(response)
      return("/login")  
    }
    
    return("/")    

    }

    export default CheckAuth