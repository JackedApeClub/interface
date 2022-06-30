// Styled Components
import styled from "styled-components";

// Material UI
import Button from "@mui/material/Button";

const TeamItem = (props) => {
  return (
    <Wrapper>
      <img src={props.img} alt="" className="img" />

      <p className="header">{props.header}</p>

      <p className="desc">{props.desc}</p>

      <a href={props.twitter} target="_blank" rel="noreferrer">
        <Button className="button" variant="contained">
          Twitter
        </Button>
      </a>
    </Wrapper>
  );
};

export default TeamItem;

const Wrapper = styled.div`
  max-width: 325px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .button {
    border: 2px solid #fff;
    background-color: transparent;
    border-radius: 0px;
    padding: 10px 30px;
    font-weight: 300;

    &:hover {
      background-color: transparent;
    }
  }

  a {
    text-decoration: none;
    color: #fff;
    text-transform: capitalize;

    //  font-size: 1.1rem;
  }

  .img {
    width: 250px;
    border-radius: 50%;
  }
  .header {
    font-size: 1.15rem !important;
    text-decoration: none;
    font-weight: 700;
  }
  .desc {
    font-size: 0.95rem;
    font-weight: 300;
    font-weight: 300;
  }
`;
