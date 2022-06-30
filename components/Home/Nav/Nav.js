// React
import { useState, useEffect } from "react";

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
import { userAcitons } from "../../../store/user-slice";
import { useSelector } from "react-redux";

// Next
import Link from "next/link";

// Ethers
import { ethers } from "ethers";

// Web3Modal
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Authereum from "authereum";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Framer Motion
import { AnimatePresence, motion } from "framer-motion";

// Components
import NavMobile from "./NavMobile/NavMobile";

const Nav = () => {
  const [mobileLinks, setMobileLinks] = useState("");

  const dispatch = useDispatch();

  const provider = useSelector((state) => state.user.provider);

  const mobileMenuHandler = () => {
    setMobileLinks((prev) => !prev);

    document.body.classList.toggle("disable-scrolling");
  };

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

  useEffect(async () => {
    // toast.error("Please connect");

    if (provider) {
      const { chainId } = await provider.getNetwork();

      if (chainId !== 1) {
        toast.error("Wrong network");
      }
    }
  }, [provider]);

  return (
    <Wrapper>
      <div className="bar">
        <div className="sections">
          <img src="./images/logo.png" alt="" className="logo" />
        </div>

        <div className="socials">
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
              <img src="./images/discord-icon-2.svg" alt="" className="icon" />
            </a>
          </IconButton>
        </div>

        {!mobileLinks && (
          <MenuIcon className="mobile-menu" onClick={mobileMenuHandler} />
        )}
        {mobileLinks && (
          <CloseIcon className="mobile-menu" onClick={mobileMenuHandler} />
        )}
        <AnimatePresence exitBeforeEnter>
          {mobileLinks && <NavMobile mobileMenuHandler={mobileMenuHandler} />}
        </AnimatePresence>
      </div>
    </Wrapper>
  );
};

export default Nav;

const Wrapper = styled.div`
  padding: 0 20px;
  padding-top: 10px;
  padding-bottom: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: 1300px;

    .sections {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;

      p {
        font-size: 1.15rem;
        text-align: left;
        font-family: "Coiny", cursive;
        font-weight: 400;
        color: #111111;

        cursor: pointer;

        @media only screen and (max-width: 1000px) {
          display: none;
        }
      }
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

    gap: 0px;

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

    @media only screen and (max-width: 1000px) {
      display: none;
    }
  }

  .mobile-menu {
    display: none;
    color: #fff;
    z-index: 1001;
    cursor: pointer;
    width: 50px;
    height: 40px;
    @media only screen and (max-width: 1000px) {
      display: block;
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
