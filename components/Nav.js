import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import AccountMenu from "../components/AccountMenu.js";
import { useAuth } from "./contexts/userContext";
import { useRouter } from "next/router";

const Nav = () => {
  const { logout, user } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    try {
      await logout();
      console.log("logged out");
      router.push("/");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <nav className={navStyles.nav}>
      <ul style={{ margin: "0px", paddingLeft: "10px" }}>
        <li>
          <Link href="/">
            <img
              className={navStyles.logo}
              src="/blue.png"
              style={{ cursor: "pointer" }}
            />
          </Link>
        </li>
        <li>
          <Link href="/Properties">Properties</Link>
        </li>
      </ul>
      <ul style={{ margin: "0px", padding: "0px" }}>
        {!user ? (
          <ul>
            <li style={{ margin: "0px", padding: "0px" }}>
              <Link href="/Authentication/Login">Login </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <div style={{ color: "green" }}>Welcome {user?.displayName} ! </div>
            <li>
              <Link href="/Account">Account</Link>
            </li>
            <div
              onClick={handleLogout}
              style={{ color: "black", cursor: "pointer" }}
            >
              Logout
            </div>
          </ul>
        )}
        <li style={{ margin: "0px" }}>
          <AccountMenu className={navStyles.pfp} />
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
