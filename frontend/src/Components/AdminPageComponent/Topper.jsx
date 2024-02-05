import React, { useEffect, useState } from "react";
import { Input } from "../WebSitePageComponent/ContactUs";
import { COLOR } from "../../Utility/Colors";
import FileInput from "./FileInput";
import { Button, OptionTag, Select } from "../WebSitePageComponent/Formpopup";
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
    createTopper,
    deleteTopper,
    getToppers,
} from "../../http";
import Topper from "../WebSitePageComponent/Toppers";

export default function TopperAdmin() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);
    const [topperMessage, setTopperMessage] = useState("");
    useEffect(() => {
        async function getLink() {
            setLoading(true);
            try {
                const req = await getToppers();
                if(req.data.length === 0){
                    setTopperMessage("Data Not Available");
                    return;
                }
                setLinks(req.data);
            } catch (e) {
                setTopperMessage("Failed to get Toppers");
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

    async function deleteLink(id, item, _id) {
        const result = window.confirm("Are you sure to delete?");
        if (!result) {
            return;
        }
        setLoading(true);
        try {
            const res =  await deleteTopper(id,{_id});
            if(_id){
                replaceItem(item,res.data )
            }else{
                toast("Delete successfully");
                removeLink(item);
            }
            
        } catch (e) {
            handleError(e, "Deletion Failed");
        }
        setLoading(false);
    }

    const handleError = (e, message) => {
        if (e.response) {
            toast(e.response.message);
        } else {
            toast(message);
        }
    };

    return (
        <Section innerBackgroundColor="lightblue" sectionName={"Topper"} >
            <SectionWrapper>
                <FormContainer>
                    <MyInnerComponent setNewLinks={setNewLinks} links={links} replaceItem={replaceItem} />
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
                                    <Topper
                                        topper={links}
                                        topperMessage={topperMessage}
                                        isAdmin={true}
                                        deleteLink={deleteLink}
                                    />
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
    links = [],
    setNewLinks,
    setNewItem,
    removeLink,
    replaceItem,
}) {
    const [id, setId] = useState("New Section");
    const [name, setName] = useState("");
    const [percentage, setPercentage] = useState("");
    const [position, setPosition] = useState("");
    const [section, setSection] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
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
        if (!id && !section) {
            toast("Section Link cannot be empty");
            return false;
        }
        if (!name) {
            toast("Name cannot be empty");
            return false;
        }
        if (!percentage) {
            toast("Percentage cannot be empty");
            return false;
        }
        if (!position) {
            toast("Position cannot be empty");
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
            const res = await createTopper({
                section,
                toppers: {
                    percentage,
                    name,
                    position,
                },
                image,
                id,
            });
            setName("");
            setPercentage("");
            setPosition("");
            setSelectedFile(null);
            if(id === "New Section"){
                setNewLinks(res.data);
            }else{
                const item = links.filter(itm => itm._id === id);
                replaceItem(...item,res.data)
            }
            setSection("");
            toast("Created successfully");
        } catch (e) {
            handleError(e, "Failed to Create");
        }
        setLoading(false);
    }

    const handleError = (e, message) => {
        if (e.response) {
            toast(e.response.message);
            toast(e.response.error);
        } else {
            toast(message);
        }
    };

    return (
        <FormContainer
            style={{ borderBottom: isEditable ? "5px solid grey" : "none" }}
        >
            <Select onChange={(e) => setId(e.target.value)}>
                {links.map((link, i) => (
                    <OptionTag key={i} value={link._id}>
                        {link.section}
                    </OptionTag>
                ))}
                <OptionTag selected value={null}>
                    New Section
                </OptionTag>
            </Select>
            {id === "New Section" && (
                <Input
                    borderColor={`${COLOR.green}`}
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    type="text"
                    placeholder="Section name"
                />
            )}
            <Input
                borderColor={`${COLOR.green}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Student Name"
            />
            <Input
                borderColor={`${COLOR.green}`}
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                type="number"
                placeholder="Percentage"
            />
            <Input
                borderColor={`${COLOR.green}`}
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                type="number"
                placeholder="Position"
            />

            <FileInput state={selectedFile} setState={fileSelectionHandler} />

            <ButtonsContainer>
                {loading ? (
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
