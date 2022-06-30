// Styled Components
import styled from "styled-components";

// Material UI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// React Reveal
import Fade from "react-reveal";

const FaqItem = (props) => {
  const infoItems = props.info.split("#");

  return (
    <Fade duration="2000">
      <Wrapper>
        <Accordion className="accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="icon" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <p className="title">{props.title}</p>
          </AccordionSummary>
          <AccordionDetails>
            {!props.links &&
              infoItems.map((item, index) => (
                <p className="info" key={index}>
                  {item}
                </p>
              ))}

            {props.links &&
              infoItems.map((item, index) => (
                <>
                  <p className="info" key={index}>
                    {item}
                  </p>
                </>
              ))}
            {props.links && (
              <div className="links">
                <a
                  href="https://twitter.com/sran_NFT"
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  Sara
                </a>
                <a
                  href="https://twitter.com/nataliexdivine"
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  Nat
                </a>
                <a
                  href="https://twitter.com/jdr_nft"
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  BFF Jeff
                </a>
              </div>
            )}

            {props.roadmap && (
              <div className="roadmap-faq">
                <p className="info">
                  Along the way each mint is an entry for our holder rewards
                  program.
                </p>

                <p className="info">
                  Want a chance to win one of 14 Creatures or Doodles we are
                  giving away? All you need to do is mint a Croodle and you’ll
                  be entered! Each time you mint (1) Croodle it gives you one
                  entry into our giveaway.
                </p>

                <p className="info-header">Here’s how it’s going to work:</p>

                <p className="info">
                  As our project mints we are giving away da best prizes. Each
                  time you mint (1) Croodle it gives you one entry into our
                  giveaway.{" "}
                </p>

                <div className="item">
                  <p className="item__header">10% Minted:</p>
                  <p className="item__info">1 Creature Giveaway (1 Winner)</p>
                </div>

                <div className="item">
                  <p className="item__header">25% Minted:</p>
                  <p className="item__info">1 Doodle Giveaway (1 Winner)</p>
                </div>

                <div className="item">
                  <p className="item__header">50% Minted:</p>
                  <p className="item__info">
                    1 Creature Giveaway & 1 Doodle Giveaway (2 Winners)
                  </p>
                </div>

                <div className="item">
                  <p className="item__header">75% Minted:</p>
                  <p className="item__info">
                    3 Creature Giveaways & 1 Doodle Giveaway (4 Winners)
                  </p>
                </div>

                <div className="item">
                  <p className="item__header">100% Minted:</p>
                  <p className="item__info">
                    4 Creature Giveaways & 2 Doodle Giveaways (6 Winners)
                  </p>
                </div>
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      </Wrapper>
    </Fade>
  );
};

export default FaqItem;

const Wrapper = styled.div`
  box-shadow: 0 8px 28px 4px rgb(86 91 115 / 15%);

  .accordion {
    background-color: #242526;

    border-radius: 8px;

    box-shadow: 0 8px 28px 4px rgb(86 91 115 / 15%);
    color: #fff;
    text-align: left;
    border-radius: 10px;

    color: #fff;

    .roadmap-faq {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;

      color: #fff;

      box-shadow: 0 8px 28px 4px rgb(86 91 115 / 15%);

      .info {
        font-size: 1.1rem;

        color: #fff;

        &-header {
          text-decoration: underline;
        }
      }

      .item {
        &__header {
          font-size: 1.1rem;
          font-weight: 900;
        }

        &__info {
        }
      }
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: 5px;

      a {
        color: #000;
      }
    }

    //
    width: 800px;
    @media only screen and (max-width: 825px) {
      width: 90vw;
    }
    //

    box-shadow: none;

    border: 1.5px solid rgba(0, 0, 0, 0.4);
    .icon {
      fill: #fff;
      transform: scale(1.5);
    }

    .title {
      font-size: 1.35rem;
      text-align: center;

      color: #fff;

      text-align: left;
    }

    .info {
      font-size: 1.15rem;
      text-align: left;

      font-weight: 400;

      color: #fff;
    }
  }
`;
