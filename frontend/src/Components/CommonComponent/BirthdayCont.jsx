import React from "react";
import styled from "styled-components";
import { COLOR } from "../../Utility/Colors";
import Loading from "../WebSitePageComponent/Loading";
export const BirthdayCont = ({
    heading,
    showData,
    message,
    children,
    isBirthday,
    isAdmin,
    deleteLink,
    item
}) => {
    const CallChild = children;
    return (
        <BirthdayBlock>
            <TextContainer isAdmin={isAdmin}>
                <BoldText>{heading}</BoldText>
                {isAdmin && (
                    <span
                        onClick={() => deleteLink(item._id, item)}
                        style={{
                            display: "flex",
                            justifySelf: "flex-end",
                            cursor: "pointer",
                        }}
                    >
                        Delete
                    </span>
                )}
            </TextContainer>
            {heading === "QUICK LINKS" ? (
                <CallChild showData={showData} message={message} />
            ) : (
                <EachBirthdayBlock>
                    {showData.length === 0 && message ? (
                        <p>{message}</p>
                    ) : showData.length ? (
                        <ScrollContainer isBirthday={isBirthday}>
                            {showData.map((oneShowData, idx) => (
                                <>
                                    <CallChild
                                        key={idx}
                                        isAdmin = {isAdmin}
                                        item={item}
                                        id = {oneShowData._id}
                                        deleteLink={deleteLink}
                                        oneShowData={oneShowData}
                                    />
                                </>
                            ))}
                        </ScrollContainer>
                    ) : (
                        <Loading />
                    )}
                </EachBirthdayBlock>
            )}
        </BirthdayBlock>
    );
};

const BirthdayBlock = styled.div`
    height: calc(80vh - 4rem);
    min-width: 30%;
    background-color: ${COLOR.whitesmoke};
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 1rem;
    @media (max-width: 768px) {
        width: 100%; /* Full width for smaller screens */
    }
`;
const TextContainer = styled.div`
    height: 3rem;
    padding: 0 0.5rem;
    display: flex;
    justify-content: ${({ isAdmin }) => (isAdmin ? "space-between" : "center")};
    align-items: center;
    background-color: ${COLOR.secondary};
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
`;

const EachBirthdayBlock = styled.div`
    width: 100%;
    height: calc(100% - 3rem);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
    gap: ${({ isBirthday }) => (isBirthday ? "2rem" : "1rem")};
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0.5rem;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;
const BoldText = styled.p`
    font-weight: bold;
    color: ${COLOR.white};
    text-align: center;
`;
