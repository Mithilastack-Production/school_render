import React, { useEffect } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import { toastMessage, toastWorking } from "../../Utility/Utils";
import { COLOR } from "../../Utility/Colors";
import { HeaderWrapper } from "../CommonStyledComponent/CommonStyledComponent";
import { backendURL } from "../../fronendEnv";


const Header = ({ links, linksMessage }) => {
  return (
    <HeaderWrapper>
      <SocialMediaIcons>
        {links.length === 0 && linksMessage ? (
          <>
            <p>{linksMessage}</p>
          </>
        ) : (
          <>
            {links.length === 0 ? (
              <Loading />
            ) : (
              links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialMediaIcon src={`${backendURL}${link.src}`} alt={link.alt} />
                </a>
              ))
            )}
          </>
        )}
      </SocialMediaIcons>
      <TextSection>
        <a href="#Notice" style={{ textDecoration: "none" }}>
          <Text>Notice Board</Text>
        </a>
        <Text onClick={toastWorking}>Online Payment</Text>
      </TextSection>
    </HeaderWrapper>
  );
};

export default Header;


const SocialMediaIcons = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const SocialMediaIcon = styled.img`
  height: 40px;
  padding: 0 0.5rem;
  object-fit: cover;
`;

const TextSection = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Text = styled.p`
  color: ${COLOR.white};
  cursor: pointer;
  &:hover {
    color: ${COLOR.secondary};
  }
`;
