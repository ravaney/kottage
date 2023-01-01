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
            <a>
              <img className={navStyles.logo} src="/blue.png" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/Properties">
            <a>Properties</a>
          </Link>
        </li>
      </ul>
      <ul style={{ margin: "0px", padding: "0px" }}>
        {!user ? (
          <li style={{ margin: "0px", padding: "0px" }}>
            <Link href="/Authentication/Login">
              <a>Login</a>
            </Link>
          </li>
        ) : (
          <li>
            <a>
              <div style={{ color: "green" }}>Welcome {user?.email}</div>
              <div
                onClick={handleLogout}
                style={{ color: "black", cursor: "pointer" }}
              >
                Logout
              </div>
            </a>
          </li>
        )}
        <li>
          <AccountMenu className={navStyles.pfp} />
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
