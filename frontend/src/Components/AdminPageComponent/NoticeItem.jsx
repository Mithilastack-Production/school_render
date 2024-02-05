import React, { useEffect, useState } from "react";
import { Input } from "../WebSitePageComponent/ContactUs";
import { COLOR } from "../../Utility/Colors";
import FileInput from "./FileInput";
import { Button } from "../WebSitePageComponent/Formpopup";
import { toast } from "react-toastify";
import { Image, ImageContainer } from "../WebSitePageComponent/AboutUs";
import Loading from "../WebSitePageComponent/Loading";
import { backendURL } from "../../fronendEnv";
import { readFileAsDataURL } from "../../Utility/Utils";
import Section from "./Section";
import {
    ButtonsContainer,
    FormContainer,
    SectionWrapper,
    ShowItems,
} from "../CommonStyledComponent/CommonStyledComponent";
import {
    createNoticeItem,
    deleteNoticeItem,
    getNoticeItems,
    updateNoticeItem,
} from "../../http";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function NoticeItem() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        async function getLink() {
            setLoading(true);
            try {
                const req = await getNoticeItems();
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
        <Section innerBackgroundColor="lightblue" sectionName={"Notice"}>
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
    const [message, setMessage] = useState(item?.message ?? "");
    const [selectedFile, setSelectedFile] = useState(null);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const isImageFile = (fileName) => {
        const allowedExtensions = /\.(pdf)$/i;
        return allowedExtensions.test(fileName);
    };

    const fileSelectionHandler = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const verifyAndSendDataToServer = () => {
        if (!message) {
            toast("Notice title cannot be empty");
            return false;
        }
        if (!isEditable) {
            if (!selectedFile) {
                toast("File cannot be empty");
                return false;
            }
            if (!isImageFile(selectedFile.name)) {
                toast("Selected File is not a PDF file");
                return false;
            }
            if (selectedFile.size > 1024 * 1024 * 3) {
                toast("selected File size is larger than 3MB");
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
            const image = await readFileAsDataURL(selectedFile);
            const req = await createNoticeItem({ message, image });
            setMessage("");
            setSelectedFile(null);
            setNewLinks(req.data);
            toast("Created successfully");
        } catch (e) {
            console.log(e);
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
            const res = await updateNoticeItem(item?._id, {
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
            await deleteNoticeItem(item?._id);
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Notice Title"
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
                    <div style={{ width: "100%", height: "600px" }}>
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`} >
                            <Viewer fileUrl={`${backendURL}${item?.src}`} />
                        </Worker>
                    </div>
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
