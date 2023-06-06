import React ,{useState,useContext} from "react";
import {Link,useNavigate} from "react-router-dom";
import './Signupmodule.css';
import InputControl from "../InputControl/InputControl";
import { createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../../firebase"
import TextLinkExample from "../Navbar";
import { UserContext } from "../UserContext";


function Signup(){

    const { setUserName } = useContext(UserContext);

    const navigate = useNavigate();
    const [values,setValues] = useState({
        name:"",
        email:"",
        pass:""
    })

    const [errormsg,setErrormsg] = useState("");
    const [submitButtonDisabled,setSubmitButtonDisabled] = useState(false);

    const handleSubmission=()=>{
        if(!values.name || !values.email || !values.pass){
            setErrormsg("All fields are required");
            return;
        }
        setErrormsg("");
        console.log(values);
        setSubmitButtonDisabled(true);
        
        createUserWithEmailAndPassword(auth, values.email, values.pass)
        .then(async(res) => {
            // Signed in 
            setSubmitButtonDisabled(false);
            const user = res.user;
            await updateProfile(user,{
                displayName:values.name,
            });
            localStorage.setItem("userName", values.name);
            setUserName(values.name);
            navigate("/");


  })
  .catch((error) => {
    setSubmitButtonDisabled(false);
    setErrormsg(error.message);
    console.log("error",error.message)
    // ..
  });

}

    return (
        <>
        <TextLinkExample name={values.name}/>
        <div className="container">
            <div className='innerBox'>
                <h1 className='heading'>Signup</h1>
                <InputControl 
                label="Name" 
                placeholder="enter your name"
                onChange={(event)=>
                    setValues((prev)=>({...prev,name:event.target.value}))} />

                <InputControl 
                label="Email" 
                placeholder="enter your email"
                onChange={(event)=>
                    setValues((prev)=>({...prev,email:event.target.value}))} />

                <InputControl 
                label="Password" 
                type="password"
                placeholder="enter Password"
                onChange={(event)=>
                    setValues((prev)=>({...prev,pass:event.target.value}))} />

                <div className="footer">
                    <p className="error">{errormsg}</p>
                    <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
                    <p>Already have an account?{" "}
                    <span>
                        <Link to="/login">Login</Link>
                    </span>
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup