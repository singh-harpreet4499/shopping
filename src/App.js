import React from 'react';
import './App.css';
import {Homepage} from './pages/homepage/homepage.component';

import {Switch,Route} from 'react-router-dom';
import ShopPage from './components/shop/shop.component';
import Header from './components/header/header.component';


const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)
function App() {
  return (
    <div className='App'>
      <Header />
      {/* <Homepage /> */}
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    

    </div>
  );
}

export default App;
