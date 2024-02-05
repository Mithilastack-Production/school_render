import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import { Container } from "../CommonStyledComponent/CommonStyledComponent";
import { COLOR } from "../../Utility/Colors";
import Button from "../CommonComponent/Button";
import { InnerContainer } from "../CommonStyledComponent/CommonStyledComponent";
import { backendURL } from "../../fronendEnv";

const MessageFromTopManagement = ({
    messageFromTopManagement,
    messageFromTopManagementMessage,
}) => {
    return (
        <Container style={{ backgroundColor: "moccasin" }}>
            {messageFromTopManagement.length === 0 &&
            messageFromTopManagementMessage ? (
                <>
                    <p>{messageFromTopManagementMessage}</p>
                </>
            ) : (
                <>
                    {messageFromTopManagement.length === 0 ? (
                        <Loading />
                    ) : (
                        <InnerContainer>
                            {messageFromTopManagement.map((data, idx) => (
                                <MessageFromTopManagementCard
                                    key={idx}
                                    data={data}
                                />
                            ))}
                        </InnerContainer>
                    )}
                </>
            )}
        </Container>
    );
};

const MessageFromTopManagementCard = ({ data }) => {
    const { label, messageData, src, altText, isOpposite } = data;

    const [showMore, setShowMore] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (showMore) {
            setMessage(messageData);
        } else {
            setMessage(`${messageData?.substring(0, 500)}...`);
        }
    }, [showMore]);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <>
            <PageeContainer isOpposite={isOpposite}>
                <PrincipalMessage showMore={showMore}>
                    <h2>{label}</h2>
                    <p style={{ padding: "1rem 0" }}>{messageData}</p>
                    <Button
                        onClick={toggleShowMore}
                        backGroundColor={COLOR.secondary}
                        hoverBackGroundColor={COLOR.secondaryDark}
                    >
                        {showMore ? "Read Less" : "Read More"}
                    </Button>
                </PrincipalMessage>
                <ImageContainer>
                    <DirectorImage src={`${backendURL}${src}`} alt={altText} />
                </ImageContainer>
            </PageeContainer>
        </>
    );
};

export default MessageFromTopManagement;

const ImageContainer = styled.div`
    flex: 1.5;
    height: 60vh;
    overflow: hidden;
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        height: 100%;
    }
`;
const PageeContainer = styled.div`
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    padding: 0;
    background-color: ${COLOR.whitesmoke};
    gap: 2rem;
    margin: 2rem 0;
    border-radius: 1rem;
    @media (min-width: 768px) {
        flex-direction: ${({ isOpposite }) =>
            isOpposite ? "row" : "row-reverse"};
        padding: 1rem;
    }
`;

const DirectorImage = styled.img`
    width: 100%;
    height: 100%;
    background-color: ${COLOR.skyblue};
    overflow: hidden;
    cursor: pointer;
    border-radius: 1rem;
    align-self: center;
    transition: all 0.5s linear;
    &:hover {
        scale: 1.1;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const PrincipalMessage = styled.div`
    flex: 2.5;
    background-color: ${COLOR.primary};
    color: ${COLOR.white};
    border-radius: 1rem;
    padding: 1.5rem;
    h2 {
        font-size: 1.5em;
        font-weight: bold;
    }

    p {
        font-size: 1.2em;
    }
`;
