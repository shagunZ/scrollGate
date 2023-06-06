import React,{useEffect,useState} from "react";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import {auth} from "./firebase";
import {signOut,updateProfile} from "firebase/auth"



function App() {
  const [userName,setUserName]=useState("")
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  // useEffect(()=>{
  //   auth.onAuthStateChanged((user)=>{
  //     if(user){
  //       setUserName(user.displayName);
  //     }else setUserName("");
  //     console.log(user);
  //   })
  // },[]);


  useEffect(() => {
    const userEmailFromLocalStorage = localStorage.getItem('userEmail');
    if (userEmailFromLocalStorage) {
      setUserEmail(userEmailFromLocalStorage);
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const email = user.email;
        setUserEmail(email);
        localStorage.setItem('userEmail', email);
      } else {
        setUserEmail('');
        localStorage.removeItem('userEmail');
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  
  return (
    <>
    <div className="App">
      <Router>
        <Routes >
          <Route path="/login" element={<Login  userEmail={userEmail}/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/" element={<Home username={userName} />} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
