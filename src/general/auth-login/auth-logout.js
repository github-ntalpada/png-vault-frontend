import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import './auth.css'
import { FaDoorOpen } from "react-icons/fa";
import { Button } from "react-bootstrap";



const LogoutButton = () => {
  const { user, logout } = useAuth0();

  return (
      <a className="logout-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>LogOut</a>
  );
};

export default LogoutButton;