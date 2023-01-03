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
      <ul>
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
          <li style={{ margin: "0px", padding: "0px" }}>
            <Link href="/Authentication/Login">Login </Link>
          </li>
        ) : (
          <div>
            <div style={{ color: "green" }}>Welcome {user?.email} </div>
            <li>
              <Link href="/Account">Account</Link>
            </li>
            <div
              onClick={handleLogout}
              style={{ color: "black", cursor: "pointer" }}
            >
              Logout
            </div>
          </div>
        )}
        <li>
          <AccountMenu className={navStyles.pfp} />
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
