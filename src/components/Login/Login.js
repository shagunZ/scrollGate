import React, { useState,useContext } from "react";
import {Link,useNavigate} from "react-router-dom";
import './Loginmodule.css';
import { signInWithEmailAndPassword ,updateProfile, getAuth} from "firebase/auth";
import InputControl from "../InputControl/InputControl";
import { UserContext } from "../UserContext";
import TextLinkExample from "../Navbar";


function Login(){

    // const { userName,login } = useContext(UserContext);
    const { login } = useContext(UserContext);
    // const [name, setName] = useState('');
    const navigate = useNavigate();
    const [values,setValues] = useState({
        email:"",
        pass:""
    })

    const [errormsg,setErrormsg] = useState("");
    const [submitButtonDisabled,setSubmitButtonDisabled] = useState(false);

    const handleSubmission=()=>{
        if(!values.email || !values.pass){
            setErrormsg("All fields are required");
            return;
        }
        setErrormsg("");
       
        setSubmitButtonDisabled(true);
        
        const auth = getAuth(); 


signInWithEmailAndPassword(auth, values.email, values.pass)
      .then((res) => {
        const user = res.user;

        updateProfile(user, { displayName: values.name })
          .then(() => {
            
            const updatedUser = auth.currentUser;
            const displayName = updatedUser.displayName;
            // setName(values.name);
            login(displayName); 
            navigate('/home');
          })
          .catch((error) => {
            setSubmitButtonDisabled(false);
            setErrormsg('Error updating profile: ' + error.message);
          });
      })
      .catch((error) => {
        setSubmitButtonDisabled(false);
        setErrormsg('Error signing in: ' + error.message);
      });



}
    
    return (
        <>
        <TextLinkExample/>
        <div className="container">
            <div className='innerBox'>
                <h1 className='heading'>Login</h1>
                <InputControl label="Email" placeholder="enter your email" onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }/>
                <InputControl label="Password" type="password" placeholder="enter Password"  onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))} />

                <div className="footer">
                    <b className="error">{errormsg}</b>
                    <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
                    <p> New account?{" "}
                    <span>
                        <Link to="/signup">Sign up</Link>
                    </span>
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login