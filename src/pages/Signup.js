import React from 'react'
import Header from '../components/Header/headerindex';
import Signupin from '../components/SignupSignin/signupin';

const Signup = () => {
  return (
    <div><Header/> 
    <div className='wrapper'>
      <Signupin/>
    </div>
    </div>
    
  )
}

export default Signup;