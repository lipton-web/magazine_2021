import './App.css';
import React from 'react';

import { Route } from 'react-router-dom';

import PostList from './pages/PostList';
import Login from './pages/Login';
import Header from './components/Header';
import Signup from './pages/Signup';


function App() {
  return (
    <div className="App">
      <Header/>
      <Route path = "/" exact component={PostList} />
      <Route path = "/login" exact component={Login} />
      <Route path = "/signup" exact component={Signup} />

    </div>
  );
}

export default App;
