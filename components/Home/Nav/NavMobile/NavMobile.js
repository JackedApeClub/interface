// React
import { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Next
import Link from "next/link";

// Styled Components
import styled from "styled-components";

// MUI
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

// Redux
import { useDispatch } from "react-redux";
import { userAcitons } from "../../../../store/user-slice";
import { useSelector } from "react-redux";

// Ethers
import { ethers } from "ethers";

// Web3Modal
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Authereum from "authereum";

// React Reveal
import Fade from "react-reveal/Fade";

// Framer Motion
import { motion } from "framer-motion";

// Framer Motion Variables
const wrapperVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const NavMobile = (props) => {
  const mobileMenuHandler = () => {
    props.mobileMenuHandler();
  };

  const dispatch = useDispatch();

  const provider = useSelector((state) => state.user.provider);

  const handleConnection = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          chainId: 1,
          rpc: {
            1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
          },
        },
      },

      injected: {
        display: {
          logo: "https://github.com/MetaMask/brand-resources/raw/master/SVG/metamask-fox.svg",
          name: "MetaMask",
          description: "Connect with MetaMask in your browser",
        },
        package: null,
      },

      "custom-walletlink": {
        display: {
          logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
          name: "Coinbase Wallet",
          description: "Connect to Coinbase Wallet",
        },
        options: {
          appName: "Coinbase", // Your app name
          networkUrl: `https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
          chainId: 1,
        },
        package: WalletLink,
        connector: async (_, options) => {
          const { appName, networkUrl, chainId } = options;
          const walletLink = new WalletLink({
            appName,
          });
          const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
          await provider.enable();
          return provider;
        },
      },

      authereum: {
        package: Authereum,
      },
    };

    const web3Modal = new Web3Modal({
      cacheProvider: false, // optional
      providerOptions, // required
      theme: {
        background: `#454a6a`,
        main: "#fff",
        secondary: "#fff ",
        border: "#454a6a",
        hover: "#454a6a",
      },
    });

    if (provider) {
      web3Modal.clearCachedProvider();
      // window.location.reload();

      dispatch(userAcitons.setUserAddress(""));
      dispatch(userAcitons.setWeb3modal(""));
      dispatch(userAcitons.setProvider(""));
    } else {
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      provider.on("disconnect", (error) => {
        web3Modal.clearCachedProvider();
        window.location.reload();

        dispatch(userAcitons.setUserAddress(""));
        dispatch(userAcitons.setWeb3modal(""));
        dispatch(userAcitons.setProvider(""));
      });

      const addy = await signer.getAddress();

      dispatch(userAcitons.setUserAddress(addy));

      dispatch(userAcitons.setWeb3modal(web3Modal));
      dispatch(userAcitons.setProvider(provider));
    }
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Fragment>
          <Wrapper
            variants={wrapperVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
          >
            <div className="sections">
              <img src="./images/logo.png" alt="" className="logo" />
            </div>

            {provider ? (
              <MotionButton
                onClick={handleConnection}
                className="connect-button"
                variant="contained"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AccountBalanceWalletIcon className="wallet" />
                Disconnect Wallet
              </MotionButton>
            ) : (
              <MotionButton
                onClick={handleConnection}
                className="connect-button"
                variant="contained"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AccountBalanceWalletIcon className="wallet" />
                Connect Wallet
              </MotionButton>
            )}

            <div className="socials">
              <IconButton className="icon-button" color="success">
                <a
                  href="https://twitter.com/embersnft"
                  className="social"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterIcon className="icon" />
                </a>
              </IconButton>
              <IconButton className="icon-button" color="success">
                <a
                  href="https://www.instagram.com/embersnft/"
                  className="social"
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon className="icon" />
                </a>
              </IconButton>
              <IconButton className="icon-button" color="success">
                <a
                  href="https://discord.com/invite/embersnft"
                  className="social"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="./images/discord-icon-2.svg"
                    alt=""
                    className="icon"
                  />
                </a>
              </IconButton>
            </div>
          </Wrapper>
        </Fragment>,
        document.getElementById("overlay")
      )}
    </Fragment>
  );
};

export default NavMobile;

const Wrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
  background-color: #454a6a;
  text-align: center;
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  min-height: 400px;
  overflow: scroll;

  .sections {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    p {
      font-size: 1.15rem;
      text-align: left;
      font-family: "Coiny", cursive;
      font-weight: 400;
      color: #fff;

      cursor: pointer;
    }
  }

  .logo {
    width: 250px;

    cursor: pointer;

    transition: all 1s;
  }

  .socials {
    display: flex;

    align-items: center;

    gap: 5px;

    .connect-button {
      margin-right: 25px;
    }

    .icon-button {
      height: 50px;
    }

    .social {
      text-decoration: none;

      display: flex;
      align-items: center;

      .icon {
        width: 35px;
        font-size: 35px;

        fill: #fff;
      }
    }
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
