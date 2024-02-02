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
import { backendURL } from "../../Utility/Constant";
import Section from "./Section";
import {
    ButtonsContainer,
    FormContainer,
    OrDiv,
    SectionWrapper,
    ShowItems,
} from "../CommonStyledComponent/CommonStyledComponent";
import { createAbout, deleteAbout, getAbout, updateAbout } from "../../http";
import { readFileAsDataURL } from "../../Utility/Utils";

export default function About() {
    const [loading, setLoading] = useState(false);
    const [links, setLinks] = useState([]);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        async function getLink() {
            setLoading(true);
            try {
                const req = await getAbout();
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
        <Section innerBackgroundColor="lightblue" sectionName={"About Us"}>
            <SectionWrapper>
                <FormContainer>
                    <MyInnerComponent setNewLinks={setNewLinks} />
                </FormContainer>
                <ShowItems>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            {failed ? (
                                <>
                                    <h1>
                                        Failed to Load please refresh the page
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
    const [isOpposite, setIsOpposite] = useState(item?.isOpposite ?? false);
    const [heading, setHeading] = useState(item?.heading ?? "");
    const [message, setMessage] = useState(item?.message ?? "");
    const [alt, setAlt] = useState(item?.alt ?? "");
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
        if (!heading) {
            toast("Heading cannot be empty");
            return false;
        }
        if (!message) {
            toast("Message cannot be empty");
            return false;
        }
        if (!alt) {
            toast("Image Description cannot be empty");
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
        setLoading(true);
        try {
            const image = await readFileAsDataURL(selectedFile);
            const req = await createAbout({
                isOpposite,
                heading,
                message,

                alt,
                image,
            });
            setNewLinks(req.data);
            setIsOpposite(false);
            setHeading("");
            setMessage("");
            setAlt("");
            setSelectedFile(null);
            toast("Created successfully");
        } catch (e) {
            handleError(e, "Failed to create!");
        } finally {
            setLoading(false);
        }
    }

    async function updateLink() {
        const valid = await verifyAndSendDataToServer();
        if (!valid) {
            return;
        }
        setLoading(true);
        try {
            let image = null;
            if (selectedFile) {
                image = await readFileAsDataURL(selectedFile);
            }
            const res = await updateAbout(item?._id, {
                isOpposite,
                heading,
                message,
                alt,
                image,
            });
            setSelectedFile(null);
            replaceItem(item, res.data);
            setEdit(false);
            toast("Update successfully");
        } catch (e) {
            handleError(e, "Failed to update!");
        } finally {
            setLoading(false);
        }
    }

    async function deleteLink() {
        const result = window.confirm("Are you sure to delete?");
        if (!result) {
            return;
        }
        setLoading(true);
        try {
            await deleteAbout(item?._id);
            removeLink(item);
            toast("Delete successfully");
        } catch (e) {
            handleError(e, "Failed to delete!");
        } finally {
            setLoading(false);
        }
    }

    function changeEdit() {
        if (edit) {
            setEdit(false);
            setIsOpposite(item?.isOpposite ?? false);
            setHeading(item?.heading ?? "");
            setMessage(item?.message ?? "");
            setAlt(item?.alt ?? "");
        } else {
            setEdit(true);
        }
    }

    const handleError = (e, message) => {
        if (e.response) {
            toast(e.response.message);
        } else {
            toast("message");
        }
    };

    return (
        <FormContainer style={{borderBottom:isEditable?"5px solid grey":'none'}}>
            <Input
                disabled={isEditable ? (edit ? false : true) : false}
                borderColor={`${COLOR.green}`}
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                type="text"
                placeholder="Heading"
            />
            <TextArea
                disabled={isEditable ? (edit ? false : true) : false}
                borderColor={`${COLOR.green}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                rows="10"
                placeholder="Message"
            />
            <Input
                disabled={isEditable ? (edit ? false : true) : false}
                borderColor={`${COLOR.green}`}
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                type="text"
                placeholder="Image Description"
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
            <Select
                disabled={isEditable ? (edit ? false : true) : false}
                value={isOpposite}
                onChange={(e) => setIsOpposite(e.target.value)}
            >
                <OptionTag selected value={false}>
                    Left Image
                </OptionTag>
                <OptionTag value={true}>Right Image</OptionTag>
            </Select>
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
