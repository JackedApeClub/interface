// React
import { Fragment } from "react";

// Next
import Head from "next/head";

// Components
import Roadmap from "../../components/Roadmap/Roadmap";

const index = () => {
  return (
    <Fragment>
      <Head>
        <title>Jacked | Roadmap</title>
        <link rel="shortcut icon" href="./images/Logos/E-Fill-White.png" />
      </Head>
      <Roadmap />
    </Fragment>
  );
};

export default index;
