import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountMenu from "../components/AccountMenu.js";
import { useState, useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const Nav = () => {
  const [login, setLogin] = useState("false");
  var loginButton;

  if (login == "true") {
    loginButton = <LoginIcon style={{ color: "green" }} />;
  } else loginButton = <LogoutIcon style={{ color: "red" }} />;

  useEffect(() => {
    login, loginButton;
  }, []);

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">
            <a>
              <img className={navStyles.logo} src="/blue.png" />
            </a>
          </Link>
        </li>
      </ul>
      <ul>
        {/* <li>{loginButton}</li> */}
        <li>
          <AccountMenu className={navStyles.pfp} />
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
