import Head from "next/head";
import Gallery from "../components/Gallery";
import Search from "../components/Search";
import ShowCabins from "../components/ShowCabins";

export default function Home({ images }) {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossOrigin="anonymous"
        />
        <title>Kottage</title>
        <meta name="keywords" content="web dev" lang="en" />
      </Head>
      <Search />
      <Gallery images={images} />
      <ShowCabins images={images} />
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
    },
  };
};
