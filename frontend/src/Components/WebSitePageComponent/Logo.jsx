import React, { useEffect } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import { COLOR } from "../../Utility/Colors";
import { toastMessage } from "../../Utility/Utils";
import { backendURL } from "../../Utility/Constant";

const Logo = ({ school, schoolMessage }) => {
  return (
    <LogoContainer>
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
              <SchoolInfo>
                <LogoImage src={`${backendURL}${school?.logo?.src}`} alt={school?.logo?.alt} />
                <SchoolName>
                  <LargeText>{school.name}</LargeText>
                  <SubText>{school.address}</SubText>
                </SchoolName>
              </SchoolInfo>
              <IsoLogo>
                <LogoImage
                  src={`${backendURL}${school?.certification?.src}`}
                  alt={school?.certification?.alt}
                />
              </IsoLogo>
            </>
          )}
        </>
      )}
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 2rem;
  width: 100%;
  color: ${COLOR.black};
  min-height: 7.5rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const LogoImage = styled.img`
  height: 5.5rem; /* Initial height for both logos */
  object-fit: cover;
`;

const IsoLogo = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SchoolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LargeText = styled.p`
  font-weight: bold;
  text-transform: uppercase;
`;

const SubText = styled.p`
text-transform: uppercase;`;

const SchoolName = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2em;
`;
