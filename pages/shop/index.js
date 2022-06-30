// React
import { Fragment } from "react";

// Next
import Head from "next/head";

// Components
import Shop from "../../components/Shop/Shop";

const index = () => {
  return (
    <Fragment>
      <Head>
        <title>Jacked | Shop</title>
        <link rel="shortcut icon" href="./images/Logos/E-Fill-White.png" />
      </Head>
      <Shop />
    </Fragment>
  );
};

export default index;
