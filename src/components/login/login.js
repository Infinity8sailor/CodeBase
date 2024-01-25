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
import GuestIcon from "./../data/images/dummy_icon.png";

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

  useEffect(() => {
    if (_user) setUser(_user);
    else setUser(dummy_user);
  }, [_user]);

  return (
    <>
      {loggedIn ? (
        <>
          <div
            className="flex cursor-pointer h-10 bg-white rounded-md px-1"
            onClick={toggleCollapse}
          >
            <img
              src={user?.img_url ? user?.img_url : GuestIcon}
              className="h-10 p-0 rounded-[50%] "
              alt="User"
            />
            <div className="hidden md:visible lg:flex text-black py-2 pl-1 text-ellipsis">
              {user.user_name}
            </div>
          </div>
          {isOpen ? (
            <div className="absolute top-12 bg-white rounded-lg">
              <button className="rounded-md m-2" onClick={signOut}>
                Logout
              </button>
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
          />
        </GoogleOAuthProvider>
      )}
    </>
  );
};
