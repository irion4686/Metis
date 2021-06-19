import Login from './Components/Login/Login';
import { useState } from 'react';
import './App.css';
import MainPage from './Components/MainPage/MainPage';
import Wrapper from './Components/Helpers/Wrapper';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const loginHandler = event => {
    setLoggedIn(event);
  }

  return (
    <Wrapper>
      {!loggedIn && <Login onLogIn={loginHandler}/>}
      {loggedIn && <MainPage onLogOut={loginHandler} />}
    </Wrapper>
    
  );
}

export default App;
