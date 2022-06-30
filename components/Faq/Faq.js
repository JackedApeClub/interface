// React
import { Fragment } from "react";

// Styled Components
import styled from "styled-components";

// Next
import Link from "next/link";
import Image from "next/image";

// Images
import header from "../../public/images/FAQ-Header.jpg";
import logo from "../../public/images/Logos/E-Fill-White.png";

// Components
import FaqItem from "./FaqItem/FaqItem";

const Faq = () => {
  return (
    <Fragment>
      <Wrapper>
        <Image src={header} alt="" className="faq-header" />

        <div className="nav">
          <Link href="/">
            <Image src={logo} alt="" className="nav" />
          </Link>
        </div>

        <div className="inner">
          <FaqItem
            title={"Where do you see the project going?"}
            info={`We are building a fitness ecosystem based on Web3 and NFTs. We see JACKED as being a leading global fitness brand down the line. Innovation always wins.`}
          />
          <FaqItem
            title={"What does JACKED stand for in the NFT space?"}
            info={`All of us know it can be stressful working in this space. We think fitness plays a huge part in taking care of yourself. We want to build the healthiest community in the space in and out of the gym.`}
          />
          <FaqItem
            title={"Will there be JACKED clothing, supplements, and more?"}
            info={`Holders can expect a full-scale JACKED shop in the future. We’re working to build out an online retail store to buy JACKED gear with crypto.`}
          />
        </div>
      </Wrapper>
    </Fragment>
  );
};

export default Faq;

const Wrapper = styled.div`
  position: relative;

  .faq-header {
    width: 100%;
  }

  .nav {
    width: 75px;

    cursor: pointer;

    position: absolute;

    top: 25px;
    left: 25px;

    z-index: 100;
  }

  .inner {
    width: 100%;
    height: max-content;

    position: relative;
    padding: 50px 25px;
    padding-top: 50px;
    padding-bottom: 50px;

    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
  }
`;
