import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import Formpopup from "./Formpopup";
import Loading from "./Loading";
import { Container } from "../CommonStyledComponent/CommonStyledComponent";
import { COLOR } from "../../Utility/Colors";
import Button from "../CommonComponent/Button";
import { toastMessage } from "../../Utility/Utils";
import { backendURL } from "../../Utility/Constant";

const HeroSection = ({
  school,
  heroImages,
  admissionBtn,
  schoolMessage,
  heroImagesMessage,
  admissionBtnMessage,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const cycleImages = useCallback(() => {
    const nextImageIndex =
      currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(nextImageIndex);
  }, [currentImageIndex, heroImages.length]);

  useEffect(() => {
    const imageInterval = setInterval(cycleImages, 5000);
    return () => clearInterval(imageInterval);
  }, [cycleImages]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div id="Home"></div>
      <HeroContainer
        bgImage={`${backendURL}${heroImages[currentImageIndex]}`}
        onClick={cycleImages}
      >
        <HeroTitle>
          {Object.keys(school).length === 0 && schoolMessage ? (
            <>
              <p>{schoolMessage}</p>
            </>
          ) : (
            <>
              {Object.keys(school).length === 0 ? (
                <Loading />
              ) : (
                <>
                  Welcome to
                  <br />
                  {school.name}
                </>
              )}
            </>
          )}
        </HeroTitle>
        <AdmissionContainer>
          {Object.keys(admissionBtn).length === 0 && admissionBtnMessage ? (
            <>
              <p>{admissionBtnMessage}</p>
            </>
          ) : (
            <>
              {Object.keys(admissionBtn).length === 0 ? (
                <Loading />
              ) : (
                <>
                  <AdmissionInnerImage src={`${backendURL}${admissionBtn.src}`} />
                  <AdmissionInnerContent>
                    <HeroSubtitle>Apply For Admission</HeroSubtitle>
                    <SubTitleMessage>{admissionBtn.message}</SubTitleMessage>
                    <Button
                      backGroundColor={COLOR.primary}
                      hoverBackGroundColor={COLOR.primaryDark}
                      onClick={openPopup}
                    >
                      Click Here
                    </Button>
                  </AdmissionInnerContent>
                </>
              )}
            </>
          )}
        </AdmissionContainer>
      </HeroContainer>
      {isPopupOpen && <Formpopup onClose={closePopup} />}
    </>
  );
};

export default HeroSection;

const HeroContainer = styled(Container)`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  justify-content: flex-start;
  text-align: center;
  position: relative;
  @media screen and (min-width: 768px) {
    min-height: 100vh;
  }
`;

const zoomSmall = keyframes`
  from{
    font-size: 0;
  }
  to{
    font-size: 2rem;
  }
`;

const zoomBig = keyframes`
  from{
    font-size: 0;
  }
  to{
    font-size: 4rem;
  }
`;

const HeroTitle = styled.h1`
  padding: 1rem;
  color: ${COLOR.whitesmoke};
  transition: all 0.3s ease;
  font-size: 2rem;
  animation: ${zoomSmall} 1s linear;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media screen and (min-width: 768px) {
    font-size: 4rem;
    animation: ${zoomBig} 1s ease-out;
  }

  @media screen and (max-width: 245px) {
    font-size: 2rem;
    animation: ${zoomBig} 1s ease-out;
  }

`;

const AdmissionContainer = styled.div`
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 13rem;
  background: ${COLOR.secondary};
  position: absolute;
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    width: 90%;
    flex-direction: row;
  }
`;

const AdmissionInnerImage = styled.img`
  display: none;
  object-fit: cover;
  overflow: hidden;
  border-radius: 1rem;
  flex: 0.3;
  transition: all 0.5s linear;
  &:hover {
    scale: 1.1;
  }
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: block;
  }
`;

const AdmissionInnerContent = styled.div`
  height: 100%;
  display: flex;
  flex: 0.7;
  flex-direction: column;
  align-items: center;
  padding: 0.7rem;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
    align-items: start;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: ${COLOR.white};
`;

const SubTitleMessage = styled.p`
  margin: 0.5rem 0;
  overflow: scroll;
  word-wrap: break-word;
  text-align: start;
  font-size: 1.1rem;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
