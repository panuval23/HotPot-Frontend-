import { useState } from "react";
import './Login.css';
import {loginAPICall} from '../../Services/login.service';
import {LoginModel} from '../../Models/login.model';
import {LoginErrorModel} from '../../Models/loginerror.model';
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const [user,setUser] = useState(new LoginModel());
    const [errors,setErrors] = useState(new LoginErrorModel());
    const navigate = useNavigate();

    const changeUser=(eventArgs)=>{
        const fieldName = eventArgs.target.name;
        switch (fieldName) {
            case "username":
                if(eventArgs.target.value=="")
                    setErrors(e=>({...errors,username:"Username cannot be empty"}));
                else
                {
                    setUser(u=>({...u,username:eventArgs.target.value}))
                    setErrors(e=>({...errors,username:""}));
                }
                break;
            case "password":
                setUser(u=>({...u,password:eventArgs.target.value}))
                break;
            default:
                break;
        }
    }
    const login=()=>{
        if(errors.username.length>0 || errors.password.length>0)
            return;
        loginAPICall(user)
        .then(result=>{
            console.log(result.data)
            sessionStorage.setItem("token",result.data.token);
            sessionStorage.setItem("username",result.data.username)
            alert("Login success");
            navigate('/emp')
        })
        .catch(err=>{
            console.log(err);
            if(err.status === 401)
             alert(err.response.data.errorMessage)
        })
    }

    const cancel =()=>{

    }
    return (
        <section className="loginDiv">
            <h1>Login!!</h1>
            <label className="form-control">Username</label>
            <input type="text" name="username" value={user.username} onChange={(e)=>changeUser(e)} className="form-control"/>
            {
                errors.username?.length >0 && (<span className="alert alert-danger">{errors.username}</span>)
            }
              <label className="form-control">Password</label>
            <input type="password" name="password" value={user.password} onChange={(e)=>changeUser(e)} className="form-control"/>
            <button className="button btn btn-success" onClick={login}>Login</button> 
            <button className= "button btn btn-danger" onClick={cancel}>Cancel</button>
        </section>
    )
}

export default Login;