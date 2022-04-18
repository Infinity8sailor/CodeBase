import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import {  useDispatch, useSelector } from "react-redux";
import { Login } from "../data/data";
import { toggleLogin, userInfo } from "../../actions";
const {REACT_APP_CLIENT_ID} = process.env;


const CLIENT_ID = REACT_APP_CLIENT_ID;

export const LoginTab = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user_id, setUser_id] = useState("");
  const [user_name, setUser_name] = useState("Guest");
  const [auth_token, setAuth_token] = useState("");
  const [img_url, setImg_url] = useState("https://www.flaticon.com/premium-icon/guests_3044552");
  const loggedIn = useSelector((state) => state.log_in_status);
  // const userInfo_state = useSelector((state) => state.user_info);
  const dispatch = useDispatch();
  

  
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
    };
  
  const onSignIn = (googleUser) => {
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId());
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail());

    // dispatch(toggleLogin(true)); // this.setState({ loggedIn: true });
    setUser_id(profile.getId());
    setUser_name(profile.getName());
    setImg_url(profile.getImageUrl());
    
    
    Login([
      profile.getId(),
      profile.getName(),
      profile.getEmail(),
      profile.getImageUrl(),
    ]).then((data) => {
       console.log("login auth info : ",user_id,auth_token, data.data );
      setAuth_token(data.data["auth-token"]);
      // this.props.data.auth_info(data.data["auth-token"], profile.getEmail());
      dispatch(toggleLogin(true)); // this.setState({ loggedIn: true });
      props.data.loggedIn(true);
      // console.log("props : ", props);
      var payload = {
        user_id: profile.getId(),
        img_url: profile.getImageUrl(),
        user_name: profile.getName(),
        user_email: profile.getEmail(),
        auth_token : data.data["auth-token"],
      };
      dispatch(userInfo(payload));
    });
  };
  
  const signOut = () => {
    console.log("User signed out.");
    dispatch(toggleLogin(false)); // this.setState({ loggedIn: true });
    // this.props.data.signout();
    // this.props.data.loggedIn(false);
  };

  useEffect(() => {
    console.log(" js Platform >> Did_Mount");
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <loginTab>
        {loggedIn ? (
            <>
          <div style={{ display: "flex", cursor:"pointer" }} onClick={toggleCollapse}>
            <img
              src={img_url}
              style={{ height: "40px", padding: 0, borderRadius: "50%" }}
              alt=""
            />
            <div style={{ padding: "10px 10px", color : "white" }}>{user_name}</div>
            </div>
            {isOpen ? 
            <div className="Glogout">
              <GoogleLogout
                clientId={CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={signOut}
                ></GoogleLogout>
            </div>:
            <></>
            }
            </>
        ) : (
          <GoogleLogin
            clientId={CLIENT_ID}
            onSuccess={onSignIn}
            isSignedIn={true}
          />
        )}
      </loginTab>
  );
}
