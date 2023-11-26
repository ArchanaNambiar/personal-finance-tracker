import React, { useEffect } from 'react';
import "./headerstyles.css";
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import userImg from "../../assets/user.svg"

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);


  function logoutfunc(){
    try{
      signOut(auth)
      .then(() => {
        
        // Sign-out successful.
        toast.success("Sign-out successful.");
        navigate("/");
      }).catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
    }catch (e){
      toast.error(e.message);
    }
  }
  return (
    <div className="navbar">
    <p className='logo'>Finance Tracker</p>
    
    {user && (
    <div style={{display:"flex",alignItems:"center",gap:"0.75rem", paddingRight: "10px"}}>
      <img 
         src={user.photoURL ? user.photoURL :userImg}
         
         style={{borderRadius:"50%",height:"1.5rem",  width:"1.5rem"}}
        />
       <p className='logo-link' onClick={logoutfunc}>Logout</p>
    </div>
    )}

    
  </div>
  )
}

export default Header;