import auth from "../firebase";
import {signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate(); 
    
    const handleSignIn = async (e) => {
        
        e.preventDefault();
       
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            setError(null);
            navigate("/gallery");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage)
        });

    };
  return (
    <div className="content-home">
        <div>
        <h2>Log in to continue</h2>
    <form onSubmit={handleSignIn} className="form-login">
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required  
            value={email}
            onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required  
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <button type="submit" className="btn-login">Login</button>
    </form>
    {error && <p>{error}</p>}
    <p>Don't have an account? <a href="#">Sign Up</a></p>
        </div>
    </div>
  );
}

export default Home;