import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import HomePage from './Pages/homepage/homepage-component.jsx';
import ShopPage from './Pages/shop/shop-component.jsx';
import SignInAndSignUpPage from './Pages/sign-in-and-sign-up/sign-in-and-sign-up-component.jsx';
import Header from './Components/header/header-component.jsx';
import { auth } from './Firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
        <div>
          <Header currentUser={this.state.currentUser}/>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/shop' component={ShopPage} />
            <Route exact path='/signin' component={SignInAndSignUpPage} />
          </Switch>
          
        </div>
      );
  }
}

export default App;
