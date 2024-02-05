import React from "react";
import styled from "styled-components";
import Loading from "./Loading";
import SectionName from "../CommonComponent/SectionName";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { COLOR } from "../../Utility/Colors";
import { backendURL } from "../../fronendEnv";

const settings = {
    variableWidth: true,
    autoplay: true,
    adaptiveHeight: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    pauseOnFocus: true,

    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
                infinite: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                infinite: true,
                slidesToScroll: 1,
                initialSlide: 2,
                dots: false,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                infinite: true,
                slidesToScroll: 1,
                dots: false,
                rows: 1,
                accessibility: false,
                arrows: false,
            },
        },
    ],
};

const FacilitiesOrGallerysParentTestimonial = ({
    showData,
    heading,
    id,
    isVideo,
    message,
    color,
}) => {
    return (
        <>
            <div id={id}></div>
            <ContainerWrapper color={color}>
                <SectionName>{heading}</SectionName>
                {showData.length === 0 && message ? (
                    <>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <p>{message}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <ContentDiv>
                            {showData.length === 0 ? (
                                <Loading />
                            ) : (
                                <Slider {...settings} style={{ padding: 0 }}>
                                    {showData.map((oneShowData, index) => (
                                        <ImageBlock
                                            key={index}
                                            isVideo={isVideo}
                                        >
                                            {isVideo ? (
                                                <Iframe
                                                    src={oneShowData.src}
                                                    allowfullscreen="allowfullscreen"
                                                    webkitallowfullscreen
                                                    mozallowfullscreen
                                                    oallowfullscreen
                                                    msallowfullscreen
                                                ></Iframe>
                                            ) : (
                                                <>
                                                    <Image
                                                        src={`${backendURL}${oneShowData.src}`}
                                                        alt={oneShowData.text}
                                                    />
                                                    {oneShowData.text && (
                                                        <TextBackground>
                                                            <ImageText>
                                                                {
                                                                    oneShowData.text
                                                                }
                                                            </ImageText>
                                                        </TextBackground>
                                                    )}
                                                </>
                                            )}
                                        </ImageBlock>
                                    ))}
                                </Slider>
                            )}
                        </ContentDiv>
                    </>
                )}
            </ContainerWrapper>
        </>
    );
};

export default FacilitiesOrGallerysParentTestimonial;

const ContainerWrapper = styled.div`
    height: 65vh;
    width: 100%;
    background-color: ${({ color }) => color};
    padding: 3rem;
    @media (max-width: 530px) {
        padding: 1rem 0.5rem;
    }
`;

const ImageBlock = styled.div`
    overflow: hidden;
    border-radius: 1rem;
    transition: transform 0.3s ease-in-out;
    position: relative;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.6);

    width: ${({ isVideo }) => (isVideo ? "26rem" : "16rem")};
    height: ${({ isVideo }) => (isVideo ? "16rem" : "16rem")};

    @media (max-width: 268px) {
        height: ${({ isVideo }) => (isVideo ? "26rem" : "16rem")};
        width: ${({ isVideo }) => (isVideo ? "7rem" : "12rem")};
    }

    @media (max-width: 450px) {
        height: ${({ isVideo }) => (isVideo ? "12rem" : "16rem")};
        width: ${({ isVideo }) => (isVideo ? "18rem" : "12rem")};
    }
`;

const Image = styled.img`
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    transition: all 0.3s ease;
    overflow: hidden;

    width: ${({ isVideo }) => (isVideo ? "26rem" : "16rem")};
    height: ${({ isVideo }) => (isVideo ? "16rem" : "16rem")};

    @media (max-width: 268px) {
        height: ${({ isVideo }) => (isVideo ? "26rem" : "16rem")};
        width: ${({ isVideo }) => (isVideo ? "12rem" : "12rem")};
    }
    &:hover {
        scale: 1.1;
    }
`;

const TextBackground = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.658);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImageText = styled.p`
    color: ${COLOR.white};
    text-align: center;
    font-size: 0.7rem;
    padding: 0.5rem;
`;

const Iframe = styled.iframe`
    width: 26.1rem;
    height: 16.1rem;
    @media (max-width: 450px) {
        width: 18rem;
        height: 12.1rem;
    }
`;

const ContentDiv = styled.div``;
