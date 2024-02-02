import React from "react";
import styled from "styled-components";
import Loading from "./Loading";
import {
    Container,
    StudentImage,
} from "../CommonStyledComponent/CommonStyledComponent";
import SectionName from "../CommonComponent/SectionName";
import { COLOR } from "../../Utility/Colors";
import { BirthdayCont } from "../CommonComponent/BirthdayCont";
import { backendURL } from "../../Utility/Constant";

const Topper = ({ topper, topperMessage, isAdmin,deleteLink }) => {
    return (
        <>
            <div id="Results"></div>
            <Container
                style={{
                    justifyContent: "start",
                    backgroundColor: "transparent",
                }}
            >
                {!isAdmin && <SectionName>TOPPERS</SectionName>}
                <InnerCont>
                    {topper.length === 0 && topperMessage ? (
                        <>
                            <p>{topperMessage}</p>
                        </>
                    ) : (
                        <>
                            {topper.length ? (
                                <>
                                    {topper.map((item, idx) => (
                                        <BirthdayCont
                                            key={idx}
                                            isAdmin={isAdmin}
                                            heading={item.section}
                                            showData={item?.toppers}
                                            deleteLink={deleteLink}
                                        >
                                            {TopperCard}
                                        </BirthdayCont>
                                    ))}
                                </>
                            ) : (
                                <Loading />
                            )}
                        </>
                    )}
                </InnerCont>
            </Container>
        </>
    );
};

const TopperCard = ({ oneShowData }) => {
    return (
        <BirthdayCard>
            <Position
                style={{
                    backgroundColor:
                        oneShowData.position === 1
                            ? `${COLOR.gold}`
                            : oneShowData.position === 2
                            ? `${COLOR.silver}`
                            : oneShowData.position === 3
                            ? `${COLOR.bronze}`
                            : `${COLOR.myBlue}`,
                }}
            >
                <p
                    style={{
                        fontSize: "1.5rem",
                        color: `${COLOR.black}`,
                    }}
                >
                    {oneShowData.position}
                </p>
            </Position>
            <StudentImage src={`${backendURL}${oneShowData.src}`} alt={oneShowData.name} />
            <div>
                <h1 style={{color:'black'}}>{oneShowData.name}</h1>
                <h4 style={{color:'black'}}>{`${oneShowData.percentage}%`}</h4>
            </div>
        </BirthdayCard>
    );
};

export default Topper;

const InnerCont = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    min-height: calc(80vh - 4rem);
    width: 100%;
`;

const BirthdayCard = styled.div`
    padding: 1rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(0, 0, 0, 0.2);
    gap: 1rem;
    border-radius: 1rem;
    cursor: pointer;

    h1 {
        font-size: 1.5rem;
        font-weight: bold;
    }

    p {
        font-size: 1rem;
    }
`;

const Position = styled.div`
    height: 3rem;
    width: 3rem;
    font-weight: bold;
    border-radius: 2rem;
    background-color: ${COLOR.red};
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    text-align: center;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${COLOR.white};
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;
