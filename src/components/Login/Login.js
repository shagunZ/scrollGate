import React, { useState,useContext } from "react";
import {Link,useNavigate} from "react-router-dom";
import './Loginmodule.css';
import { signInWithEmailAndPassword ,updateProfile, getAuth} from "firebase/auth";
import InputControl from "../InputControl/InputControl";
import { UserContext } from "../UserContext";
import TextLinkExample from "../Navbar";


function Login(){

    const { userName,login } = useContext(UserContext);
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [values,setValues] = useState({
        // name:"",
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

//         signInWithEmailAndPassword(auth, values.email, values.pass)
//         .then(async(res) => {
//             setSubmitButtonDisabled(false);
//             const user = res.user;
//             localStorage.setItem("user", user.displayName);
           
//             await updateProfile(user,{
//                 // displayName:name
//                 displayName:values.name
//             });
//             user.displayName = values.name;
//             console.log(user)
//             console.log(login)
//             console.log(values.name)
//             login(values.name); 
//             // login(user.displayName); 
//             navigate("/");
//   })
//   .catch((error) => {
//     setSubmitButtonDisabled(false);
//     setErrormsg("error",error.message);
//   });

// ...

// ...

signInWithEmailAndPassword(auth, values.email, values.pass)
      .then((res) => {
        const user = res.user;

        updateProfile(user, { displayName: values.name })
          .then(() => {
            // Fetch the updated user data to get the display name
            const updatedUser = auth.currentUser;
            const displayName = updatedUser.displayName;
            setName(values.name);
            login(displayName); // Pass the display name to the login function
            navigate('/');
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
                    <p>Already have an account?{" "}
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