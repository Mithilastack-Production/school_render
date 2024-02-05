import React, { useEffect, useState } from "react";
import { Input } from "../WebSitePageComponent/ContactUs";
import { COLOR } from "../../Utility/Colors";
import FileInput from "./FileInput";
import {
    Button,
    OptionTag,
    Select,
    TextArea,
} from "../WebSitePageComponent/Formpopup";
import { toast } from "react-toastify";
import { Image, ImageContainer } from "../WebSitePageComponent/AboutUs";
import Loading from "../WebSitePageComponent/Loading";
import { month } from "../../Utility/Constant";
import { backendURL } from "../../fronendEnv";
import Section from "./Section";
import {
    ButtonsContainer,
    FormContainer,
    OrDiv,
    SectionWrapper,
    ShowItems,
} from "../CommonStyledComponent/CommonStyledComponent";
import {
    deleteAdmissionRequest,
    getAdmissionRequests,
    updateAdmissionRequest,
} from "../../http";
import styled from "styled-components";

export default function AdmissionRequest() {
    const [loading, setLoading] = useState(false);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        async function getLink() {
            setLoading(true);
            try {
                const req = await getAdmissionRequests();
                setLinks(req.data);
            } catch (e) {
                toast.error("Failed to load");
            } finally {
                setLoading(false);
            }
        }
        getLink();
    }, []);

    function removeLink(item) {
        setLinks((prev) => prev.filter((link) => link !== item));
    }

    function replaceItem(item, newItem) {
        setLinks((prevLinks) => {
            const updatedLinks = [...prevLinks];
            updatedLinks[updatedLinks.indexOf(item)] = newItem;
            return updatedLinks;
        });
    }

    return (
        <Section innerBackgroundColor="lightblue" sectionName={"Admission Request"}>
            <SectionWrapper>
                <ShowItems style={{border:"none"}}>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            {links.length ? (
                                <>
                                    {links.map((link, i) => (
                                        <MyInnerComponent
                                            key={Math.random()}
                                            isEditable={true}
                                            item={link}
                                            replaceItem={replaceItem}
                                            removeLink={removeLink}
                                        />
                                    ))}
                                </>
                            ) : (
                                <h1>No Requests</h1>
                            )}
                        </>
                    )}
                </ShowItems>
            </SectionWrapper>
        </Section>
    );
}

function MyInnerComponent({ item, removeLink, replaceItem }) {
    const [name, setName] = useState(item?.name ?? "");
    const [fatherName, setFatherName] = useState(item?.fatherName ?? "");
    const [motherName, setMotherName] = useState(item?.motherName ?? "");
    const [address, setAddress] = useState(item?.address ?? "");
    const [phone, setPhone] = useState(item?.phone ?? "");
    const [email, setEmail] = useState(item?.email ?? "");
    const [prevPercents, setPrevPercents] = useState(item?.prevPercents ?? "");
    const [dob, setDob] = useState(item?.dob ?? null);
    const [message, setMessage] = useState(item?.message ?? "");
    const [gender, setGender] = useState(item?.gender ?? "");
    const [className, setClassName] = useState(item?.className ?? "");
    const [responded, setResponded] = useState(item?.responded ?? "");
    const [loading, setLoading] = useState(false);

    async function deleteLink() {
        const result = window.confirm("Are you sure to delete?");
        if (!result) {
            return;
        }
        setLoading(true);
        try {
            await deleteAdmissionRequest(item?._id);
            removeLink(item);
            toast("Delete Success");
        } catch (e) {
            handleError(e, "Failed to delete!");
        } finally {
            setLoading(false);
        }
    }

    async function updateLink() {
        setLoading(true);
        try {
            const res = await updateAdmissionRequest(item?._id, {
                ...item,
                responded: true,
            });
            replaceItem(item, res.data);
            toast("Update Success");
        } catch (e) {
            handleError(e, "Failed to update!");
        } finally {
            setLoading(false);
        }
    }

    const handleError = (e, message) => {
        if (e.response) {
            toast(e.response.message);
        } else {
            toast(message);
        }
    };
    return (
        <FormContainer>
            <hr
                style={{
                    display: "inline-block",
                    height: "5px",
                    background: "grey",
                }}
            />
            <Label>Name</Label>
            <Input disabled={true} value={name} type="text" />
            <Label>Father's Name</Label>
            <Input disabled={true} value={fatherName} type="text" />
            <Label>Mother's Name</Label>
            <Input disabled={true} value={motherName} type="text" />
            <Label>Address</Label>
            <Input disabled={true} value={address} type="text" />
            <Label>Phone</Label>
            <Input disabled={true} value={phone} type="text" />
            <Label>Email</Label>
            <Input disabled={true} value={email} type="text" />
            <Label>Prev Percentage</Label>
            <Input disabled={true} value={prevPercents} type="text" />
            <Label>Date of Birth</Label>
            <Input disabled={true} value={dob.slice(0, 10)} type="text" />
            <Label>Gender</Label>
            <Input disabled={true} value={gender} type="text" />
            <Label>Class</Label>
            <Input disabled={true} value={className} type="text" />
            <Label>Message</Label>
            <TextArea disabled={true} value={message} type="text" rows="10" />
            <ButtonsContainer>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {responded || (
                            <Button onClick={updateLink}>Contacted</Button>
                        )}
                        <Button onClick={deleteLink}>Delete</Button>
                    </>
                )}
            </ButtonsContainer>
        </FormContainer>
    );
}

const Label = styled.label`
    color: #3e3e55;
    font-weight: bold;
    margin-top: 2rem;
`;
