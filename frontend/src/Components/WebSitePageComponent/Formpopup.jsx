import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "./Loading";
import styled from "styled-components";
import { COLOR } from "../../Utility/Colors";
import { createAdmissionRequest } from "../../http";

function Formpopup({ onClose }) {
    const [fullName, setFullName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [motherName, setMotherName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [percent, setPercent] = useState("");
    const [dob, setDOB] = useState("");
    const [gender, setGender] = useState("Male");
    const [className, setClassName] = useState("1st");
    const [extra, setExtra] = useState("");
    const [isPending, setIsPending] = useState(false);

    const states = [
        fullName,
        fatherName,
        motherName,
        address,
        phone,
        email,
        percent,
        dob,
        gender,
        className,
    ];

    function validate(regex, value) {
        return regex.test(value);
    }

    const inputDetails1 = [
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
            placeholder: "Father's Name",
            type: "text",
            isOption: false,
            props: {
                value: fatherName,
                func: setFatherName,
            },
            regex: /^[a-zA-Z\s]+$/,
        },
        {
            placeholder: "Mother's Name",
            type: "text",
            isOption: false,
            props: {
                value: motherName,
                func: setMotherName,
            },
            regex: /^[a-zA-Z\s]+$/,
        },
        {
            placeholder: "Address",
            type: "text",
            isOption: false,
            props: {
                value: address,
                func: setAddress,
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
    ];

    const inputDetails2 = [
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
            placeholder: "Previous Percentage (Optional)",
            type: "text",
            isOption: false,
            isOptional: true,
            props: {
                value: percent,
                func: setPercent,
            },
            // regex: /^[0-9]{2}$/,
            regex: /^(?:100(?:\.0{1,2})?|\d{1,2}(?:\.\d{1,2})?%?)(?:,(?:100(?:\.0{1,2})?|\d{1,2}(?:\.\d{1,2})?%?))*$/,
        },
        {
            placeholder: "Date Of Birth",
            type: "date",
            isOption: false,
            props: {
                value: dob,
                func: setDOB,
            },
        },

        {
            placeholder: "Gender",
            isOption: true,
            option: ["Male", "Female"],
            props: {
                value: gender,
                func: setGender,
            },
        },
        {
            placeholder: "Choose Class",
            isOption: true,
            option: [
                "1st",
                "2nd",
                "3rd",
                "4th",
                "5th",
                "6th",
                "7th",
                "8th",
                "9th",
                "10th",
                "11th/12th",
                "Graduation",
            ],
            props: {
                value: className,
                func: setClassName,
            },
        },
    ];

    const inputDetails = [...inputDetails1, ...inputDetails2];

    const sendDataToServer = async () => {
        for (let idx in inputDetails) {
            if (inputDetails[idx].isOptional) {
                continue;
            } else {
                if (
                    inputDetails[idx].regex &&
                    !validate(inputDetails[idx].regex, states[idx])
                ) {
                    toast(`${inputDetails[idx].placeholder} is invalid!`);
                    return;
                }
            }
        }

        setIsPending(true);
        try {
            await createAdmissionRequest({
                name: fullName,
                fatherName,
                motherName,
                address,
                phone,
                email,
                prevPercents: percent,
                dob,
                gender,
                className,
                message: extra,
            });
            toast("Admission Request sent successfully");
            onClose();
            setFullName("");
            setFatherName("");
            setMotherName("");
            setAddress("");
            setPhone("");
            setEmail("");
            setPercent("");
            setDOB("");
            setGender("Male");
            setClassName("1st");
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
        <BoxArea>
            <HeadingArea>
                <Heading>Admission Form</Heading>
                <CloseBtn
                    onClick={() => {
                        onClose();
                    }}
                >
                    &times;
                </CloseBtn>
            </HeadingArea>
            <FormArea isFull={true}>
                <LeftForm>
                    <FormGroupComponent
                        inputDetails={inputDetails1}
                        validate={validate}
                    />
                </LeftForm>
                <RightForm>
                    <FormGroupComponent
                        inputDetails={inputDetails2}
                        validate={validate}
                    />
                </RightForm>
            </FormArea>
            <FormArea>
                <FormGroupComponent
                    inputDetails={inputDetails}
                    validate={validate}
                />
            </FormArea>
            <FormGroup>
                <TextArea
                    value={extra}
                    onChange={(e) => setExtra(e.target.value)}
                    rows="4"
                    placeholder="Addition Information if Any with , separated (Health Issue,extracurricular activities,Reason for choosing the program.......)"
                ></TextArea>
            </FormGroup>
            {isPending ? (
                <Loading />
            ) : (
                <Button onClick={sendDataToServer}>Submit</Button>
            )}
        </BoxArea>
    );
}

const FormGroupComponent = ({ inputDetails, validate }) => {
    return (
        <FormGroup>
            {inputDetails.map((oneInputDetail, idx) =>
                oneInputDetail.isOption ? (
                    <Select
                        key={idx}
                        placeholder={oneInputDetail.placeholder}
                        value={oneInputDetail?.props?.value}
                        onChange={(e) =>
                            oneInputDetail?.props?.func(e.target.value)
                        }
                    >
                        {oneInputDetail?.option.map((option) => (
                            <OptionTag value={option}>{option}</OptionTag>
                        ))}
                    </Select>
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
                                ? `${COLOR.green}`
                                : `${COLOR.red}`
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
        </FormGroup>
    );
};

export const OptionTag = styled.option`
    display: block;
    padding: 1rem 0;
    margin: 1rem 0;
    font-size: 1.5em;
    line-height: 1.5em;
    transition: 0.5s;
`;

const BoxArea = styled.div`
    width: 80vw;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-height: 75vh;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    z-index: 1;
    background-color: ${COLOR.whitesmoke};
    padding: 1rem;

    @media (max-width: 768px) {
        max-height: 95vh;
        width: 95vw;
    }
`;
const HeadingArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Heading = styled.h1`
    margin: 0;
    padding: 0;
    text-align: start;
    color: ${COLOR.primary};
`;

const CloseBtn = styled.div`
    font-size: 2.5rem;
    cursor: pointer;
    color: ${COLOR.black};
`;

const FormArea = styled.div`
    display: ${({ isFull }) => (isFull ? "flex" : "none")};
    overflow-y: scroll;
    justify-content: center;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    @media (max-width: 768px) {
        display: ${({ isFull }) => (isFull ? "none" : "flex")};
    }
    gap: 3rem;
`;

const LeftForm = styled.div`
    min-width: 45%;
    border-radius: 10px 0 0 10px;
`;

const RightForm = styled.div`
    min-width: 45%;
    border-radius: 0 10px 10px 0;
`;

const FormGroup = styled.div``;

export const Input = styled.input`
    padding: 5px 8px;
    height: 2.5rem;
    margin-top: 1rem;
    width: 100%;
    border: none;
    outline: none;
    box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.114) inset,
        1px 1px 1px rgba(0, 0, 0, 0.114) inset;
    border-radius: 5px;
    font-size: 15px;
    color: ${COLOR.black};
    background-color: ${COLOR.whitesmoke};
    -webkit-transition: 0.1s;
    transition: 0.1s;

    &:focus {
        border: 2px solid ${({ borderColor }) => borderColor};
    }
`;

export const Select = styled.select`
    padding: 5px;
    height: 2.5rem;
    margin-top: 1rem;
    width: 100%;
    border: none;
    box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.114) inset,
        1px 1px 1px rgba(0, 0, 0, 0.114) inset;
    border-radius: 5px;
    font-size: 15px;
    color: ${COLOR.black};
    background-color: ${COLOR.whitesmoke};
    outline: none;
    &:focus {
        border: 2px solid green;
    }
`;

export const TextArea = styled.textarea`
    background-color: ${COLOR.whitesmoke};
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    resize: none;
    margin-top: 20px;
    outline: none;
    &:focus {
        border: 2px solid green;
    }
`;

export const Button = styled.button`
    width: 100%;
    background-color: ${COLOR.primary};
    margin-top: 20px;
    height: 45px;
    border: none;
    border-radius: 25px;
    font-size: 15px;
    text-transform: uppercase;
    color: ${COLOR.white};
    cursor: pointer;
`;
export default Formpopup;
