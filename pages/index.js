// React
import { Fragment } from "react";

// Next
import Head from "next/head";

// Components
import Home from "../components/Home/Home";

const index = () => {
  return (
    <Fragment>
      <Head>
        <title>Jacked | Home</title>
        <link rel="shortcut icon" href="./images/Logos/E-Fill-White.png" />
      </Head>
      <Home />
    </Fragment>
  );
};

export default index;
