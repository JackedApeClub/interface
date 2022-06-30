// React
import React, { useRef, useState, useEffect } from "react";

// Styled Components
import styled from "styled-components";

// MUI
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Next
import Link from "next/link";
import Image from "next/image";

// Images
import logo from "../../public/images/Logos/Fill-White.png";
import nav from "../../public/images/Logos/E-Fill-White.png";
import Button from '@mui/material/Button';

// Components

const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
};

const Home = () => {
  const videoParentRef = useRef();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // check if user agent is safari and we have the ref to the container <div />
    if (isSafari() && videoParentRef.current) {
      // obtain reference to the video element
      const player = videoParentRef.current.children[0];

      // if the reference to video player has been obtained
      if (player) {
        // set the video attributes using javascript as per the
        // webkit Policy
        player.controls = false;
        player.playsinline = true;
        player.muted = true;
        player.setAttribute("muted", ""); // leave no stones unturned :)
        player.autoplay = true;

        // Let's wait for an event loop tick and be async.
        setTimeout(() => {
          // player.play() might return a promise but it's not guaranteed crossbrowser.
          const promise = player.play();
          // let's play safe to ensure that if we do have a promise
          if (promise.then) {
            promise
              .then(() => {})
              .catch(() => {
                // if promise fails, hide the video and fallback to <img> tag
                videoParentRef.current.style.display = "none";
              });
          }
        }, 0);
      }
    }
  }, []);

  return (
    <Wrapper>
      {/* <div className="background">
        <video className="background" autoPlay loop muted playsInLine>
          <source
            src="https://storage.googleapis.com/jackedofficial/wallpaper.mp4"
            type="video/mp4"
          />
        </video>
      </div> */}

      {mounted && window.innerWidth > 600 && (
        <div
          className="background"
          ref={videoParentRef}
          dangerouslySetInnerHTML={{
            __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          preload="metadata"
          class="background"
        >
        <source src="https://storage.googleapis.com/jackedofficial/FINAL%20JAC%20VIDEOOOOOOO.mp4" type="video/mp4" />
        </video>`,
          }}
        />
      )}

      {mounted && window.innerWidth <= 600 && (
        <div
          className="background"
          ref={videoParentRef}
          dangerouslySetInnerHTML={{
            __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          preload="metadata"
          class="background"
        >
        <source src="https://storage.googleapis.com/jackedofficial/FINAL%20JAC%20VIDEOOOOO%20MOBILE.mp4" type="video/mp4" />
        </video>`,
          }}
        />
      )}

      <div className="stake-button" style={{position: 'absolute', right: '50%', top: '50%' }}>
        <Link href="/stake">
            <p className="button">Stake</p>
        </Link>
      </div>

      <div className="inner">
        {/* <div className="buttons">
          <Link href="/roadmap">
            <p className="button">ROADMAP</p>
          </Link>

          <Link href="/about">
            <p className="button">ABOUT</p>
          </Link>

          <Link href="/faq">
            <p className="button">FAQ</p>
          </Link>

          <Link href="/shop">
            <p className="button">SHOP</p>
          </Link>
        </div> */}

        <div className="icons">
          <a
            href="https://opensea.io/collection/thejackedapeclub"
            className="social"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Transparent%20White.svg"
              alt=""
              className="icon"
            />
          </a>

          <a
            href="https://www.twitter.com/jackednfts"
            className="social"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon className="icon" />
          </a>

          <a
            href="https://www.instagram.com/jackednfts"
            className="social"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon className="icon" />
          </a>

          <a
            href="https://www.discord.gg/jacked"
            className="social"
            target="_blank"
            rel="noreferrer"
          >
            <img src="./images/discord-icon.svg" alt="" className="icon" />
          </a>
        </div>
      </div>

      {/* <Nav />
      <Intro />
      <Info />
      <Faq />
      <Team />
      <Footer />
      {/* <Intro />
      <Info />
      <Faq />
      <Footer /> */}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  .background {
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    max-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
    object-fit: fill;
    @media only screen and (max-width: 500px) {
      overflow: hidden;
      video {
        position: absolute;
        right: 0;
        bottom: 0;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        z-index: -100;
        background-size: cover;
        overflow: hidden;
      }
    }
  }
  .inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    padding: 0 20px;
    .logo {
      //
      width: 1200px;
      @media only screen and (max-width: 1250px) {
        width: 100%;
      }
      //
      z-index: 1000;
    }
    .nav {
      width: 75px;
      cursor: pointer;
    }
    a {
      color: #fff;
      text-decoration: none;
    }

    .icons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;

      padding-bottom: 15px;
    }

    .icon {
      width: 30px;
      font-size: 30px;

      fill: #fff;
      color: #fff;

      transition: all 0.3s;
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    .button {
      font-size: 2.5rem;
      cursor: pointer;
      font-family: "Bebas Neue", cursive;

      transition: all 0.3s;

      &:hover {
        color: #ef0622;
      }
    }
  }
  .stake-button {
    .button {
      font-size: 1.75rem;
      cursor: pointer;
      transition: all 0.3s;
      padding: 8px;
      border: 1px solid white;
      border-radius: 8px;
    }
  }
`;