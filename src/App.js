import Login from './components/login/login';
import {useEffect, useState} from 'react';
import './App.css';
import MainPage from './components/main_page/main_page';
import Signup from './components/signup/signup';
import Wrapper from './components/helpers/Wrapper';

const SERVER = 'http://ec2-44-193-80-73.compute-1.amazonaws.com:3001/';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  //const [loggedIn, setLoggedIn] = useState(true);

  const [signup, setSignUp] = useState(false);

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem('loggedIn') === 'true');
  }, [])

  const loginHandler = event => {
    console.log("logged in now for real...");
    setSignUp(false);
    if (event === true) {
      setLoggedIn(true);
      sessionStorage.setItem('loggedIn', 'true');
    } else {
      setLoggedIn(false);
      sessionStorage.removeItem('loggedIn');
    }
  };

  const signupHandler = event => {
    setSignUp(event);
  };

  return (
    <Wrapper>
      {!loggedIn && !signup && <Login onSignup={signupHandler} onLogIn={loginHandler}/>}
      {!loggedIn && signup && <Signup onSignup={loginHandler} />}
      {loggedIn && <MainPage onLogOut={loginHandler} />}
    </Wrapper>
    
  );
}

export default App;
