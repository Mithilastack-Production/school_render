import React from "react";
import styled from "styled-components";
import { backendURL } from "../../Utility/Constant";

export const OneArchORCampusContainer = ({ showDataOne, clicked ,isBlog }) => {
  return (
    <>
      <ImageContainer>
        <ArchivementImg src={`${backendURL}${showDataOne.src}`}></ArchivementImg>
      </ImageContainer>
      {showDataOne.title && (
        <ArchivementTitle>{showDataOne.title}</ArchivementTitle>
      )}
      <br />

      <ArchivementMessage>{showDataOne.subTitle}</ArchivementMessage>
    </>
  );
};

const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 1rem;
`;
const ArchivementImg = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: cover;
  border-radius: 1rem;

  transition: all 0.5s linear;
  &:hover {
    scale: 1.1;
  }
`;

const ArchivementTitle = styled.h4`
  padding: 0;
  margin: 0;
  word-wrap: wrap;
`;

const ArchivementMessage = styled.p``;
