import React, {  useEffect } from 'react';

import Card from './UI/Card';
import './Auth.css';
// import { AuthContext } from './../context/auth-context'
import { useStore } from './../hooksStore/store'

const Auth = () => {

  const dispatch = useStore(false)[1]

  console.log('RENDERING AUTH BEFORE');
  useEffect(() => {
    console.log('RENDERING AUTH');
  });

  const loginHandler = () => {
    dispatch('LOGIN')
  };

  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
