// Styled Components
import styled from "styled-components";

// Components
import TeamMember from "./TeamMember/TeamMember";

const Team = () => {
  return (
    <Wrapper>
      <p className="team-header">The Frens</p>

      <div className="team">
        {/* <TeamMember
          img={"./images/79.png"}
          header={"Writer & Director"}
          info={"Cameron Van Hoy"}
          instagram={"https://www.instagram.com/cameronvanhoy/"}
          facebook={""}
          twitter={"https://twitter.com/CameronVanHoy"}
        />
        <TeamMember
          img={"images/mia.png"}
          header={"Characters by"}
          info={"@sveta_has"}
          instagram={"https://www.instagram.com/sveta_has/"}
          facebook={""}
          twitter={""}
          tiktok={"https://www.tiktok.com/@sveta_has?lang=en"}
        />     */}

        <TeamMember
          img={"./images/79.png"}
          header={"Developer"}
          info={"Iceyy"}
        />

        <TeamMember
          img={"./images/84.png"}
          header={"Developer"}
          info={"Iceyy"}
        />

        <TeamMember
          img={"./images/80.png"}
          header={"Developer"}
          info={"Iceyy"}
        />
      </div>
    </Wrapper>
  );
};

export default Team;

const Wrapper = styled.div`
  width: 100%;
  height: max-content;

  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  padding-top: 50px;

  .team-header {
    font-size: 3rem;
    text-align: center;

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
  .team {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 25px;
    &-single {
      gap: 0;
      flex-wrap: nowrap;
      align-items: center;
      //   display: block;
      //  width: 100%;
    }
  }
`;
