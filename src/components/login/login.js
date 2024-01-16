import React, { useState, useEffect } from "react";
import {
  GoogleOAuthProvider,
  googleLogout,
  GoogleLogin,
} from "@react-oauth/google";

import { useDispatch, useSelector } from "react-redux";
import { Login } from "../data/data";
import { toggleLogin, userInfo } from "../../actions";
import { jwtDecode } from "jwt-decode";

const { REACT_APP_CLIENT_ID } = process.env;
const CLIENT_ID = REACT_APP_CLIENT_ID;

export const LoginTab = (props) => {
  const _user = useSelector((state) => state.user_info);
  const dummy_user = {
    user_id: "guest",
    img_url: "guest",
    user_name: "Guest",
    user_email: "email",
    auth_token: "auth",
  };
  const loggedIn = useSelector((state) => state.log_in_status);

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(_user || dummy_user);

  const dispatch = useDispatch();

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const onSignIn = (googleUser) => {
    const userObject = jwtDecode(googleUser.credential);
    localStorage.setItem("user", JSON.stringify(userObject));
    const { name, sub, picture, email } = userObject;

    // login to admin io with google credits
    Login({ name, sub, picture, email }).then(async (data) => {
      dispatch(toggleLogin(true)); // this.setState({ loggedIn: true });
      props.data.loggedIn(true);
      var payload = {
        user_id: sub,
        img_url: picture,
        user_name: name,
        user_email: email,
        auth_token: data.data["auth-token"],
      };
      setUser(payload);
      dispatch(userInfo(payload));
    });
  };

  const signOut = () => {
    localStorage.setItem("user", null);
    dispatch(toggleLogin(false));
    googleLogout();
    setIsOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <>
      {loggedIn ? (
        <>
          <div
            style={{ display: "flex", cursor: "pointer", height: "40px" }}
            onClick={toggleCollapse}
          >
            <img
              src={user.img_url}
              style={{ height: "40px", padding: 0, borderRadius: "50%" }}
              alt="Duck"
            />
            <div
              className="hidden md:visible lg:flex"
              style={{ padding: "10px 10px", color: "white" }}
            >
              {user.user_name}
            </div>
          </div>
          {isOpen ? (
            <div className="Glogout">
              <button onClick={signOut}>Logout</button>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <GoogleOAuthProvider clientId={`${CLIENT_ID}`}>
          <GoogleLogin
            onSuccess={onSignIn}
            onFailure={signOut}
            cookiePolicy="single_host_origin"
            auto_select={true}
            theme="filled_black"
            text="continue_with"
            useOneTap={true}
            // size="medium"
          />
        </GoogleOAuthProvider>
      )}
    </>
  );
};
