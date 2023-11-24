import React, {useRef, useState } from 'react';
import "./signupinstyles.css";
import Input from '../InputComponent/input';
import Button from '../Buttoncomponent/button';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { auth,db,provider } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc} from "firebase/firestore"; 

function Signupin()
{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmpassword,setConfirmPassword]=useState("");
    const [loginForm,setLoginForm]=useState(false);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    function SignupWithEmail()
    {
      setLoading(true);
      //alert("login");
      console.log("Name",name);
       console.log("Email",email);
       console.log("Password",password);
       console.log("Confirm Password",confirmpassword);
       //Authenticate the user or,basically create a new user account using email with password
   if(name!= "" && email!= "" && password!= "" && confirmpassword!= "")
       {
        if(password===confirmpassword)
        {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
             console.log("User>>>",user);
             toast.success("User created");
             setLoading(false);
             setName("");
             setEmail("");
             setPassword("");
             setConfirmPassword("");
             createDoc(user);
             navigate("/dashboard");
             //create a doc with user id as following id

            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              toast.error(errorMessage);
              setLoading(false);
              // ..
            });
        }else{
          toast.error("password and confirm password are not matching");
          setLoading(false);
        }
                          
       }
       else{
             toast.error("all fields are mandatory");
             setLoading(false);
       }
    }

    function loginUsingEmail(){
      console.log("Email",email);
      console.log("Password",password);
      setLoading(true);
      if( email!= "" && password!= "" )
      {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("User Logged in");
          console.log("User Logged in",user);
          setLoading(true);
          //createDoc(user);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
          
        });
      } else{
        toast.error("all fields are mandatory");
        setLoading(false);
        
  }
      

    }
     async function createDoc(user){
      setLoading(true);
        //make sure that the doc with the uid doesn't exist
        //create a doc
        if(!user) return;

        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) {
          try{
            await setDoc(doc(db, "users", user.uid), {
              name:user.displayName ? user.displayName : name,
              email:user.email,
              photoURL: user.photoURL ? user.photoURL : "",
              createdAt:new Date(),});
              toast.success("doc Created!");
              setLoading(false);
          }catch(e){
            toast.error(e.message);
          }
        
        }else{
          toast.error("Doc already exists");
          setLoading(false);
        }
      }


    function googleAuth(){
      
      setLoading(true);
      try{
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("USER",user);
            createDoc(user);
            setLoading(false);
            navigate("/dashboard");
            toast.success("User Authenticated");
            
          }).catch((error) => {
            setLoading(false);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
          });

      }catch(e){
        setLoading(false);
        toast.error(e.message);
      }
        

  }


  return (
    <>
    {
      loginForm ? (<div className='signupin-wrapper'>
      <h2 className='title'>
        Login on 
      <span style={{color:" var(--theme) " }}> Financely </span></h2>

      <form>
          
            <Input 
            label = {"Email"} 
            type="email"
            state={email}
            setState={setEmail}
            placeholder ={"JoneDoe@gmail.com"}/>

          <Input 
            label = {"Password"} 
            type="password"
            state={password}
            setState={setPassword}
            placeholder ={"Example@123"}/>

          
          <Button
           disabled={loading}
          text={loading ? "Loading...." :"Login using Email and Password"} 
          onClick={loginUsingEmail} />

          <p  className="p-login" >OR</p>

          <Button onClick={googleAuth}
          
          text={loading ? "Loading...." : "Login using Google"}  blue={true} />

          <p className="p-login" onClick={()=>setLoginForm(!loginForm)}>OR Don't Have An Acoount Already? Click Here</p>
      </form>
  </div>
      ):(
    <div className='signupin-wrapper'>
        <h2 className='title'>
        Sign Up on <span style={{color:" var(--theme) " }}> Financely </span></h2>

        <form>
            <Input 
              label = {"Full Name"} 
              state={name}
              setState={setName}
              placeholder ={"Jone Doe"}/>
              
              <Input 
              label = {"Email"} 
              type="email"
              state={email}
              setState={setEmail}
              placeholder ={"JoneDoe@gmail.com"}/>

            <Input 
              label = {"Password"} 
              type="password"
              state={password}
              setState={setPassword}
              placeholder ={"Example@123"}/>

            <Input 
              type="password"
              label = {"Confirm Password"} 
              state={confirmpassword}
              setState={setConfirmPassword}
              placeholder ={"Example@123"}/>


            <Button
             disabled={loading}
            text={loading ? "Loading...." :"Sign up using Email and Password"} onClick={SignupWithEmail} />
           
            <p style={{textAlign:'center', margin:0}}>OR</p>

            <Button onClick={googleAuth}
            text={loading ? "Loading...." : "Sign up using Google"}  blue={true} />
            <p className="p-login" onClick={()=>setLoginForm(!loginForm)}>OR Have An Acoount Already? Click Here</p>
        </form>
    </div>
    )
    }
    </>
  );
}

export default Signupin;