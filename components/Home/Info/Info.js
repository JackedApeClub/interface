// Styled Components
import styled from "styled-components";

// MUI
import TimerIcon from "@mui/icons-material/Timer";

// Framer Motion
import { motion } from "framer-motion";

const Info = () => {
  return (
    <Wrapper>
      <div className="info">
        <p className="info__header">A Collection of 10,000 Doodles</p>

        <p className="info__text">
          Doodles are a collection of 10,000 NFTs (non-fungible tokens) that are
          made up of hundreds of exciting visual traits designed by Burnt Toast.
          Hand-drawn Doodles include skellys, cats, aliens, apes and mascots.
          The Doodles collection also includes dozens of rare heads, costumes,
          and colorways of the artist&apos;`s palette.
        </p>

        <MotionButton
          className="connect-button"
          variant="contained"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <TimerIcon className="wallet" />
          Wen Mint
        </MotionButton>
      </div>

      <img src="./images/array.png" alt="" className="gallery" />
    </Wrapper>
  );
};

export default Info;

const Wrapper = styled.div`
  padding: 0 20px;

  //
  padding-top: 100px;
  @media only screen and (max-width: 1000px) {
    padding-top: 50px;
  }
  //

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;

  width: 100%;

  .info {
    width: 595px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;

    &__header {
      font-size: 2rem;

      background: linear-gradient(
        to right,
        #83ffc1,
        #fdc896,
        #83ffc1,
        #fdc896,
        #83ffc1
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: rainbow_animation 6s ease-in-out infinite;
      background-size: 400% 100%;

      font-weight: 900;
    }

    &__text {
      font-size: 1.15rem;

      color: #fff;
    }
  }

  .gallery {
    //
    width: 595px;
    @media only screen and (max-width: 650px) {
      width: 100%;
    }
    //
  }
`;

const MotionButton = styled(motion.button)`
  background-color: #3d4284;

  font-family: "Varela Round", sans-serif;

  color: #fff;
  font-weight: 900;
  font-size: 1.15rem;

  width: 250px;
  border-radius: 20px;

  box-shadow: none;

  text-transform: capitalize;

  border: none;
  outline: none;

  border: 1.5px solid rgba(0, 0, 0, 0.4);

  cursor: pointer;

  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  .wallet {
    transform: translateX(-10px);
  }

  &:hover {
    background-color: #3d4284;
    box-shadow: none;
  }
`;
