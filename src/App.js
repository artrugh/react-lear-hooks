import React from 'react';



import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';

// import { AuthContext } from './context/auth-context'
import { useStore } from './hooksStore/store'

const App = () => {
  // shouldListen true
  const state = useStore()[0]

  return state.isAuth ? <Ingredients /> : <Auth />

};

export default App;
