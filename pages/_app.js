import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthUserProvider } from "../components/contexts/userContext";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </Layout>
  );
}

export default MyApp;
