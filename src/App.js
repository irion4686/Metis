import Login from './components/login/Login';
import { useState } from 'react';
import './App.css';
import MainPage from './components/main_page/main_page';
import Wrapper from './components/helpers/Wrapper';

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
