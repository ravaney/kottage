import { useAuth } from "../../components/contexts/userContext";
import { useRouter } from "next/router";
const Logout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async (e) => {
    // validate(e.values);
    e.preventDefault();

    try {
      await logout();
      console.log("loggedout ");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Logout;
