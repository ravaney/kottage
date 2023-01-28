import { auth, database } from "../../components/firebase";
import { ref, get } from "firebase/database";
import { useState, useEffect } from "react";
import AddProperty from "../../components/AddProperty";
import { useAuth } from "../../components/contexts/userContext";
import MyProperties from "../../components/MyProperties";
import UpdateProperty from "../../components/UpdateProperty";
import Reviews from "../../components/Reviews";
import { Container } from "@mui/system";
import { Avatar, Button, Typography } from "@mui/material";
import accountStyles from "../../styles/Account.module.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HouseIcon from "@mui/icons-material/House";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BookingsIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MailIcon from "@mui/icons-material/Mail";
import Profile from "../../components/AccountComponents/Profile";
import MyReservations from "../../components/MyReservations";

export default function Dashboard(userInfo) {
  const [controller, setController] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const [addProperty, setaddProperty] = useState(controller);
  const [myProperties, setMyProperties] = useState(controller);
  const [myProfile, setMyProfile] = useState(controller);
  const [favourites, setFavourites] = useState(controller);
  const [Bookings, setBookings] = useState(controller);
  const [Reservations, setReservations] = useState(controller);
  const [Inbox, setInbox] = useState(controller);
  const [Invoices, setInvoices] = useState(controller);
  // useEffect(() => {
  //   console.log(user?.uid);
  // }, [user]);

  // const userRef = ref(database, "users/" + user?.uid);
  // const getUser = async () => (await get(userRef)).val();
  // useEffect(() => {
  //   getUser().then((userinfo) => {
  //     setUserInfo(userinfo);
  //   });
  // }, []);
  const handleProfile = () => {
    setaddProperty(false);
    setMyProfile(true);
    console.log(myProfile);
  };
  const handleAddProperty = () => {
    setMyProfile(false);
    setaddProperty(true);
  };
  const handleMyProperties = () => {
    setMyProperties(true);
    setController(false);
  };
  const handleFavourites = () => {
    setFavourites(true);
    setController(false);
  };
  const handleBookings = () => {
    setBookings(true);
    setController(false);
  };
  const handleReservations = () => {
    setReservations(true);
    setController(false);
  };
  const handleInvoice = () => {
    setInvoices(true);
    setController(false);
  };
  const handleInbox = () => {
    setInbox(true);
    setController(false);
  };
  useEffect(() => {
    setMyProfile(true);
  }, []);

  return (
    <>
      <Container
        style={{
          marginLeft: "0px",
          paddingLeft: "0px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className={accountStyles.sidebarContainer}>
          <Avatar
            className={accountStyles.avatar}
            src={userInfo?.photoURL}
            alt="profile pic"
            size="lg"
          />
          <Typography variant="h6" className={accountStyles.name}>
            {userInfo?.displayName}
          </Typography>
          <Button className={accountStyles.sideButtons} onClick={handleProfile}>
            {" "}
            <AccountBoxIcon className={accountStyles.icon} />
            Profile
          </Button>
          <Button className={accountStyles.sideButtons} onClick={handleInbox}>
            {" "}
            <MailIcon className={accountStyles.icon} />
            Inbox
          </Button>
          <Button
            className={accountStyles.sideButtons}
            onClick={handleMyProperties}
          >
            {" "}
            <HouseIcon className={accountStyles.icon} />
            My Properties
          </Button>
          <Button
            className={accountStyles.sideButtons}
            onClick={handleAddProperty}
          >
            {" "}
            <PlusOneIcon className={accountStyles.icon} />
            New Property
          </Button>
          <Button className={accountStyles.sideButtons} onClick={handleInvoice}>
            {" "}
            <ReceiptIcon className={accountStyles.icon} />
            Invoices
          </Button>
          <Button
            className={accountStyles.sideButtons}
            onClick={handleBookings}
          >
            {" "}
            <BookingsIcon className={accountStyles.icon} />
            Bookings
          </Button>
          <Button
            className={accountStyles.sideButtons}
            onClick={handleReservations}
          >
            {" "}
            <BookingsIcon className={accountStyles.icon} />
            Reservations
          </Button>
          <Button
            className={accountStyles.sideButtons}
            onClick={handleFavourites}
          >
            {" "}
            <FavoriteIcon className={accountStyles.icon} />
            Favourites
          </Button>
        </div>
        <Container>
          {addProperty && <AddProperty />}
          {myProperties && <MyProperties />}
          {myProfile && <Profile userInfo={userInfo?.props?.userInfo} />}
          {/* <MyReservations user={userInfo} /> */}
        </Container>
      </Container>
    </>
  );
}

Dashboard.getInitialProps = async (context) => {
  const userRef = ref(database, "users/" + auth?.currentUser?.uid);
  const getUser = async () => (await get(userRef)).val();

  const data = await getUser();
  const userInfo = await data;
  console.log("user info below");
  console.log(userInfo);
  if (!userInfo) return { notFound: true };
  return {
    props: { userInfo },
  };
};
