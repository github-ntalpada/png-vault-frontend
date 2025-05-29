
import React, { useState,useContext, useEffect } from "react";
import './header.css'
import {
  Link,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge'
import LoginButton from '../../general/auth-login/auth-login'
import LogoutButton from '../../general/auth-login/auth-logout'
import { useAuth0 } from "@auth0/auth0-react";
import ImageCatagoryContext from "../../context/imageCatagory";
import { FaCartArrowDown, FaPagelines, FaRecordVinyl, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Col, Image, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { TextField } from "@mui/material";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import SideFilter from "../../sideFilter";

export default function Header() {
  const context = useContext(ImageCatagoryContext);
  const {setSearchText } = context;
  const { user, loginWithRedirect, isAuthenticated} = useAuth0();
  // const adminuser = ['auth0|660e8e4e87f5f10dda5c0a8e'];
  const [siteLogo, setSiteLogo] = useState('')
  const [HeaderBG, setHeaderBG] = useState('')
  const [headerHeight, setheaderHeight] = useState('')

  const [formData, setFormData] = useState({
    serach : ''
  });
  const cart = useSelector((state) => state.cart)

  const handleSubmit = (event) => {
    event.preventDefault();
    var search = formData.search;
    setSearchText(search);
  }
  
  useEffect(() => {
    const storage = getStorage();
    const listRef1 = ref(storage, 'siteLogo/PV-icon.png');
    const listRef2 = ref(storage, 'siteLogo/header-bg.png');
    const image1 = getDownloadURL(listRef1)
    const image2 = getDownloadURL(listRef2)
    image1.then(siteLogo => setSiteLogo(siteLogo))
    image2.then(siteLogo => setHeaderBG(siteLogo))
    // listAll(listRef)
    // .then((res) => {
    //   console.log(res)
    //   res.items.forEach((itemRef) => {

    //     if(itemRef.name == 'pngvalt-full-logo.png'){
    //       setSiteLogo('+itemRef.fullPath)
    //     }
    //   });
    // }).catch((error) => {
    // });
    // const headerHeight = window.location.pathname == '/' ? '440px' : '100px';
    // setheaderHeight(headerHeight)
  })

  const count = () => {
    let total = 0
    if(cart !== undefined){
      cart.forEach(element => {
        total += element.quantity
      });
      return total
    }
  }
  
  var divStyle = {
    // backgroundImage: 'url(' + HeaderBG + ')',
    // height: '70px'
  };

  return (
      <div className="header-main" style={divStyle}>
        <Container>
          <Row>
            <Col sm="2" md="2" xl="2" className="d-flex justify-content-center align-items-center m-0">
              <Link to="/"><Image src={siteLogo} width={40}/></Link>
            </Col>
            
            {/* <Col sm="8" md="8" xl="8" className="d-flex justify-content-end align-items-center">
              <Navbar>
                <Nav className="gap-3">
                    <Link to="/">Home</Link>
                    <Link to="/uploadimages">Add Image</Link>
                    <Link to="/uploadimages">Add Catagory</Link>
                </Nav>
              </Navbar>
            </Col> */}
            
            <Col sm="7" md="7" xl="7" className="d-flex justify-content-end align-items-center">
              {/* <Navbar>
                <Nav className="gap-3">
                    <Link to="/">Home</Link>
                    <Link to="/contact">Contact</Link>
                </Nav>
              </Navbar> */}
            </Col>
            
            <Col sm="3" md="3" xl="3" className="d-flex justify-content-center align-items-center p-0 gap-2">
              
              {isAuthenticated ? 
              <div className="d-flex flex-row justify-content-center gap-2">
                <div className="d-flex flex-column justify-content-center align-items-end">
                  <span><strong>Welcome,</strong> {user.name}</span>
                  <Badge bg="success">Free User</Badge>
                </div>
                <div className="user-account">
                  {/* <Navbar className="d-flex justify-content-end mt-2 mb-2 border-left-1">
                    <Nav className="d-inline-flex  gap-2">
                        <Link className="add-cart" to="/cart"><FaCartArrowDown size={23} />{count() ? <div className="cart-count">{count()}</div> : ''}</Link>
                    </Nav>
                  </Navbar> */}
                  <Dropdown className="profile-dropdown">
                    <Dropdown.Toggle id="dropdown-basic">
                      <img src={user.picture} alt={user.name} width={40} height={40}/>
                    </Dropdown.Toggle>  
              
                    <Dropdown.Menu align={"end"}>
                      <Navbar>
                        <Nav className="profile-dropdown-list">
                          <Dropdown.Item className="profile-dropdown-item"><Link to="/profile">Profile</Link></Dropdown.Item>
                          {/* <Dropdown.Item className="profile-dropdown-item"><Link to="/order">My Order</Link></Dropdown.Item> */}
                          <Dropdown.Item className="profile-dropdown-item"><LogoutButton></LogoutButton></Dropdown.Item>
                        </Nav>
                      </Navbar>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              :
              <Navbar className="d-flex justify-content-end m-0">
                <Nav className="d-inline-flex gap-2">
                    
                    {/* <Link className="add-cart" onClick={() => loginWithRedirect()}><FaCartArrowDown size={23} /></Link> */}
                    <LoginButton></LoginButton>
                </Nav>
              </Navbar>
              }
            </Col>
          </Row>
          
          {/* {
            window.location.pathname == '/' ?
            <Row className="main-header-title">
            <Col className="col" sm="12" md="12" xl="12">
              <h1>Elevate Your Design with Our Iconic Images</h1>
              <p>Download Free images and Icons made for everyone in most usable formats.</p>
              <TextField className="serach-box" placeholder="Search for all image on pngvalt.."></TextField>
            </Col>
          </Row> : 
          ''
          } */}
          
        </Container>
      </div>
  );
}
