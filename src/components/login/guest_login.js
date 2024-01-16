import React from "react";

import { useDispatch } from "react-redux";
import { GuestLogin } from "../data/data";
import { toggleLogin, userInfo } from "../../actions";

export const GuestLoginTab = (props) => {
  const dispatch = useDispatch();

  const onSignIn = async () => {
    // login to admin io with google credits
   await GuestLogin().then(async (data) => {
      dispatch(toggleLogin(true)); // this.setState({ loggedIn: true });
      props.data.loggedIn(true);
      var payload = {
        user_id: "guest",
        img_url: "picture",
        user_name: "Guest",
        user_email: "guest@gmail.com",
        auth_token: data.data["auth-token"],
      };
      dispatch(userInfo(payload));
    });
  };

  return (
    <>
      <div>
        <button onClick={onSignIn}>Guest Login</button>
      </div>
    </>
  );
};
