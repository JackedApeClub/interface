// Styled Components
import styled from "styled-components";

// Components
import TeamItem from "./TeamItem/TeamItem";

const Team = () => {
  return (
    <Wrapper>
      <p className="header">Meet the Team:</p>

      <div className="team">
        <TeamItem
          img={"/images/Team-Photos/Bradley.jpg"}
          header={"Bradley | Owner"}
          twitter={"https://twitter.com/BradleyMartyn"}
        />

        <TeamItem
          img={"/images/Team-Photos/Davis.png"}
          header={"Davis | Owner"}
          twitter={"https://twitter.com/0xDavisBlake"}
        />

        <TeamItem
          img={"/images/Team-Photos/Adin.png"}
          header={"Adin | Head of Operations"}
          twitter={"https://twitter.com/ZwiggityTV"}
        />

        <TeamItem
          img={"/images/Team-Photos/Mitchell.png"}
          header={"Mitchell | Director of Marketing"}
          twitter={"https://twitter.com/MitcheIl"}
        />

        <TeamItem
          img={"/images/Team-Photos/Gabe_.jpg"}
          header={"Gabe | Gym Director"}
          twitter={"https://twitter.com/orangie"}
        />
      </div>
    </Wrapper>
  );
};

export default Team;

const Wrapper = styled.div`
  padding: 0 20px;
  padding-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .header {
    font-size: 2rem;
  }

  .team {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    flex-wrap: wrap;
    margin-top: 50px;

    width: 90vw;
  }
`;
