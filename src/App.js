import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Routers from './routers';
import Header from './common/header/header';
import Footers from './common/footer/footer';
import ImageCatagoryContext from './context/imageCatagory';
import SideFilter from './sideFilter';


export default function App() {
  const [searchText, setSearchText] = useState('');
  return (
    <ImageCatagoryContext.Provider value={{searchText,setSearchText}}>
      <Router>
        <Header></Header>
        <div className="d-flex flex-colums w-100">
          <SideFilter></SideFilter>
          <Routers></Routers>
        </div>
        {/* <Footers></Footers> */}
      </Router>
      
    </ImageCatagoryContext.Provider>
  );
}