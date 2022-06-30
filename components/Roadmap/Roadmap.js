// React
import { useRef } from "react";

// Styled Components
import styled from "styled-components";

// Next
import Link from "next/link";
import Image from "next/image";

// Images
import header from "../../public/images/Roadmap-Header.jpg";
import logo from "../../public/images/Logos/E-Fill-White.png";

import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";

// Components
import RoadmapItem from "./RoadmapItem/RoadmapItem";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const Roadmap = () => {
  return (
    <Wrapper>
      <Image src={header} alt="" className="roadmap-header" />

      <div className="nav">
        <Link href="/">
          <Image src={logo} alt="" className="nav" />
        </Link>
      </div>

      <div className="inner">
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(36, 37, 38)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(36, 37, 38)" }}
            iconStyle={{
              background: "#a40401",
              color: "#fff",
            }}
          >
            <h3 className="vertical-timeline-element-title">
              Release of our official &quot;Jacked&quot; Lifestyle line:
            </h3>

            <div className="text">
              <p className="item">
                This will be the foundation and genesis launch of our athletic
                clothing brand. Included in this will be:
              </p>
              <p className="item">Social media marketing campaigns</p>
              <p className="item">Influencer collaborations</p>
              <p className="item">
                Holders will be able to choose to stake their
                &quot;JackedNFTs&quot; in exchange for ETH rewards based on % of
                profit each calendar month
              </p>
              <p className="item">
                This will not be a &quot;private label.&quot; Jacked&apos;s
                lifestyle brand will be something we can all truly be proud to
                be a part of.
              </p>
              <p className="item">
                Portions of our proceeds will directly roll into initiatives to
                fund further metaverse exploration and staking rewards for
                holders. We will be the first (to our knowledge) fitness brand
                to accept crypto as a payment method.
              </p>
            </div>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(36, 37, 38)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(36, 37, 38)" }}
            iconStyle={{
              background: "#a40401",
              color: "#fff",
            }}
          >
            <h3 className="vertical-timeline-element-title">
              Private (ape) labeling initiative:
            </h3>

            <div className="text">
              <p className="item">
                We will be incorporating certain apes into each new product
                launch and holders of these apes will be compensated based on %
                of sales
              </p>
            </div>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(36, 37, 38)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(36, 37, 38)" }}
            iconStyle={{
              background: "#a40401",
              color: "#fff",
            }}
          >
            <h3 className="vertical-timeline-element-title">
              &quot;Get Jacked&quot;:
            </h3>

            <div className="text">
              <p className="item">
                We&apos;ll outsource industry leaders to help further the
                progression of the fitness and health needs of the Jacked
                community. Included in this is:
              </p>
              <p className="item">
                Individual health/fitness plans for holders if they so choose.
              </p>
              <p className="item">Weekly workout plans</p>
              <p className="item">Meal plans</p>
              <p className="item">Grocery lists</p>

              <p className="item">Many more opportunities.</p>
              <p className="item">
                We will be encompassing this all within our &quot;online hub
                &quot; as time progresses. Our re-envisioned Jacked website is
                currently under development.
              </p>
            </div>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(36, 37, 38)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(36, 37, 38)" }}
            iconStyle={{
              background: "#a40401",
              color: "#fff",
            }}
          >
            <h3 className="vertical-timeline-element-title">
              Get Jacked Initiative:
            </h3>

            <div className="text">
              <p className="item">
                Jacked will be launching a metaverse wide progress competition
                to encourage a healthier lifestyle. We will have multiple
                categories (most gains, biggest weight loss, best physic, mental
                health contribution) and many more for holders to compete in
                good spirits with one another for grand prizes. (Start of Q2).
              </p>
            </div>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(36, 37, 38)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(36, 37, 38)" }}
            iconStyle={{
              background: "#a40401",
              color: "#fff",
            }}
          >
            <h3 className="vertical-timeline-element-title">Jackedletes:</h3>

            <div className="text">
              <p className="item">
                We will be sponsoring individual community members on their
                quest to promote health and wealth. This will include early
                access and free pieces from our genesis roll-outs (merch, gear
                line, product line etc). Each holder will have an equal
                opportunity to participate.
              </p>

              <p className="item">
                We are excited to embark on these new ventures with you all. In
                the past week we&apos;ve had hundreds of fantastic applicants
                this last week to join the team. If you have not received a
                message from us by this Thursday please know we will be saving
                your application for a later date. From Myself and Everyone else
                on the team, thank you for continuing to be such an amazing and
                uplifting community.
              </p>
            </div>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </Wrapper>
  );
};

export default Roadmap;

const Wrapper = styled.div`
  position: relative;

  overflow: hidden;

  .roadmap-header {
    width: 100%;
  }

  .nav {
    width: 75px;

    cursor: pointer;

    position: absolute;

    top: 25px;
    left: 25px;

    z-index: 100;
  }

  .inner {
    padding: 0 20px;

    padding-top: 50px;
    padding-bottom: 50px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;

    h3 {
      font-size: 1.5rem;
    }

    h4 {
      font-size: 1.2rem;

      padding-top: 10px;
    }

    p {
      font-size: 1.15rem;
    }
  }
`;
