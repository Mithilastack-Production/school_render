import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "./Loading";
import styled from "styled-components";
import SectionName from "../CommonComponent/SectionName";
import { COLOR } from "../../Utility/Colors";
import { Container } from "../CommonStyledComponent/CommonStyledComponent";
import { createContact } from "../../http";

const ContactUs = ({ school }) => {
    <div id="Contact Us"></div>;
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [topic, setTopic] = useState("Admissions");
    const [otherTopic, setOtherTopic] = useState("");
    const [extra, setExtra] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [category, setCategory] = useState("Student");
    const [otherCategoty, setOtherCategory] = useState("");

    const states = [fullName, phone, email, category, topic];

    function validate(regex, value) {
        return regex.test(value);
    }

    const inputDetails = [
        {
            placeholder: "Full Name",
            type: "text",
            isOption: false,
            props: {
                value: fullName,
                func: setFullName,
            },
            regex: /^[a-zA-Z\s]+$/,
        },
        {
            placeholder: "Phone Number",
            type: "number",
            isOption: false,
            props: {
                value: phone,
                func: setPhone,
            },
            regex: /^(?:\+91)?[0-9]{10}$/,
        },
        {
            placeholder: "Email",
            type: "email",
            isOption: false,
            props: {
                value: email,
                func: setEmail,
            },
            regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        },
        {
            placeholder: "Category",
            isOption: true,
            option: ["Student", "Parent", "Alumni", "Other"],
            props: {
                value: category,
                func: setCategory,
            },
            otherProps: {
                value: otherCategoty,
                func: setOtherCategory,
                type: "text",
                placeholder: "Describe your category...",
            },
        },
        {
            placeholder: "Topic",
            isOption: true,
            option: ["Admissions", "Academics", "Student Life", "Other"],
            props: {
                value: topic,
                func: setTopic,
            },
            otherProps: {
                value: otherTopic,
                func: setOtherTopic,
                type: "text",
                placeholder: "Describe your topic...",
            },
        },
    ];

    const sendDataToServer = async () => {
        for (let idx in inputDetails) {
            if (
                inputDetails[idx].regex &&
                !validate(inputDetails[idx].regex, states[idx])
            ) {
                toast(`${inputDetails[idx].placeholder} is invalid!`);
                return;
            }
        }
        setIsPending(true);
        try {
            await createContact({
                name: fullName,
                who: category,
                why: topic,
                phone,
                email,
                message: extra,
            });
            toast("Contact Request sent successfully");
            setFullName("");
            setCategory("Student");
            setTopic("Admissions");
            setPhone("");
            setEmail("");
            setExtra("");
        } catch (e) {
            handleError(e, "Failed to send data try again!");
        } finally {
            setIsPending(false);
        }
    };

    const handleError = (e, message) => {
        if (e.response) {
            toast(e.response.message);
        } else {
            toast(message);
        }
    };

    return (
        <Container
            style={{ backgroundColor: "deepskyblue", padding: "4rem 0" }}
        >
            <BoxArea>
                <div id="Contact Us"></div>
                <SectionName>CONTACT US</SectionName>
                <FormArea>
                    <MessageArea>
                        <h1
                            style={{ alignSelf: "flex-start" }}
                        >{`${school.name}`}</h1>
                        <h3
                            style={{ margin: 0, alignSelf: "center" }}
                        >{`Empowering Minds, Igniting Futures: ${school.name}—Where Excellence is Nurtured, and Dreams Take Flight!`}</h3>
                        <lottie-player
                            src="https://lottie.host/300a1635-9e23-40ea-bacb-7e2f2c6ac676/uu4aC2hD1H.json"
                            background="transparent"
                            speed="1"
                            // style={{ width: "100px", height: "100px" }}
                            loop
                            autoplay
                        ></lottie-player>
                    </MessageArea>
                    <FormGroupComponent
                        inputDetails={inputDetails}
                        validate={validate}
                        extra={extra}
                        setExtra={setExtra}
                        isPending={isPending}
                        sendDataToServer={sendDataToServer}
                    />
                </FormArea>
            </BoxArea>
        </Container>
    );
};

