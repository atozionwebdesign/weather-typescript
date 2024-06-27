import React from "react";
// import logo from './logo.svg';
import "./App.css";
import WeatherContent from "./components/WeatherContent/WeatherContent";
import Header from "./components/Header/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/Footer/Footer";

function App() {
  library.add(fas);
  return (
    <div id="appDiv">
      <Header />
      <WeatherContent />
      <Footer />
    </div>
  );
}

export default App;
