import React from 'react';
import './App.css';
import {Homepage} from './pages/homepage/homepage.component';

import {Switch,Route} from 'react-router-dom';
import ShopPage from './components/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';

import {auth} from './firebase/firebase.utils';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser:null
    }
  }
  
  unsubscribeFromAuth = null;
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user=>{
      this.setState({
        currentUser:user
      })

      console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div className='App'>
        <Header currentUser={this.state.currentUser} />
        {/* <Homepage /> */}
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
  
        </Switch>
      
  
      </div>
    );
  }
 
}

export default App;
