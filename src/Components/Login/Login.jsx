import { useState, useEffect } from "react";
import { LoginModel } from "../../Models/login.model";
import { loginAPICall } from "../../Services/login.service";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import "./Login.css";

export default function Login() {
  const [user, setUser] = useState(new LoginModel());
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); 
    }
  }, [navigate]);

  const changeUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // const login = () => {
  //   if (!user.username || !user.password) {
  //     alert("Please fill in both fields");
  //     return;
  //   }

  //   loginAPICall(user)
  //     .then((res) => {
  //       dispatch(
  //         setAuth({
  //           token: res.data.token,
  //           role: res.data.role, 
  //           username: res.data.username,
            
  //         })


  //       );

  //       alert("Login successful");
  //       if (res.data.role?.toLowerCase() === "admin") {
  //         navigate("/admin");
  //       } else {
  //         navigate("/");
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       alert("Invalid username or password");
  //     });
  // };
  const login = () => {
    if (!user.username || !user.password) {
      alert("Please fill in both fields");
      return;
    }
  
    loginAPICall(user)
      .then((res) => {
        const { token, role, username } = res.data;
  
    
        dispatch(setAuth({ token, role, username }));
  
     
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
  
        alert("Login successful");
  
     
        if (role?.toLowerCase() === "admin") {
          navigate("/admin");
        } else if (role?.toLowerCase() === "restaurant") {
          navigate("/restaurant");
        }
        else if (role?.toLowerCase() === "user") {
          navigate("/user/dashboard");
        }
        
        
        else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Invalid username or password");
      });
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <h2>HotPot</h2>
        </div>

        <h3 className="login-title">Login</h3>
        <p className="login-subtitle">Welcome back! Please log in to continue.</p>

        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={changeUser}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={changeUser}
          />
        </div>

        <button className="btn-login" onClick={login}>
          Login
        </button>

        <div className="login-footer">
          New to HotPot? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
