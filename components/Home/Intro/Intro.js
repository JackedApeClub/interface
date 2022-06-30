// React
import { useState, useEffect } from "react";

// Styled Components
import styled from "styled-components";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Framer Motion
import { motion } from "framer-motion";

const Intro = () => {
  return (
    <Wrapper>
      <img src="./images/Artboard_1.png" alt="" className="banner" />

      {/* <img
        src="https://cdn.discordapp.com/attachments/937438123309285506/944811251438067722/logo_transparent.png"
        alt=""
        className="intro-header"
      /> */}

      <p className="intro-header">RELEASING IN MARCH 2022</p>

      {/* <p className="intro-header">Embers</p>

      <p className="intro-sub-header">RELEASING IN MARCH 2022</p>

   
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </Wrapper>
  );
};

export default Intro;

const Wrapper = styled.div`
  padding: 0 20px;
  padding-top: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .banner {
    position: absolute;
    top: 0;

    z-index: -1;

    width: 100%;
  }

  width: 100%;

  .intro-header {
    font-size: 4rem;
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

    text-align: center;
  }

  .intro-sub-header {
    font-size: 1.35rem;
    text-align: center;
  }
`;

const MotionButton = styled(motion.button)`
  background-color: #db545a;
  color: #fff;
  font-weight: 900;
  font-size: 1.15rem;

  width: 250px;
  border-radius: 20px;
  margin-top: 25px;

  box-shadow: none;

  text-transform: capitalize;

  border: none;
  outline: none;

  cursor: pointer;

  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  .wallet {
    transform: translateX(-10px);
  }

  &:hover {
    background-color: #db545a;
    box-shadow: none;
  }
`;
