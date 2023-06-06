import React,{useState,useEffect,useContext} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Homemodule.css'
import Loader from "../Loader/Loader";
import TextLinkExample from "../Navbar";
import { UserContext } from "../UserContext";
import { auth } from '../../firebase';

function Home(props) {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');


  // const { userName } = props;

  
  // const { userName } = useContext(UserContext);


  useEffect(() => {
    console.log('userName:', userName);
  }, [userName]);


  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState({});
  
  const [data,setData] = useState([]);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(true);
  const [hasmore,setHasmore] = useState(false);
  const [isNameLoaded, setIsNameLoaded] = useState(false);

  const handleClose = (itemId) => {
    setShowModal(prevState => ({
      ...prevState,
      [itemId]: false
    }));
  };

  const handleShow = (itemId) => {
    setShowModal(prevState => ({
      ...prevState,
      [itemId]: true
    }));
  };

  useEffect( ()=>{
    const fetchData = async()=>{
    try{
    const response = await fetch(
      `https://fakestoreapi.com/products?per_page=8&page=${page}`,
    );
    const data = await response.json();
    console.log(data)
    setData(prev=> [...prev,...data])
    setHasmore(response.data.docs.length>0);
    setLoading(false);
    }catch(error){
      console.log(error);
    }
  }
  fetchData();
  },[page])

  

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
const totalPages = Math.ceil(20/4)
    if (scrollTop + clientHeight >= scrollHeight) {
      if(page===totalPages)setPage(1);
        setPage((prev) => prev + 1);
    }
};


useEffect(()=>{
  window.addEventListener("scroll",handleScroll);

  return ()=>window.removeEventListener("scroll",handleScroll)
},[])




useEffect(() => {
  if (userName) {
    setIsNameLoaded(true);
  }
}, [userName]);


useEffect(() => {
  const fetchUserData = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const email = currentUser.email;
      const emailWithoutDomain = email.replace(/@gmail\.com$/, '');
      setUserEmail(emailWithoutDomain);
      localStorage.setItem("userEmail", emailWithoutDomain)

      const displayName = currentUser.displayName;
      setUserName(displayName);
    }
  };

  fetchUserData();
}, []);


useEffect(() => {
  const storedEmail = localStorage.getItem("userEmail");
  if (storedEmail) {
    const emailWithoutDomain = storedEmail.split("@")[0]; // Extract email without domain
    setUserEmail(emailWithoutDomain);
  }
}, []);






  return (
    <>
<TextLinkExample userName={userName}/>
    <div>
      <div>
         
      </div>

      {/* <h2 className="welcome">{userName ? `Welcome ${userName}` : "Guest"}</h2> */}
      <h2 className="welcome">{userEmail ? `Welcome ${userEmail}` : "Guest"}</h2>




{/* infinite scroll  */}

<div>
  <div className='itemlist'>
  


{data.map((item )=> (
    <Card style={{ width: '18rem',height:'29em' }} key={item.id} className='card'>
      <Card.Img variant="top" src={item.image} alt={item.title} className='card_image'/>
      <Card.Body key={item.id}>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text className='card_info'>
          {item.category.toUpperCase()}
          <br></br>
        <b>${item.price}</b>

        </Card.Text>
        {/* <Link to={`/shop/${item.id}`}>{item.name}</Link> */}
        <Button variant="primary" onClick={()=>handleShow(item.id)}>More</Button>
        <Modal show={showModal[item.id]} onHide={() => handleClose(item.id)}
      centered aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header >
          <Modal.Title  id="contained-modal-title-vcenter">{item.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{item.description}</Modal.Body>
        <Modal.Title  id="contained-modal-title-center">RATINGS: {item.rating.rate}⭐</Modal.Title>
        <Modal.Footer style={{justifyContent:"center"}}>
          <Button variant="secondary" onClick={() => handleClose(item.id)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Card.Body>
    </Card>
      ))}

    </div>
{loading && <Loader/>}


    </div>
</div>
    </>
  );
}

export default Home;