import React from "react";
import styled from "styled-components";
import { COLOR } from "../../Utility/Colors";

function SectionName({ children }) {
  return (
    <TitleContainer>
      <PageName>{children}</PageName>
      <SeparatorLine />
    </TitleContainer>
  );
}

export default SectionName;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const PageName = styled.h2`
  font-weight: bold;
  color: ${COLOR.primary};
  margin-bottom: 0.625rem;
`;

const SeparatorLine = styled.div`
  min-width: 15rem;
  height: 4px;
  background-color: ${COLOR.secondary};
  margin-bottom: 20px;

  @media (max-width: 320px){
    min-width:10rem;
  }
`;
