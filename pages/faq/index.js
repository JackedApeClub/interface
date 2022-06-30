// React
import { Fragment } from "react";

// Next
import Head from "next/head";

// Components
import Faq from "../../components/Faq/Faq";

const index = () => {
  return (
    <Fragment>
      <Head>
        <title>Jacked | Faq</title>
        <link rel="shortcut icon" href="./images/Logos/E-Fill-White.png" />
      </Head>
      <Faq />
    </Fragment>
  );
};

export default index;
