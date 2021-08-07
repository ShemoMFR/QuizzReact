import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../Header/header';
import Landing from '../Landing/landing';
import Footer from '../Footer/footer';
import Welcome from '../Welcome/welcome';
import Login from '../Login/login';
import Signup from '../Signup/signup';
import ErrorPage from '../ErrorPage/errorpage'
import '../../App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Route exact path="/" component={Landing} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={ErrorPage} />

        <Footer />
      </Router>
    </div>
  );
}

export default App;
