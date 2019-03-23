import React, { Component } from 'react';
import Routes from './components/Route/Routes';
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';
import './sass/index.sass';


class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;
