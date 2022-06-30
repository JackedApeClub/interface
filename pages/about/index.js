// React
import { Fragment } from "react";

// Next
import Head from "next/head";

// Components
import About from "../../components/About/About";

const index = () => {
  return (
    <Fragment>
      <Head>
        <title>Jacked | About</title>
        <link rel="shortcut icon" href="./images/Logos/E-Fill-White.png" />
      </Head>
      <About />
    </Fragment>
  );
};

export default index;
