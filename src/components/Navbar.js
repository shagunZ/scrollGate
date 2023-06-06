import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {signOut,updateProfile} from "firebase/auth"
import { auth } from "../firebase";
import {Link,useNavigate} from "react-router-dom";
import { useState,useEffect,useContext } from 'react';
import { UserContext } from './UserContext';


function TextLinkExample(props) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
const [values,setValues] = useState({
        name:"",
    })

    const { userName,logout } = useContext(UserContext);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setIsAuthenticated(user !== null);
        setUser(user);
      });
  
      // Clean up the event listener on component unmount
      return () => unsubscribe();
    }, []);


const HandleSignout=()=>{
signOut(auth).then(async(res) => {
  // Sign-out successful.
  console.log("user successfully signed out");
  logout();
  setUser(null);
  navigate("/login");
}).catch((error) => {

  console.log("error",error);
});
}



  return (
    <Navbar className='nav' style={{justifyContent:"center"}}>
    
        <Navbar.Brand href="#home" style={{color:"#470287",position:"absolute",fontSize:"2.5em"}}><i class="fa-sharp fa-solid fa-infinity"></i></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          {userName && `${userName}`}
      {/* <h3>{props.name ? `${props.name}` : ""}</h3> */}
      {/* <h3>{userName ? userName : ""}</h3> */}
      {/* <h3>{userName ? `${userName}` : props.userName ? `${props.userName}` : ""}</h3> */}
          </Navbar.Text>
          <Nav>
          <Nav.Link id="handlesignout" onClick={HandleSignout}>
            {user ? "Logout" : "Login"}
          </Nav.Link>
          {!user && (
            <Nav.Link eventKey={2} href="/signup">
              Signup
            </Nav.Link>
          )}
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  );
}

export default TextLinkExample;