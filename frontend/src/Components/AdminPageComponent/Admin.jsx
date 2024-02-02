// Admin.js
import React, { useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../Utility/Colors";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { setFalse, setSchoolName } from "../../AuthSlice";
import { linksData } from "../../Utility/Constant";
import Cookies from "js-cookie";

const Admin = ({ children ,active}) => {
    const [isOpened, setIsOpened] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const logout = () => {
        dispatch(setFalse());
        dispatch(setSchoolName(""));
        Cookies.remove("accessToken");
        navigate("/login");
    };

    return (
        <SidebarContainer>
            <SidebarLinksContainer isOpened={isOpened}>
                <AdminPage>
                    <Hamburger onClick={() => setIsOpened(!isOpened)}>
                        <GiHamburgerMenu
                            style={{ color: "black", fontSize: "2rem" }}
                        />
                    </Hamburger>
                    Admin
                </AdminPage>

                {linksData.map((link, idx) => {
                    return (
                        <Link
                            key={idx}
                            style={{ textDecoration: "none", width: "100%" }}
                            to={link.path}
                        >
                            <SidebarLink active={active} myValue={idx}>
                                {link.text}
                            </SidebarLink>
                        </Link>
                    );
                })}
                <br /><br />
                <SidebarLink active={-1} myValue={-2} onClick={logout}>LogOut</SidebarLink>
            </SidebarLinksContainer>

            {/* Right Section */}
            <RightSection>
                <Hamburger onClick={() => setIsOpened(!isOpened)}>
                    <GiHamburgerMenu
                        style={{ color: "black", fontSize: "2rem" }}
                    />
                </Hamburger>
                {children}
            </RightSection>
        </SidebarContainer>
    );
};

export default Admin;

const SidebarContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #e6d4ee;
    color: white;
    display: flex;
    flex-direction: row;
`;

const SidebarLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    padding-bottom: 2rem;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    flex-shrink: 0;
    background-color: #e6d4ee;
    border-right: 1px solid grey;
    box-shadow: 1px 0 5px black;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    transition: all 0.5s;
    @media (max-width: 870px) {
        position: fixed;
        left: ${({ isOpened }) => (isOpened ? 0 : "-200%")};
    }
`;

const SidebarLink = styled.div`
    width: 100%;
    text-decoration: none;
    color: black;
    font-weight: bold;
    cursor: pointer;
    margin-right: 2rem;
    padding: 0.5rem 1rem;
    position: relative;
    background-color: ${({ active, myValue }) =>
        active === myValue ? "#d185f2" : "transparent"};

    &:hover {
        background-color: #d185f2;
    }
`;

const RightSection = styled.div`
    position: relative;
    flex: 1;
    text-align: start;
    color: white;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const AdminPage = styled.div`
    background-color: #e6d4ee;
    border-bottom: 1px solid grey;
    padding: 1rem;
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
    width: 100%;
    color: ${COLOR.primary};
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
`;

const Hamburger = styled.div`
    position: absolute;
    left: 1rem;
    top: 1rem;
    display: none;
    @media (max-width: 870px) {
        display: block;
    }
`;
