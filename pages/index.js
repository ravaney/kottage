import Gallery from "../components/Gallery";
import Search from "../components/Search";
import ShowCabins from "../components/ShowCabins";
import { useEffect } from "react";
import { useAuth } from "../components/contexts/userContext";
import "bootstrap/dist/css/bootstrap.css";
export default function Home({ images, properties }) {
  const { user } = useAuth();

  useEffect(() => {
    console.log("home");
    console.log(user);
  }, [user]);

  return (
    <div>
      <title>Kottage</title>
      <meta name="keywords" content="web dev" lang="en" />
      <Search />
      <Gallery images={images} />
      <ShowCabins />
    </div>
  );
  // to access html attributes, it can be accesses //from Head , attributes
  // like lang etc. // alternate is to create _document.js in pages folder and
  // use default // data from next.js doumentation
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=4"
  );
  const images = await res.json();

  return {
    props: {
      images,

      // properties,
    },
  };
};
