import React from "react";
import styled from "styled-components";
import { COLOR } from "../../Utility/Colors";
import { options } from "../../Utility/Constant";

const Footer = ({ school, about }) => {
  const gallery = ["Photo Gallery", "Video Gallery"];
  return (
    <FoterContainer>
      <StyledFooter>
        <FooterBlock>
          <h3>About Us</h3>
          <p>
            {about}
          </p>
        </FooterBlock>
        <FooterBlock>
          <h3>Quick Links</h3>
          <ul>
            {options.map((option) => (
              <li>
                <a href={`#${option}`}>{option}</a>
              </li>
            ))}
          </ul>
        </FooterBlock>
        <FooterBlock>
          <h3>Gallery</h3>
          <ul>
            {gallery.map((item) => (
              <li>
                <a href="#Gallery">{item}</a>
              </li>
            ))}
          </ul>
          <br />
          <h3>School Timing</h3>
          <SchoolShow showData={school?.timing} />
        </FooterBlock>
        <FooterBlock>
          <h3>Contact Us</h3>

          <p>{school.address ? school.address : ""}</p>
          <br />
          <SchoolShow showData={school?.phones} ptag="Phone" />
          <br />
          <SchoolShow showData={school?.emails} ptag="Email" />
        </FooterBlock>
      </StyledFooter>
      <Copyright>© 2023 Public School | Designed by : @Edudoor</Copyright>
    </FoterContainer>
  );
};

const SchoolShow = ({ showData, ptag }) => {
  return (
    <>
      {showData?.length && (
        <>
          {ptag && <b>{ptag}: </b>}
          {showData.map((data) => (
            <p>{data}</p>
          ))}
        </>
      )}
    </>
  );
};

export default Footer;

const FoterContainer = styled.div`
  min-height: 50vh;
  width: 100%;
  background-color: ${COLOR.secondaryDark};
  display: flex;
  color: ${COLOR.white};
  flex-direction: column;
`;

const StyledFooter = styled.div`
  min-height: 50vh;
  padding: 1rem 2rem 3rem 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
    align-content: center;
  }
`;

const FooterBlock = styled.div`
  flex: 1;
  margin: 1.5rem;
  text-align: left;

  h3 {
    margin-bottom: 10px;
    position: relative;
    color: ${COLOR.b};

    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 4px;
      background-color: ${COLOR.secondaryLight};
      bottom: -0.5rem;
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 5px;
    }

    a {
      text-decoration: none;
      color: white;
      transition: text-decoration 0.3s;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    text-align: center;

    h4 {
      text-align: center;
    }
  }
`;

const Copyright = styled.div`
  background-color: black;
  color: white;
  text-align: center;
  width: 100%;
  padding: 1rem;
`;
