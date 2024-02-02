import React, { useEffect, useState } from "react";
import { Input } from "../WebSitePageComponent/ContactUs";
import { COLOR } from "../../Utility/Colors";
import FileInput from "./FileInput";
import { Button, TextArea } from "../WebSitePageComponent/Formpopup";
import { toast } from "react-toastify";
import { Image, ImageContainer } from "../WebSitePageComponent/AboutUs";
import Loading from "../WebSitePageComponent/Loading";
import { backendURL } from "../../Utility/Constant";
import { readFileAsDataURL, toastMessage } from "../../Utility/Utils";
import Section from "./Section";
import {
    ButtonsContainer,
    FormContainer,
    SectionWrapper,
    ShowItems,
} from "../CommonStyledComponent/CommonStyledComponent";
import {
    createSchool,
    deleteSchool,
    getSchools,
    updateSchool,
} from "../../http";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setSchoolName } from "../../AuthSlice";

export default function School() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        async function getLink() {
            setLoading(true);
            try {
                const req = await getSchools();
                setLinks(req.data);
            } catch (e) {
                toast.error("Failed to load");
                setFailed(true);
            } finally {
                setLoading(false);
            }
        }
        getLink();
    }, []);

    function setNewLinks(item) {
        setLinks((prevLinks) => {
            const updatedLinks = [item, ...prevLinks];
            return updatedLinks;
        });
    }

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
        <Section
            innerBackgroundColor="lightblue"
            sectionName={"School details"}
        >
            <SectionWrapper>
                <ShowItems style={{ border: "none" }}>
                    {loading ? (
                        <>
                            <Loading />
                        </>
                    ) : (
                        <>
                            {failed ? (
                                <>
                                    <h1>
                                        Failed to load data please refresh the
                                        page
                                    </h1>
                                </>
                            ) : (
                                <>
                                    {links.length === 0 ? (
                                        <>
                                            <MyInnerComponent
                                                setNewLinks={setNewLinks}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {links.map((link, i) => (
                                                <MyInnerComponent
                                                    key={link._id}
                                                    isEditable={true}
                                                    item={link}
                                                    removeLink={removeLink}
                                                    replaceItem={replaceItem}
                                                />
                                            ))}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </ShowItems>
            </SectionWrapper>
        </Section>
    );
}

function MyInnerComponent({
    isEditable = false,
    item,
    setNewLinks,
    removeLink,
    replaceItem,
}) {
    const [name, setName] = useState(item?.name ?? "");
    const [address, setAddress] = useState(item?.address ?? "");
    const [phones, setPhones] = useState(item?.phones ?? []);
    const [emails, setEmails] = useState(item?.emails ?? []);
    const [timing, setTiming] = useState(item?.timing ?? []);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [curPhone, setCurPhone] = useState("");
    const [curEmail, setCurEmail] = useState("");
    const [curTiming, setCurTiming] = useState("");
    const dispatch = useDispatch();

    const isImageFile = (fileName) => {
        const allowedExtensions =
            /\.(jpg|jpeg|png|gif|tiff|bmp|svg|webp|heif|ico)$/i;
        return allowedExtensions.test(fileName);
    };

    const fileSelectionHandler1 = (e) => {
        const file = e.target.files[0];
        setSelectedFile1(file);
    };
    const fileSelectionHandler2 = (e) => {
        const file = e.target.files[0];
        setSelectedFile2(file);
    };

    const verifyAndSendDataToServer = () => {
        if (!name) {
            toast("Name cannot be empty");
            return false;
        }
        if (!address) {
            toast("Address cannot be empty");
            return false;
        }
        if (phones.length === 0) {
            toast("Phones cannot be empty");
            return false;
        }
        if (emails.length === 0) {
            toast("Emails cannot be empty");
            return false;
        }
        if (timing.length === 0) {
            toast("Timings cannot be empty");
            return false;
        }

        if (!isEditable) {
            if (!selectedFile1 || !selectedFile2) {
                toast("Image cannot be empty");
                return false;
            }
            if (
                !isImageFile(selectedFile1.name) ||
                !isImageFile(selectedFile2.name)
            ) {
                toast("Selected Image is not an image file");
                return false;
            }
            if (
                selectedFile1.size > 1024 * 1024 * 2 ||
                selectedFile2.size > 1024 * 1024 * 2
            ) {
                toast("selected image size is larger than 2MB");
                return false;
            }
        }
        return true;
    };

    async function createNewLink() {
        const valid = verifyAndSendDataToServer();
        if (!valid) {
            return;
        }
        setLoading(true);
        try {
            const image1 = await readFileAsDataURL(selectedFile1);
            const image2 = await readFileAsDataURL(selectedFile2);
            const req = await createSchool({
                name,
                address,
                image1,
                image2,
                logo: { alt: "Logo" },
                certification: { alt: "Certification" },
                phones,
                emails,
                timing,
            });
            dispatch(setSchoolName(name));
            setName("");
            setAddress("");
            setSelectedFile1(null);
            setSelectedFile2(null);
            setNewLinks(req.data);
            toast("Created successfully");
        } catch (e) {
            toast("Failed to Create");
        }
        setLoading(false);
    }

    async function updateLink() {
        const valid = verifyAndSendDataToServer();
        if (!valid) {
            return;
        }
        setLoading(true);
        try {
            let image1 = null;
            let image2 = null;
            if (selectedFile1) {
                image1 = await readFileAsDataURL(selectedFile1);
            }
            if (selectedFile2) {
                image2 = await readFileAsDataURL(selectedFile2);
            }
            const res = await updateSchool(item?._id, {
                name,
                address,
                image1,
                image2,
                logo: { alt: "Logo" },
                certification: { alt: "Certification" },
                phones,
                emails,
                timing,
            });
            dispatch(setSchoolName(name));
            replaceItem(item, res.data);
            setSelectedFile1(null);
            setSelectedFile2(null);
            setEdit(false);
            toast("Update successfully");
        } catch (e) {
            toast("Update failed");
        }
        setLoading(false);
    }

    async function deleteLink() {
        const result = window.confirm("Are you sure to delete?");
        if (!result) {
            return;
        }
        setLoading(true);
        dispatch(setSchoolName(null));
        try {
            await deleteSchool(item?._id);
            removeLink(item);
            toast("Delete successfully");
        } catch (e) {
            toast("Deletion Failed");
        }
        setLoading(false);
    }

    function changeEdit() {
        if (edit) {
            setName(item.name ?? "");
            setAddress(item.address ?? "");
            setPhones(item.phones ?? []);
            setEmails(item.emails ?? []);
            setTiming(item.timing ?? []);
            setCurEmail("");
            setCurPhone("");
            setCurTiming("");
            setEdit(false);
        } else {
            setEdit(true);
        }
    }

    const addPhone = () => {
        if (!curPhone) {
            toast("Phone field is empty");
            return;
        }
        if (phones.includes(curPhone)) {
            toast("Phone is already included");
            return;
        }
        setCurPhone("");
        setPhones([...phones, curPhone]);
    };

    const removePhone = (value) => {
        setPhones((prev) => prev.filter((link) => link !== value));
    };

    const addEmail = () => {
        if (!curEmail) {
            toast("Email field is empty");
            return;
        }
        if (emails.includes(curEmail)) {
            toast("Email is already included");
            return;
        }
        setCurEmail("");
        setEmails([...emails, curEmail]);
    };

    const removeEmail = (value) => {
        setEmails((prev) => prev.filter((link) => link !== value));
    };

    const addTiming = () => {
        if (!curTiming) {
            toast("Timing field is empty");
            return;
        }
        if (timing.includes(curTiming)) {
            toast("Timing is already included");
            return;
        }
        setCurTiming("");
        setTiming([...timing, curTiming]);
    };

    const removeTiming = (value) => {
        setTiming((prev) => prev.filter((link) => link !== value));
    };

    return (
        <FormContainer>
            <Input
                disabled={isEditable ? (edit ? false : true) : false}
                borderColor={`${COLOR.green}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="School Name"
            />
            <Input
                disabled={isEditable ? (edit ? false : true) : false}
                borderColor={`${COLOR.green}`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="School Address"
            />

            {isEditable ? (
                <>
                    {edit ? (
                        <>
                            <br />
                            <Span>School Logo</Span>
                            <FileInput
                                state={selectedFile1}
                                setState={fileSelectionHandler1}
                            />
                            <br />
                            <Span>School Certification Logo</Span>
                            <FileInput
                                state={selectedFile2}
                                setState={fileSelectionHandler2}
                            />
                            <br />
                            {phones.map((phone) => {
                                return (
                                    <ButtonsContainer>
                                        <Input
                                            style={{ background: "lightgray" }}
                                            disabled
                                            borderColor={`${COLOR.green}`}
                                            value={phone}
                                        />
                                        <Button
                                            style={{ width: "120px" }}
                                            onClick={() => removePhone(phone)}
                                        >
                                            remove
                                        </Button>
                                    </ButtonsContainer>
                                );
                            })}
                            <ButtonsContainer>
                                <Input
                                    disabled={
                                        isEditable
                                            ? edit
                                                ? false
                                                : true
                                            : false
                                    }
                                    borderColor={`${COLOR.green}`}
                                    value={curPhone}
                                    onChange={(e) =>
                                        setCurPhone(e.target.value)
                                    }
                                    type="number"
                                    placeholder="Add Phone"
                                />
                                <Button onClick={addPhone}>Add</Button>
                            </ButtonsContainer>
                            <br />
                            <hr style={{ height: "5px", background: "grey" }} />

                            {emails.map((email) => {
                                return (
                                    <ButtonsContainer>
                                        <Input
                                            style={{ background: "lightgray" }}
                                            disabled
                                            borderColor={`${COLOR.green}`}
                                            value={email}
                                        />
                                        <Button
                                            style={{ width: "120px" }}
                                            onClick={() => removeEmail(email)}
                                        >
                                            remove
                                        </Button>
                                    </ButtonsContainer>
                                );
                            })}
                            <ButtonsContainer>
                                <Input
                                    disabled={
                                        isEditable
                                            ? edit
                                                ? false
                                                : true
                                            : false
                                    }
                                    borderColor={`${COLOR.green}`}
                                    value={curEmail}
                                    onChange={(e) =>
                                        setCurEmail(e.target.value)
                                    }
                                    type="Email"
                                    placeholder="Add Email"
                                />
                                <Button onClick={addEmail}>Add</Button>
                            </ButtonsContainer>
                            <br />
                            <hr style={{ height: "5px", background: "grey" }} />

                            {timing.map((time) => {
                                return (
                                    <ButtonsContainer>
                                        <Input
                                            style={{ background: "lightgray" }}
                                            disabled
                                            borderColor={`${COLOR.green}`}
                                            value={time}
                                        />
                                        <Button
                                            style={{ width: "120px" }}
                                            onClick={() => removeTiming(time)}
                                        >
                                            remove
                                        </Button>
                                    </ButtonsContainer>
                                );
                            })}
                            <ButtonsContainer>
                                <Input
                                    disabled={
                                        isEditable
                                            ? edit
                                                ? false
                                                : true
                                            : false
                                    }
                                    borderColor={`${COLOR.green}`}
                                    value={curTiming}
                                    onChange={(e) =>
                                        setCurTiming(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Add Timing"
                                />
                                <Button onClick={addTiming}>Add</Button>
                            </ButtonsContainer>
                            <br />
                            <br />
                            <br />
                            <br />
                        </>
                    ) : (
                        <>
                            <br />
                            <br />
                            <Span>School Logo</Span>
                            <ImageContainer
                                style={{ height: edit ? "0%" : "auto" }}
                            >
                                <Image
                                    src={`${backendURL}${item.logo?.src}`}
                                    alt={item?.logo.alt}
                                />
                            </ImageContainer>
                            <br />
                            <Span>School Certification Logo</Span>

                            <ImageContainer
                                style={{ height: edit ? "0%" : "auto" }}
                            >
                                <Image
                                    src={`${backendURL}${item.certification?.src}`}
                                    alt={item?.certification.alt}
                                />
                            </ImageContainer>
                            <br />
                            {phones.map((phone) => {
                                return (
                                    <ButtonsContainer>
                                        <Input
                                            style={{ background: "lightgray" }}
                                            disabled
                                            borderColor={`${COLOR.green}`}
                                            value={phone}
                                        />
                                    </ButtonsContainer>
                                );
                            })}

                            <br />
                            <hr style={{ height: "5px", background: "grey" }} />

                            {emails.map((email) => {
                                return (
                                    <ButtonsContainer>
                                        <Input
                                            style={{ background: "lightgray" }}
                                            disabled
                                            borderColor={`${COLOR.green}`}
                                            value={email}
                                        />
                                    </ButtonsContainer>
                                );
                            })}

                            <br />
                            <hr style={{ height: "5px", background: "grey" }} />

                            {timing.map((time) => {
                                return (
                                    <ButtonsContainer>
                                        <Input
                                            style={{ background: "lightgray" }}
                                            disabled
                                            borderColor={`${COLOR.green}`}
                                            value={time}
                                        />
                                    </ButtonsContainer>
                                );
                            })}

                            <br />
                            <br />
                            <br />
                            <br />
                        </>
                    )}
                </>
            ) : (
                <>
                    <br />
                    <Span>School Logo</Span>
                    <FileInput
                        state={selectedFile1}
                        setState={fileSelectionHandler1}
                    />
                    <br />
                    <Span>School Certification Logo</Span>
                    <FileInput
                        state={selectedFile2}
                        setState={fileSelectionHandler2}
                    />
                    <br />
                    {phones.map((phone) => {
                        return (
                            <ButtonsContainer>
                                <Input
                                    style={{ background: "lightgray" }}
                                    disabled
                                    borderColor={`${COLOR.green}`}
                                    value={phone}
                                />
                                <Button
                                    style={{ width: "120px" }}
                                    onClick={() => removePhone(phone)}
                                >
                                    remove
                                </Button>
                            </ButtonsContainer>
                        );
                    })}
                    <ButtonsContainer>
                        <Input
                            borderColor={`${COLOR.green}`}
                            value={curPhone}
                            onChange={(e) => setCurPhone(e.target.value)}
                            type="number"
                            placeholder="Add Phone"
                        />
                        <Button onClick={addPhone}>Add</Button>
                    </ButtonsContainer>
                    <br />
                    <hr style={{ height: "5px", background: "grey" }} />

                    {emails.map((email) => {
                        return (
                            <ButtonsContainer>
                                <Input
                                    style={{ background: "lightgray" }}
                                    disabled
                                    borderColor={`${COLOR.green}`}
                                    value={email}
                                />
                                <Button
                                    style={{ width: "120px" }}
                                    onClick={() => removeEmail(email)}
                                >
                                    remove
                                </Button>
                            </ButtonsContainer>
                        );
                    })}
                    <ButtonsContainer>
                        <Input
                            borderColor={`${COLOR.green}`}
                            value={curEmail}
                            onChange={(e) => setCurEmail(e.target.value)}
                            type="Email"
                            placeholder="Add Email"
                        />
                        <Button onClick={addEmail}>Add</Button>
                    </ButtonsContainer>
                    <br />
                    <hr style={{ height: "5px", background: "grey" }} />

                    {timing.map((time) => {
                        return (
                            <ButtonsContainer>
                                <Input
                                    style={{ background: "lightgray" }}
                                    disabled
                                    borderColor={`${COLOR.green}`}
                                    value={time}
                                />
                                <Button
                                    style={{ width: "120px" }}
                                    onClick={() => removeTiming(time)}
                                >
                                    remove
                                </Button>
                            </ButtonsContainer>
                        );
                    })}
                    <ButtonsContainer>
                        <Input
                            borderColor={`${COLOR.green}`}
                            value={curTiming}
                            onChange={(e) => setCurTiming(e.target.value)}
                            type="text"
                            placeholder="Add Timing"
                        />
                        <Button onClick={addTiming}>Add</Button>
                    </ButtonsContainer>
                    <br />
                    <br />
                    <br />
                    <br />
                </>
            )}

            <ButtonsContainer>
                {isEditable ? (
                    loading ? (
                        <>
                            <br />
                            <br />
                            <br />
                            <Loading />
                        </>
                    ) : (
                        <>
                            {edit && (
                                <Button onClick={updateLink}>Update</Button>
                            )}
                            <Button onClick={changeEdit}>
                                {!edit ? "Edit" : "Cancel"}
                            </Button>
                            <Button onClick={deleteLink}>Delete</Button>
                        </>
                    )
                ) : loading ? (
                    <>
                        <br />
                        <br />
                        <br />
                        <Loading />
                    </>
                ) : (
                    <Button onClick={createNewLink}>Submit</Button>
                )}
            </ButtonsContainer>
        </FormContainer>
    );
}

const Span = styled.span`
    color: black;
    font-weight: bold;
`;
