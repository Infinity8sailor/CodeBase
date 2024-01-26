import { useEffect, useState } from "react";
import "./App.css";
import { LoginTab } from "./components/login/login";
import { Pagex } from "./components/pages/index";
import { GuestLoginTab } from "./components/login/guest_login";
import { useSelector } from "react-redux";

const App = () => {
  const _loggedIn = useSelector((state) => state.log_in_status);

  const [state, setState] = useState({
    auth_token: "empty..",
    user: "Guest",
    loggedIn: _loggedIn || false,
  });

  const loggedIn = (loggedIn) => {
    setState({ ...state, loggedIn });
  };

  const signOut = () => {
    setState({
      auth_token: "empty..",
      user: "Guest",
      loggedIn: false,
    });
  };
  useEffect(() => {
    loggedIn(_loggedIn);
  }, [_loggedIn]);

  return (
    <div className="h-full w-full flex flex-col">
      <header>
        <div className="max-h-10 w-full flex justify-between">
          <div className="top-wrapper-title">Code-Base</div>
          <div className="mr-3">
            <LoginTab
              data={{
                signout: signOut,
                loggedIn: loggedIn,
              }}
            />
          </div>
        </div>
      </header>
      <main className="flex-1 flex justify-center overflow-hidden items-center p-2 bg-[url('./../public/bg-image.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
        {state.loggedIn === true ? (
          <>
            <Pagex />
          </>
        ) : (
          <div className="flex flex-col gap-5 justify-center rounded-lg items-center bg-white py-5 text-black">
            <div className="flex flex-col gap-4 flex-wrap justify-center items-center px-4">
              <h1 className="text-5xl lg:text-7xl"> Code-Base</h1>
              <h1 className="text-3xl text-center">
                Welcome to Code-Base Web App
              </h1>
            </div>
            <div className="flex flex-col gap-2 lg:gap-4 justify-center items-center bg-gray-300 px-2 w-80 lg:w-[550px] lg:px-5 pt-2 pb-4 rounded-md">
              <h1 className="text-3xl">Log In</h1>
              <div className="flex flex-col lg:flex-row gap-3  justify-center">
                <div className="flex flex-col w-64 gap-2 justify-center lg:items-end">
                  <h1 className="text-xl">With Google</h1>
                  <LoginTab
                    data={{
                      signout: signOut,
                      loggedIn: loggedIn,
                    }}
                  />
                </div>
                <div className="flex flex-col w-28 lg:w-48 gap-2 justify-around items-start">
                  <h1 className="text-xl">As a Guest</h1>

                  <GuestLoginTab data={{ loggedIn: loggedIn }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
