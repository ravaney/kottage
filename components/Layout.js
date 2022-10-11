import Nav from "./Nav";
import styles from "../styles/Layout.module.css";
import BottomNav from "../components/BottomNav";
const Layout = ({ children }) => {
  return (
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
  );
};
export default Layout;
