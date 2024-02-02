import React, { useEffect, useState } from "react";
import { Input } from "../WebSitePageComponent/ContactUs";
import { COLOR } from "../../Utility/Colors";
import FileInput from "./FileInput";
import { Button, TextArea } from "../WebSitePageComponent/Formpopup";
import { toast } from "react-toastify";
import { Image, ImageContainer } from "../WebSitePageComponent/AboutUs";
import Loading from "../WebSitePageComponent/Loading";
import { backendURL } from "../../Utility/Constant";
import { readFileAsDataURL } from "../../Utility/Utils";
import Section from "./Section";
import {
    ButtonsContainer,
    FormContainer,
    SectionWrapper,
    ShowItems,
} from "../CommonStyledComponent/CommonStyledComponent";
import { createTeacherBirthday, deleteTeacherBirthday, getTeacherBirthdays, updateTeacherBirthday } from "../../http";

export default function TeacherBirthday() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        async function getLink() {
            setLoading(true);
            try {
                const req = await getTeacherBirthdays();
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
            sectionName={"Teacher Birthday"}
        >
            <SectionWrapper>
                <FormContainer>
                    <MyInnerComponent setNewLinks={setNewLinks} />
                </FormContainer>
                <ShowItems>
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
    const [dob, setDob] = useState(item?.dob.slice(0,10) ?? null);
    const [message, setMessage] = useState(item?.message ?? "");
    const [selectedFile, setSelectedFile] = useState(null);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const isImageFile = (fileName) => {
        const allowedExtensions =
            /\.(jpg|jpeg|png|gif|tiff|bmp|svg|webp|heif|ico)$/i;
        return allowedExtensions.test(fileName);
    };

    const fileSelectionHandler = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const verifyAndSendDataToServer = () => {
        if (!name) {
            toast("Name cannot be empty");
            return false;
        }
        if (!dob) {
            toast("DOB Link cannot be empty");
            return false;
        }
        if (!message) {
            toast("Birthday Wish message cannot be empty");
            return false;
        }
        if (!isEditable) {
            if (!selectedFile) {
                toast("Image cannot be empty");
                return false;
            }
            if (!isImageFile(selectedFile.name)) {
                toast("Selected Image is not an image file");
                return false;
            }
            if (selectedFile.size > 1024 * 1024 * 2) {
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
        console.log(dob);
        setLoading(true);
        try {
            const image = await readFileAsDataURL(selectedFile);
            const req = await createTeacherBirthday({
                name,
                dob,
                message,
                image,
            });
            setName("");
            setDob(null);
            setMessage("");
            setSelectedFile(null);
            setNewLinks(req.data);
            toast("Created successfully");
        } catch (e) {
            handleError(e, "Failed to Create");
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
            let image = null;
            if (selectedFile) {
                image = await readFileAsDataURL(selectedFile);
            }
            const res = await updateTeacherBirthday(item?._id, {
                name,
                dob,
                message,
                image,
            });
            replaceItem(item, res.data);

            setSelectedFile(null);
            setEdit(false);
            toast("Update successfully");
        } catch (e) {
            handleError(e, "Update failed");
        }
        setLoading(false);
    }

    async function deleteLink() {
        const result = window.confirm("Are you sure to delete?");
        if (!result) {
            return;
        }
        setLoading(true);
        try {
            await deleteTeacherBirthday(item?._id);
            removeLink(item);
            toast("Delete successfully");
        } catch (e) {
            handleError(e, "Deletion Failed");
        }
        setLoading(false);
    }

    function changeEdit() {
        if (edit) {
            setEdit(false);
            setName(item?.name ?? "");
            setDob(item?.dob ?? null);
            setMessage(item?.message ?? "");
        } else {
            setEdit(true);
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
        <FormContainer
            style={{ borderBottom: isEditable ? "5px solid grey" : "none" }}
        >
            <Input
                disabled={isEditable ? (edit ? false : true) : false}
                borderColor={`${COLOR.green}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Teacher Name"
            />
            <br />
            <span style={{color:'black',fontWeight:'bold'}}>
                Date of Birth
            </span>
            <Input
                disabled={isEditable ? (edit ? false : true) : false}
                borderColor={`${COLOR.green}`}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                type={isEditable ? edit?"date":'text' : "date"}
                placeholder="Dob Link"
              
            />
            <TextArea
                disabled={isEditable ? (edit ? false : true) : false}
                borderColor={`${COLOR.green}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                rows="10"
                placeholder="Birthday Wish Message"
            />

            {isEditable ? (
                <>
                    {edit && (
                        <FileInput
                            state={selectedFile}
                            setState={fileSelectionHandler}
                        />
                    )}
                    <br />
                    <ImageContainer style={{ height: edit ? "0%" : "auto" }}>
                        <Image
                            src={`${backendURL}${item?.src}`}
                            alt={item?.alt}
                        />
                    </ImageContainer>
                </>
            ) : (
                <FileInput
                    state={selectedFile}
                    setState={fileSelectionHandler}
                />
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
