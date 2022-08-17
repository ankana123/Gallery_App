import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar} from "react-bootstrap";

const Register = (props) => {
  const [username,setUsername]= useState("");
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  let navigate= useNavigate();
  const submit=(e)=>{
    e.preventDefault();
    if(!username || !email || !password){
      alert("Provide all the details");
    }
    else{
      navigate("/Gallery_App/login");
      props.regdetails(email,password)
      setUsername("");
      setEmail("");
      setPassword("");
    }
  }
  return (
    <>
    <Navbar expand={"lg"} bg="dark" variant="dark">
        <Navbar.Brand style={{ marginLeft: "50px" }}>
          My Gallery
        </Navbar.Brand>
    </Navbar>
    <div className='container'>
      <h3 className='text-center my-3'>Register</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control" id="username" name='username' />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="password" name='password' />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Sign up</button>
        </div>
        </form>
    </div>
    </>
  )
}

export default Register