const FormGroupComponent = ({
    inputDetails,
    validate,
    extra,
    setExtra,
    isPending,
    sendDataToServer,
}) => {
    return (
        <FormGroup>
            {inputDetails.map((oneInputDetail, idx) =>
                oneInputDetail.isOption ? (
                    <>
                        <Select
                            key={idx}
                            placeholder={oneInputDetail.placeholder}
                            value={oneInputDetail?.props?.value}
                            onChange={(e) =>
                                oneInputDetail?.props?.func(e.target.value)
                            }
                        >
                            {oneInputDetail?.option.map((option) => (
                                <option value={option}>{option}</option>
                            ))}
                        </Select>
                        {oneInputDetail?.props?.value == "Other" && (
                            <Input
                                key={idx}
                                borderColor={`${COLOR.secondary}`}
                                value={oneInputDetail?.otherProps?.value}
                                onChange={(e) =>
                                    oneInputDetail?.otherProps?.func(
                                        e.target.value
                                    )
                                }
                                type={oneInputDetail?.otherProps.type}
                                placeholder={
                                    oneInputDetail?.otherProps.placeholder
                                }
                            />
                        )}
                    </>
                ) : (
                    <Input
                        key={idx}
                        borderColor={`${
                            oneInputDetail.regex === undefined
                                ? `${COLOR.secondary}`
                                : validate(
                                      oneInputDetail.regex,
                                      oneInputDetail?.props?.value
                                  )
                                ? "green"
                                : "red"
                        }`}
                        value={oneInputDetail?.props?.value}
                        onChange={(e) =>
                            oneInputDetail?.props?.func(e.target.value)
                        }
                        type={oneInputDetail.type}
                        placeholder={oneInputDetail.placeholder}
                    />
                )
            )}
            <TextArea
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                rows="4"
                placeholder="Your message or query............"
            ></TextArea>
            {isPending ? (
                <Loading />
            ) : (
                <Button onClick={sendDataToServer}>Submit</Button>
            )}
        </FormGroup>
    );
};

const BoxArea = styled.div`
    filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.6));
    width: 85vw;
    min-height: 75vh;
    display: flex;
    flex-direction: column;
    background-color: ${COLOR.whitesmoke};
    padding: 1rem;
    @media (max-width: 768px) {
        max-height: 100vh;
        width: 95vw;
    }
`;

const FormArea = styled.div`
    display: flex;
    overflow-y: scroll;
    justify-content: space-between;
    width: 100%;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    gap: 2rem;
    @media (max-width: 768px) {
        width: 100%;
        padding: 0;
    }
`;
const MessageArea = styled.div`
    flex-shrink: 2;
    text-shadow: 2px 20px 15px black;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
    background-color: ${COLOR.secondary};
    @media (max-width: 768px) {
        display: none;
    }
`;
const FormGroup = styled.div`
    padding: 1rem;
    background-color: ${COLOR.white};
    min-height: 100%;
    @media (max-width: 768px) {
        height: max-content;
    }
`;

export const Input = styled.input`
    padding: 5px 8px;
    height: 3rem;
    margin-top: 1rem;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 1rem;
    background-color: rgb(247 247 247 /1);
    -webkit-transition: 0.1s;
    transition: 0.1s;
    &:focus {
        border: 2px solid ${({ borderColor }) => borderColor};
    }
`;

const Select = styled.select`
    padding: 5px 8px;
    height: 3rem;
    margin-top: 1rem;
    width: 100%;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    background-color: rgb(247 247 247 /1);
`;

const TextArea = styled.textarea`
    background-color: rgb(247 247 247 /1);
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    resize: none;
    margin-top: 1rem;
`;

const Button = styled.button`
    width: 100%;
    background-color: ${COLOR.primary};
    margin-top: 1rem;
    height: 3rem;
    border: none;
    border-radius: 1.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    color: ${COLOR.white};
    cursor: pointer;
`;

export default ContactUs;
