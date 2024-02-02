import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import { Container } from "../CommonStyledComponent/CommonStyledComponent";
import SectionName from "../CommonComponent/SectionName";
import Button from "../CommonComponent/Button";
import { COLOR } from "../../Utility/Colors";
import { InnerContainer } from "../CommonStyledComponent/CommonStyledComponent";
import { backendURL } from "../../Utility/Constant";

const AboutUs = ({ abouts, aboutsMessage }) => {
  return (
    <Container style={{ backgroundColor: "lavender" }}>
      {abouts.length === 0 && aboutsMessage ? (
        <>
          <p>{aboutsMessage}</p>
        </>
      ) : (
        <>
          {abouts.length === 0 ? (
            <Loading />
          ) : (
            <InnerContainer>
              {abouts.map((about, idx) => (
                <AboutUsCard key={idx} about={about} />
              ))}
            </InnerContainer>
          )}
        </>
      )}
    </Container>
  );
};

const AboutUsCard = ({ about }) => {
  const [showMore, setShowMore] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (showMore) {
      setMessage(about.message);
    } else {
      setMessage(`${about?.message?.substring(0, 1500)}...`);
    }
  }, [showMore, about.message]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const { isOpposite } = about;

  return (
    <SingleAbout>
      <div id="About School"></div>
      <SectionName>{about.heading}</SectionName>
      <ContentContainer isOpposite={isOpposite}>
        <LeftBlock>
          <p>{message}</p>
          <Button
            backGroundColor={COLOR.primary}
            hoverBackGroundColor={COLOR.primaryDark}
            onClick={toggleShowMore}
          >
            {showMore ? "Read Less" : "Read More"}
          </Button>
        </LeftBlock>
        <RightBlock>
          <ImageContainer>
            <Image src={`${backendURL}${about.src}`} alt={about.alt} />
          </ImageContainer>
        </RightBlock>
      </ContentContainer>
    </SingleAbout>
  );
};

export default AboutUs;

const ContentContainer = styled.div`
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${COLOR.whitesmoke};
  @media (min-width: 768px) {
    flex-direction: ${({ isOpposite }) => (isOpposite ? "row-reverse" : "row")};
  }
`;

const LeftBlock = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 2.5;
  gap: 1rem;
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const RightBlock = styled.div`
  align-self: flex-start;
  flex: 1.5;
  padding: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
export const Image = styled.img`
  width: 100%;
  height: 20rem;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.6);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.5s linear;
  &:hover {
    scale: 1.1;
  }
`;
const SingleAbout = styled.div`
  padding: 2rem 0;
`;
export const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 1rem;
  transition: all 0.5s linear;
  @media (max-width: 768px) {
    height: 100%;
  }
`;
