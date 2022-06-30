// Styled Components
import styled from "styled-components";

// Next
import Link from "next/link";
import Image from "next/image";

// Images
import header from "../../public/images/Shop-Header.jpg";
import logo from "../../public/images/Logos/E-Fill-White.png";

const Shop = () => {
  return (
    <Wrapper>
      <Image src={header} alt="" className="shop-header" />

      <div className="nav">
        <Link href="/">
          <Image src={logo} alt="" />
        </Link>
      </div>

      <div className="inner">
        <p className="header">COMING SOON!</p>
      </div>
    </Wrapper>
  );
};

export default Shop;

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
    align-items: center;
    gap: 50px;

    .header {
      font-size: 2rem;
    }
  }
`;
