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
import { createVideoGallery, deleteVideoGallery, getVideoGallery, updateVideoGallery } from "../../http";

export default function VideoGallery() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        async function getLink() {
            setLoading(true);
            try {
                const req = await getVideoGallery();
                setLinks(req.data);
            } catch (e) {
                toast.error("Failed to load");
                console.log(e);
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
        <Section innerBackgroundColor="lightblue" sectionName={"Video Gallery"}>
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
    const [src, setSrc] = useState(item?.src ?? "");
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);


    const verifyAndSendDataToServer = () => {
        if(!src){
            toast("Video Link cannot be empty")
            return false;
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

            const req = await createVideoGallery({ src });
            setSrc("");
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

            const res = await updateVideoGallery(item?._id, {
                src
            });
            replaceItem(item, res.data);
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
        try {
            await deleteVideoGallery(item?._id);
            removeLink(item);
            toast("Delete successfully");
        } catch (e) {
            toast("Deletion Failed");
        }
        setLoading(false);
    }

    function changeEdit() {
        if (edit) {
            setEdit(false);
            setSrc(item?.src ?? "");
        } else {
            setEdit(true);
        }
    }

    return (
        <FormContainer
            style={{ borderBottom: isEditable ? "5px solid grey" : "none" }}
        >
            <Input
                disabled={isEditable ? (edit ? false : true) : false}
                borderColor={`${COLOR.green}`}
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                type="text"
                placeholder="Youtube Link" 
            />
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
