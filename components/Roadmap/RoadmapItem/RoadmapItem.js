// Styled Components
import styled from "styled-components";

// React Reveal
import Fade from "react-reveal";

const RoadmapItem = (props) => {
  return (
    <Fade duration="2000">
      <Wrapper>
        <p className="header">{props.header}</p>

        <div className="info">
          {props.items.map((item, i) => (
            <p className="info-item" key={i}>
              {item}
            </p>
          ))}
        </div>
      </Wrapper>
    </Fade>
  );
};

export default RoadmapItem;

const Wrapper = styled.div`
  //
  width: 800px;
  @media only screen and (max-width: 850px) {
    width: 100%;
  }
  //

  background-color: #242526;

  border-radius: 8px;

  padding: 20px;

  box-shadow: 0 8px 28px 4px rgb(86 91 115 / 15%);

  .header {
    font-size: 2rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;

    height: 100%;
    width: 100%;

    margin-top: 25px;

    &-item {
      font-size: 1.15rem;
    }
  }
`;
