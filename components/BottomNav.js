import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import AccountMenu from "../components/AccountMenu.js";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { IconButton } from "@mui/material";
const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">About</Link>
        </li>
      </ul>
      <ul>
        <li>
          <a href="www.facebook.com" target="_blank" aria-label="Facebook Link">
            <FacebookIcon className={navStyles.pfp} />
          </a>
        </li>
        <li>
          <a
            href="www.instagram.com"
            target="_blank"
            aria-label="Instagram Link"
          >
            <InstagramIcon className={navStyles.pfp} />
          </a>
        </li>
        <li>
          <a href="www.twitter.com" target="_blank" aria-label="Twitter Link">
            <TwitterIcon className={navStyles.pfp} />
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
