import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Navbar} from "react-bootstrap";

const Login = (props) => {
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    let navigate= useNavigate();
    const submit=(e)=>{
        e.preventDefault();
        props.logindetails(email,password)
        if(!email || !password){
            alert("Fill up all the details");
        }
        else if(props.check()===false){
            alert("Fill in with correct details");
        }
        else{
            navigate("/Gallery_App/mygallery");
            setEmail(email);
            setPassword(password);
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
            <h3 className='text-center my-3'>Login</h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="password" name='password' />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login
