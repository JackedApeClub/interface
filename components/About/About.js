// Styled Components
import styled from "styled-components";

// Next
import Link from "next/link";
import Image from "next/image";

// Images
import header from "../../public/images/About-Header.jpg";
import logo from "../../public/images/Logos/E-Fill-White.png";

// Components
import Team from "./Team/Team";

const About = () => {
  return (
    <Wrapper>
      <Image src={header} alt="" className="shop-header" />

      <div className="nav">
        <Link href="/">
          <Image src={logo} alt="" />
        </Link>
      </div>

      <div className="inner">
        <p className="header">OUR MISSION:</p>

        <p className="info">
          Our mission at Jacked Ape club is to do everything possible to better
          ourselves mentally, physically, and emotionally while promoting and
          integrating the world of Web3 within the fitness industry.
        </p>
        <p className="info">
          Jacked is a community-driven project focused on merging the two worlds
          of Web3 technology and the fitness industry.
        </p>
        <p className="info">
          Jacked was founded on the principles of living better, happier, and
          healthier lives. We at Jacked are all passionate about fitness, Web3,
          and focusing on bettering ourselves in every facet. We saw it as a
          unique opportunity to bring our passions together. This mindset of
          combining health and wealth is what led to our creation.
        </p>

        <Team />
      </div>
    </Wrapper>
  );
};

export default About;

const Wrapper = styled.div`
  position: relative;

  .shop-header {
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
    padding: 0 20px;

    padding-top: 50px;
    padding-bottom: 50px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 50px;

    max-width: 800px;

    margin: 0 auto;

    .header {
      font-size: 2rem;

      text-align: left;
    }

    .info {
      font-size: 1.15rem;
    }
  }
`;
