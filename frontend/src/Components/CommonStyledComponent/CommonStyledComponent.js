import styled from "styled-components";
import { COLOR } from "../../Utility/Colors";

export const OuterComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  padding: 2rem;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR.primary};
  width: 100%;
  padding: 0.5rem 3rem;
  text-align: center;
  gap: 0.5rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const StudentImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  transition: all .3s ease;
  &:hover{
    scale: 1.1;
  }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

export const SectionWrapper = styled.div`
    display: flex;
    width: 100%;
  

    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: start;
    }
`;

export const HalfContainer = styled.div`
    flex: 1;
    margin-right: ${(props) => (props.rightMargin ? "2rem" : "1rem")};
`;

export const FormContainer = styled(HalfContainer)`
    padding: 1rem;
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-right: 0px;
    transition: 5s;
    align-content: flex-start;
`;

export const ShowItems = styled.ul`
    list-style: none;
    display: flex;
    flex: 1;
    padding: 1.5rem;
    border-left: 5px solid grey;
    flex-direction: column;
    @media (max-width: 768px) {
        border-top: 5px solid grey;
        border-left: none;
    }
`;

export const OrDiv = styled.div`
    width: 100%;
    color: grey;
    text-align: center;
    padding: 0.5rem;
`;

export const InputFile = styled.input`
    display: inline-block;
    padding: 0.5rem;
    height: 10rem;
`;
