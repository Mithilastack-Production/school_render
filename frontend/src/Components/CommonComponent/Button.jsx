import React from "react";
import styled from "styled-components";

function Button({
  children,
  backGroundColor,
  hoverBackGroundColor,
  onClick,
  style,
}) {
  return (
    <ButtonCont
      style={style}
      onClick={onClick}
      backGroundColor={backGroundColor}
      hoverBackGroundColor={hoverBackGroundColor}
    >
      {children}
    </ButtonCont>
  );
}

export default Button;

const ButtonCont = styled.button`
  background-color: ${({ backGroundColor }) => backGroundColor};
  color: white;
  padding: 0.625rem 1.25rem;
  border: none;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ hoverBackGroundColor }) => hoverBackGroundColor};
  }
`;
