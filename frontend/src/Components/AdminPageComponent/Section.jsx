import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../CommonStyledComponent/CommonStyledComponent";
import { COLOR } from "../../Utility/Colors";
import SectionName from "../CommonComponent/SectionName";
import { useSelector } from "react-redux";

const Section = ({ innerBackgroundColor, sectionName, children }) => {
    const { schoolName } = useSelector((state) => state.auth);

    return (
        <MyContainer>
            <SchoolSectionName>
                <SectionName>{sectionName}</SectionName>
                <SchoolName>{schoolName ?? "School Name"}</SchoolName>
            </SchoolSectionName>
            <PageeContainer innerBackgroundColor={innerBackgroundColor}>
                <Containernew>{children}</Containernew>
            </PageeContainer>
        </MyContainer>
    );
};

export default Section;
const MyContainer = styled.div`
    width: 100%;
    padding: 2rem;
    min-height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        padding: 1rem 0.5rem;
    }
`;

const PageeContainer = styled.div`
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    background-color: ${({ innerBackgroundColor }) => innerBackgroundColor};

    min-height: 100%;
    width: 100%;

    border-radius: 1rem;
    @media (min-width: 768px) {
        flex-direction: ${({ isOpposite }) =>
            isOpposite ? "row" : "row-reverse"};
        padding: 1rem;
    }
`;
const Containernew = styled.div`
    display: flex;
    border-radius: 1rem;
    width: 100%;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
const SchoolSectionName = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: 768px) {
        justify-content: center;
        flex-direction: column-reverse;
    }
`;

const SchoolName = styled.div`
    padding: 1rem;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    color: ${COLOR.primary};
    text-transform: uppercase;
`;
