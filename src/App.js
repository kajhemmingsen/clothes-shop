import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './Pages/homepage/homepage-component.jsx';
import ShopPage from './Pages/shop/shop-component.jsx';
import SignInAndSignUpPage from './Pages/sign-in-and-sign-up/sign-in-and-sign-up-component.jsx';
import CheckoutPage from './Pages/checkout/checkout-component';

import Header from './Components/header/header-component.jsx';
import { auth, createUserProfileDocument } from './Firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
class App extends React.Component {
  
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        })
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
        <div>
          <Header/>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage}/>
            <Route exact path='/signin' render={() =>
            this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)} />
          </Switch>
          
        </div>
      );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
