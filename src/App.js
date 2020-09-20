import React from 'react';
import './App.css';
import {Homepage} from './pages/homepage/homepage.component';

import {Switch,Route,Redirect} from 'react-router-dom';
import ShopPage from './components/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { connect } from 'react-redux';

import { setCurrentUser } from "./redux/user/user.actions";

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)
class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentUser:null
  //   }
  // }
  
  unsubscribeFromAuth = null;
  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      // this.setState({
      //   currentUser:user
      // })

      // console.log(user);

      // createUserProfileDocument(user)
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);
        (await userRef).onSnapshot(snapshot=>{
          // console.log(snapshot.data());
          /*
          this.setState({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data()
            }
          },()=>{
            console.log(this.state);

          }
          )
          */
        //  this.props.setCurrentUser({
         setCurrentUser({

            id:snapshot.id,
            ...snapshot.data()
          })
        })

      }

      // this.setState({currentUser:userAuth})
      setCurrentUser(userAuth);

    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div className=''>
        {/* <Header currentUser={this.state.currentUser} /> */}
        {/* <Homepage /> */}
        <Header  />

        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={()=>this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
  
        </Switch>
      
  
      </div>
    );
  }
 
}
const mapStateToProps = ({user}) => ({
  currentUser : user.currentUser
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
