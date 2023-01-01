import Nav from "./Nav";
import styles from "../styles/Layout.module.css";
import BottomNav from "../components/BottomNav";
import { AuthUserProvider } from "./contexts/userContext";
const Layout = ({ children }) => {
  return (
    <AuthUserProvider>
      <>
        <Nav />
        <div className={styles.Container}>
          <main className={styles.main}>
            {/* <Header /> */}
            {children}
          </main>
        </div>
        <BottomNav />
      </>
    </AuthUserProvider>
  );
};
export default Layout;
