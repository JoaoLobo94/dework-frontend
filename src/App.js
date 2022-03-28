import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from "./signInPage/signIn";
import SignUp from "./signInPage/signUpPage/signUp";

function App() {
  return (
    <Router>
        <div>
        <Routes>
          <Route path="/" exact component={<SignIn />} />
          <Route path="/sign-up" exact component={<SignUp />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
