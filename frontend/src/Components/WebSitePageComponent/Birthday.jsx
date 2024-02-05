import React from "react";
import styled from "styled-components";
import { toastWorking } from "../../Utility/Utils";
import { Container, StudentImage } from "../CommonStyledComponent/CommonStyledComponent";
import {  lottieAnimations, month, options } from "../../Utility/Constant";
import { backendURL } from "../../fronendEnv";
import { COLOR } from "../../Utility/Colors";
import random from "random";
import { BirthdayCont } from "../CommonComponent/BirthdayCont";


const Birthday = ({
  studentBirthday,
  teacherBirthday,
  studentBirthdayMessage,
  teacherBirthdayMessage,
}) => {
  return (
    <BirthdayContainer style={{ backgroundColor: "lightpink" }}>
      <BirthdayCont
        heading={"STUDENT BIRTHDAY"}
        message={studentBirthdayMessage}
        showData={studentBirthday}
        isBirthday={true}
      >
        {BirthdayCard}
      </BirthdayCont>
      <BirthdayCont heading={"QUICK LINKS"} showData={options}>
        {QuickLinksItem}
      </BirthdayCont>
      <BirthdayCont
        heading={"TEACHER BIRTHDAY"}
        message={teacherBirthdayMessage}
        showData={teacherBirthday}
        isBirthday={true}
      >
        {BirthdayCard}
      </BirthdayCont>
    </BirthdayContainer>
  );
};

const QuickLinksItem = ({ showData }) => {
  return (
    <LinkContainer>
      {showData.map((item, idx) => (
        <SingleQuickLink
          key={idx}
          onClick={
            item === "Career" || item === "Academic"
              ? toastWorking
              : function () {}
          }
          href={`#${item}`}
        >
          {item}
        </SingleQuickLink>
      ))}
    </LinkContainer>
  );
};

const BirthdayCard = ({ oneShowData }) => {
  oneShowData.dob = new Date(oneShowData.dob);
  return (
    <BirthdayCardStyle>
      <ImagesContainer>
        <StudentImage src={`${backendURL}${oneShowData.src}`} alt={oneShowData.name} />
      </ImagesContainer>

      <h1>Happy Birthday, {oneShowData.name}!</h1>
      <p>
        Born on:
        {` ${oneShowData?.dob?.getDate()}-${
          month[oneShowData?.dob?.getMonth()]
        }-${oneShowData?.dob?.getFullYear()}`}
      </p>
      {oneShowData.classOfStudent && (
        <p>
          Class: {oneShowData.classOfStudent}-{oneShowData.section}
        </p>
      )}
      <br />
      <p>{oneShowData.message}</p>
      <LottieContainer>
        <lottie-player
          src={lottieAnimations[random.int(0, lottieAnimations.length - 1)]}
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      </LottieContainer>
    </BirthdayCardStyle>
  );
};

export default Birthday;

const BirthdayContainer = styled(Container)`
  flex-direction: row;
  gap: 1rem;
  flex-wrap: nowrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BirthdayCardStyle = styled.div`
  position: relative;
  padding: 1rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-content: center;
  border-radius: 1rem;
  cursor: pointer;
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0;
    margin: 0;
  }

  p {
    font-size: 1rem;
    padding: 0;
    margin: 0;
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkContainer = styled.div`
  background-color: ${COLOR.whitesmoke};
  width: 100%;
  height: calc(100% - 3rem);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 1rem;
  align-content: center;
  border-radius: 1rem;
`;
const SingleQuickLink = styled.a`
  display: inline-block;
  min-width: max-content;
  min-height: max-content;
  padding: 0.5rem;
  border: 2px solid ${COLOR.secondary};
  color: ${COLOR.black};
  text-decoration: none;
  border-radius: 1rem;
  transition: all 0.5s ease-in-out;
  background-color: ${COLOR.white};

  &:hover {
    background-color: ${COLOR.secondary};
  }
`;

const LottieContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
