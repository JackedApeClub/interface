// Styled Components
import styled from "styled-components";

// MUI
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import IconButton from "@mui/material/IconButton";

const Footer = () => {
  return (
    <Wrapper>
      <img src="./images/icon-2.png" alt="" className="logo" />

      <hr className="break" />

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
            <img src="./images/discord-icon-2.svg" alt="" className="icon" />
          </a>
        </IconButton>
      </div>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  padding: 10px 20px;
  margin-top: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  width: 100%;

  .logo {
    width: 150px;

    transition: all 1s;

    cursor: pointer;
  }

  .break {
    width: 100%;
    max-width: 1000px;
  }

  .socials {
    display: flex;

    align-items: center;

    gap: 0px;

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
