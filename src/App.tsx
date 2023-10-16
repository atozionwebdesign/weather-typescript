import React from 'react';
// import logo from './logo.svg';
import './App.css';
import WeatherContent from './components/WeatherContent/WeatherContent';
import Header from './components/Header/Header';
import GlobalStyle from './globalStyles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

function App() {
  library.add(fas)
  return (
    <>
      <GlobalStyle/>
      <Header/>
      <WeatherContent/>
    </>
  );
}

export default App;
