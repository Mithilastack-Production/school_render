import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLOR } from "../Utility/Colors.js";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Arial", sans-serif;
  padding: 1rem;
  background: linear-gradient(45deg, #eadabe, #a1eaa4, lightpink);
`;

const NotFoundTitle = styled.h1`
  font-size: 1.5rem;
  color: #333;
  text-shadow: 3px 3px 10px grey;
`;
const NotFoundTitle404 = styled.h1`
  font-size: 4rem;
  color: #333;
  font-style: italic;
  line-height: 7rem;
  text-shadow: 3px 3px 10px grey;
`;

const NotFoundSubtitle = styled.p`
  font-size: 1.5rem;
  color: #666;
  text-align: center;
  text-shadow: 3px 3px 10px grey;
`;

const BackButton = styled(Link)`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #007bff;
  text-decoration: none;
  border-radius: 5px;
  background-color: ${COLOR.secondary};
  transition: background-color 0.3s;
  box-shadow: 3px 3px 10px grey;

  &:hover {
    background-color: ${COLOR.secondaryDark};
  }
`;

const PageNotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle404>404</NotFoundTitle404>
      <NotFoundTitle>Page Not Found</NotFoundTitle>
      <NotFoundSubtitle>
        Sorry, the page you are looking for might be in another castle.
      </NotFoundSubtitle>
      <BackButton to="/">Home</BackButton>
    </NotFoundContainer>
  );
};

export default PageNotFound;
