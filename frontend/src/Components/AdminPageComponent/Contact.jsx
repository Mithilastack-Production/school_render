import React, { useEffect, useState } from "react";
import { Input } from "../WebSitePageComponent/ContactUs";
import {
    Button, TextArea
} from "../WebSitePageComponent/Formpopup";
import { toast } from "react-toastify";
import Loading from "../WebSitePageComponent/Loading";
import Section from "./Section";
import {
    ButtonsContainer,
    FormContainer, SectionWrapper,
    ShowItems
} from "../CommonStyledComponent/CommonStyledComponent";
import styled from "styled-components";
import { deleteContact, getContacts, updateContact } from "../../http";

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        async function getLink() {
            setLoading(true);
            try {
                const req = await getContacts();
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
        <Section innerBackgroundColor="lightblue" sectionName={"Contact Us"}>
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
    const [who, setWho] = useState(item?.who ?? "");
    const [why, setWhy] = useState(item?.why ?? "");
    const [phone, setPhone] = useState(item?.phone ?? "");
    const [email, setEmail] = useState(item?.email ?? "");
    const [message, setMessage] = useState(item?.message ?? "");
    const [responded, setResponded] = useState(item?.responded ?? false);
    const [loading, setLoading] = useState(false);

    async function deleteLink() {
        const result = window.confirm("Are you sure to delete?");
        if (!result) {
            return;
        }
        setLoading(true);
        try {
            await deleteContact(item?._id);
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
            const res = await updateContact(item?._id, {
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
            
            <Label>Name</Label>
            <Input disabled={true} value={name} type="text" />
            <Label>Phone</Label>
            <Input disabled={true} value={phone} type="text" />
            <Label>Email</Label>
            <Input disabled={true} value={email} type="text" />
            <Label>Who</Label>
            <Input disabled={true} value={who} type="text" />
            <Label>Why</Label>
            <Input disabled={true} value={why} type="text" />
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
            <br />
            <hr
                style={{
                    display: "inline-block",
                    height: "5px",
                    background: "grey",
                }}
            />
            <br /><br />
        </FormContainer>
    );
}

const Label = styled.label`
    color: #3e3e55;
    font-weight: bold;
    margin-top: 2rem;
`;

