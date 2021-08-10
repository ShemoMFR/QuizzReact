import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../Header/header';
import Landing from '../Landing/landing';
import Footer from '../Footer/footer';
import Welcome from '../Welcome/welcome';
import Login from '../Login/login';
import Signup from '../Signup/signup';
import ErrorPage from '../ErrorPage/errorpage'
import ForgetPassword from '../ForgetPassword/forgetpassword';
import '../../App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path='/forgetpassword' component={ForgetPassword} />
          <Route component={ErrorPage} />
        </Switch>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
