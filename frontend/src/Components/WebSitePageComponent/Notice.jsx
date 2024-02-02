import React from "react";
import styled from "styled-components";
import Loading from "./Loading";
import { backendURL, month } from "../../Utility/Constant";
import { Container } from "../CommonStyledComponent/CommonStyledComponent";
import { COLOR } from "../../Utility/Colors";
import { OneArchORCampusContainer } from "../CommonComponent/OneArchORCampusContainer";
import Slider from "react-slick";

const Notice = ({
    noticeItem,
    achievement,
    campusNews,
    noticeItemMessage,
    achievementMessage,
    campusNewsMessage,
}) => {
    return (
        <>
            <div id="Notice"></div>
            <div id="Achievements"></div>
            <NoticeContainer>
                <SingleCont
                    showData={noticeItem}
                    message={noticeItemMessage}
                    heading={"NOTICE BOARD"}
                >
                    {OneNotice}
                </SingleCont>
                <SingleCont
                    showData={achievement}
                    message={achievementMessage}
                    heading={"ACHIEVEMENT"}
                >
                    {OneArchORCampusContainer}
                </SingleCont>
                <SingleCont
                    showData={campusNews}
                    message={campusNewsMessage}
                    heading={"CAMPUS NEWS"}
                >
                    {OneArchORCampusContainer}
                </SingleCont>
            </NoticeContainer>
        </>
    );
};

const OneNotice = ({ showDataOne }) => {
    showDataOne.publishedDate = new Date(showDataOne.publishedDate);
    return (
        <Link href={`${backendURL}${showDataOne.src}`} target="_blank">
            <DateContainer>
                <h2>{`${showDataOne?.publishedDate?.getDate()}`}</h2>
                <p>{`${
                    month[showDataOne?.publishedDate?.getMonth()]
                } ${showDataOne?.publishedDate?.getFullYear()}`}</p>
            </DateContainer>
            <LinkContainer>{showDataOne.message}</LinkContainer>
        </Link>
    );
};

const SingleCont = ({ showData, heading, children, message }) => {
    const CallChild = children;
    return (
        <Block>
            <Heading>{heading}</Heading>
            <hr />
            {showData.length === 0 && message ? (
                <>
                    <p>{message}</p>
                </>
            ) : (
                <>
                    {showData.length === 0 ? (
                        <Loading />
                    ) : (
                        <ScrollContainer>
                            {showData.map((showDataOne, idx) => (
                                <>
                                    <SingleContainer key={idx}>
                                        <CallChild showDataOne={showDataOne} />
                                    </SingleContainer>
                                </>
                            ))}
                        </ScrollContainer>
                    )}
                </>
            )}
        </Block>
    );
};

// export default Notice;

const NoticeContainer = styled(Container)`
    background-color: ${COLOR.skyblue};
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
`;

const Block = styled.div`
    flex-basis: auto;
    margin: 0.6rem;
    padding: 1rem;
    border-radius: 10px;
    background-color: ${COLOR.whitesmoke};
    text-align: center;
    word-wrap: break-word;
    height: 70vh;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.7);
    box-shadow: 4px 4px 8px black;
    width: 30%;

    @media (max-width: 1000px) {
        width: 45%;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Heading = styled.h2`
    margin: 0;
    padding: 0;
    text-align: start;
    color: ${COLOR.primary};
`;

const ScrollContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    width: 100%;
    max-height: calc(100% - 1.5rem);
    gap: 1rem;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const SingleContainer = styled.div`
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(0, 0, 0, 0.2);
    width: 100%;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
    height: 100%;
`;

const DateContainer = styled.div`
    width: 10rem;
    min-height: 100%;
    background-color: ${COLOR.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${COLOR.white};
    padding: 0.5rem;
`;

const LinkContainer = styled.div`
    text-align: start;
`;

const Link = styled.a`
    display: flex;
    text-decoration: none;
    gap: 1rem;
`;

export default Notice;
