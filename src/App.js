import Login from './components/login/login';
import { useState } from 'react';
import './App.css';
import MainPage from './components/main_page/main_page';
import Signup from './components/signup/signup';
import Wrapper from './components/helpers/Wrapper';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  //const [loggedIn, setLoggedIn] = useState(true);

  const [signup, setSignUp] = useState(false);

  const loginHandler = event => {
    setLoggedIn(event);
  };

  const signupHandler = event => {
    setSignUp(event);
  };

  return (
    <Wrapper>
      {!loggedIn && !signup && <Login onSignup={signupHandler} onLogIn={loginHandler}/>}
      {!loggedIn && signup && <Signup />}
      {loggedIn && <MainPage onLogOut={loginHandler} />}
    </Wrapper>
    
  );
}

export default App;
