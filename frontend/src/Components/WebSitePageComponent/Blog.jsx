import React, { useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import { Container } from "../CommonStyledComponent/CommonStyledComponent";
import SectionName from "../CommonComponent/SectionName";
import { COLOR } from "../../Utility/Colors";
import { OneArchORCampusContainer } from "../CommonComponent/OneArchORCampusContainer";
import Button from "../CommonComponent/Button";

const Blog = ({ blogs, blogsMessage }) => {
  const [clicked, setClicked] = useState(null);
  return (
    <BlogContainer style={{ backgroundColor: "papayawhip" }}>
      <SectionName>BLOGS</SectionName>
      <BlogCont>
        {blogs.length === 0 && blogsMessage ? (
          <>
            <p>{blogsMessage}</p>
          </>
        ) : (
          <>
            {blogs.length === 0 ? (
              <Loading />
            ) : (
              <>
                {blogs.map((showDataOne, index) => (
                  <OneBlog
                    showDataOne={showDataOne}
                    index={index}
                    clicked={clicked}
                    setClicked={setClicked}
                  />
                ))}
              </>
            )}
          </>
        )}
      </BlogCont>
    </BlogContainer>
  );
};

const OneBlog = ({ showDataOne, index, clicked, setClicked }) => {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <BlogItem
      onMouseEnter={() => setShowMessage(true)}
      onMouseLeave={() => setShowMessage(false)}
      clicked={clicked}
      index={index}
      onClick={() =>
        clicked === null
          ? setClicked(index)
          : index !== clicked
          ? setClicked(index)
          : setClicked(null)
      }
      key={index}
    >
      <OneArchORCampusContainer
        key={index}
        showDataOne={showDataOne}
        index={index}
        clicked={clicked}
        content={"Hello"}
        isBlog = {true}
      />
      {showMessage && (
        <ShowMessage>
          <Button
            backGroundColor={COLOR.primary}
            hoverBackGroundColor={COLOR.primary}
          >
            {clicked==null ? "Click To Read" : "Click to Close"}
          </Button>
        </ShowMessage>
      )}
    </BlogItem>
  );
};

export default Blog;


const BlogContainer = styled(Container)`
  gap: 2rem;
`;
const BlogCont = styled.div`
  min-height: calc(80vh - 4rem);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;
const BlogItem = styled.div`
  position: relative;
  border-radius: 1rem;
  background-color: ${COLOR.whitesmoke};
  box-shadow: 4px 4px 8px rgba(19, 19, 19, 0.6);
  transition: all 1s ease;
  height: ${({ clicked, index }) =>
    clicked === index ? "max-content" : "60vh"};
  word-wrap: break-word;
  overflow: hidden;
  width: ${({ clicked, index }) => (clicked === index ? "100%" : "30%")};
  padding: 1rem;
  display: ${({ clicked, index }) =>
    clicked == null ? "block" : clicked === index ? "block" : "none"};
  cursor: pointer;
  position: relative;

  @media (max-width: 768px) {
    width: 100%; /* Full width for smaller screens */
  }
`;

const ShowMessage = styled.div`
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
`;
