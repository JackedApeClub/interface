// Styled Components
import styled from "styled-components";

// Material UI
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const TeamMember = (props) => {
  return (
    <Wrapper>
      <div className="text-center">
        <img src={props.img} alt="" />
      </div>
      <div className="info-wrapper">
        <p className="header">{props.header}</p>
        <p className="info">{props.info}</p>
        <div className="socials">
          {props.instagram && (
            <a href={props.instagram} target="_blank" rel="noreferrer">
              <InstagramIcon className="icon" />
            </a>
          )}

          {props.facebook && (
            <a href={props.facebook} target="_blank" rel="noreferrer">
              <FacebookIcon className="icon" />
            </a>
          )}

          {props.twitter && (
            <a href={props.twitter} target="_blank" rel="noreferrer">
              <TwitterIcon className="icon" />
            </a>
          )}

          {props.tiktok && (
            <a href={props.tiktok} target="_blank" rel="noreferrer">
              <img src="images/tiktok.png" alt="" className="icon tiktok" />
            </a>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default TeamMember;

const Wrapper = styled.div`
  padding: 15px;
  img {
    border-radius: 50%;
    height: 80%;
    width: 200px;
  }
  //
  border: none !important;
  width: auto !important;
  @media only screen and (max-width: 625px) {
    width: 95vw;
  }
  //

  .info-wrapper {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .header {
      text-align: center;

      font-size: 2rem;

      font-family: "Varela Round", sans-serif;
      font-weight: 400;

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
    .info {
      font-size: 1.15rem;
      color: #fff;
      font-weight: 200;
    }
  }
  .socials {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    animation: fade-scale 2s;
    z-index: 1;
    a {
      .icon {
        fill: #eaa721;
        width: 30px;
        font-size: 30px;
      }
      .tiktok {
        transform: scale(0.7);
      }
    }
  }
`;
