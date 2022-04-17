import React from "react";
import "./nav_bar.css";
// import { Pages } from "../pages";
import { LoginTab } from "../login/login";
// import LoginTab from "./components/login/login";
import { useDispatch } from "react-redux";
import { selectPage } from "./../../actions/index";

export const Nav = (props) => {
  // const page = useSelector((state) => state.page_live);
  const dispatch = useDispatch();
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="navbar-brand" >
          Admin-io
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav  mb-2 mb-lg-0">
            <li class="nav-item">
              <div
                className="nav-link"
                onClick={() => dispatch(selectPage("Home"))}
              >
                Home
              </div>
            </li>
            <li class="nav-item">
              <div
                className="nav-link"
                onClick={() => dispatch(selectPage("Apps"))}
              >
                Apps
              </div>
            </li>
            <li class="nav-item">
              <div
                className="nav-link"
                onClick={() => dispatch(selectPage("Tasks"))}
              >
                Tasks
              </div>
            </li>
            <li class="nav-item">
              <div
                className="nav-link"
                onClick={() => dispatch(selectPage("Projects"))}
              >
                Projects
              </div>
            </li>
            <li class="nav-item">
              <div
                className="nav-link"
                // onClick={() => dispatch(selectPage("Profile_io"))}
              >
                Profile-io
              </div>
            </li>
            <li class="nav-item dropdown">
              <div
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </div>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <div
                    className="dropdown-item"
                    onClick={() => dispatch(selectPage("Users"))}
                  >
                    Users
                  </div>
                </li>
                <li>
                  <div
                    className="dropdown-item"
                    onClick={() => dispatch(selectPage("Leetcode"))}
                  >
                    Leetcode
                  </div>
                </li>
                {/* <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li> */}
                <li>
                  <hr class="dropdown-divider" />
                </li>
                {/* <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li> */}
              </ul>
            </li>
          </ul>
          <form class=" ultiSearch d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Ultimate Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Go
            </button>
          </form>
          <div
            className="Glogin"
            style={{
              float: "right",
              height: "auto",
              width: "auto",
              padding: 0,
            }}
          >
            <LoginTab
              data={props.data}
              // data={{
              //   auth_info: dispatch(userInfo()),
              //   signout: dispatch(toggleLogin()),
              //   loggedIn: log_in_status,
              // }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
