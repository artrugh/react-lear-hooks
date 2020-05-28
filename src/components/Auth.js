import React from 'react';

import './Auth.css';

import { useStore } from './../hooksStore/store'

const Auth = () => {

  const dispatch = useStore(false)[1]

  // console.log('RENDERING AUTH BEFORE');
  // useEffect(() => {
  //   console.log('RENDERING AUTH');
  // });

  const loginHandler = () => {
    dispatch('LOGIN')
  };

  return (
    <div className="auth">
      <div className="card">
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </div>
    </div>
  );
};

export default Auth;
