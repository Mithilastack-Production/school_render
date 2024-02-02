import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { toastWorking } from "../../Utility/Utils";
import { COLOR } from "../../Utility/Colors";
import { options } from "../../Utility/Constant";
import { HeaderWrapper } from "../CommonStyledComponent/CommonStyledComponent";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false); // State to manage mobile menu display

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <NavbarWrapper>
            <Hamburger onClick={toggleMenu}>{showMenu ? "X" : "☰"}</Hamburger>
            <MenuList showMenu={showMenu}>
                {options.map((option, idx) => (
                    <Goto key={idx}
                        onClick={() => {
                            option === "Career" || option === "Academic"
                                ? toastWorking()
                                : (() => {})();
                            setShowMenu(false);
                        }}
                        href={`#${option}`}
                    >
                        {option}
                    </Goto>
                ))}
                <Link to="/admin/login" style={{ textDecoration: "none" }}>
                    <LoginGoto>Login</LoginGoto>
                </Link>
            </MenuList>

            <YellowBackground onClick={toastWorking}>
                <FaSearch />
            </YellowBackground>
        </NavbarWrapper>
    );
};

export default Navbar;

const NavbarWrapper = styled(HeaderWrapper)`
    padding: 0rem 1rem;

    @media (max-width: 768px) {
        align-items: flex-start;
        padding: 0 1rem;
    }
`;

const Hamburger = styled.div`
    display: none;
    font-size: 24px;
    padding: 0.5rem;
    cursor: pointer;
    color: ${COLOR.white};
    @media (max-width: 768px) {
        display: flex;
    }
`;

const YellowBackground = styled.span`
    background-color: ${COLOR.secondary};
    color: ${COLOR.black};
    cursor: pointer;
    padding: 1.2rem;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${COLOR.secondaryDark};
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const MenuList = styled.ul`
    list-style-type: none;
    display: flex;
    /* gap: 1.25rem; */
    flex-wrap: wrap;
    transition: all 0.3s ease;
    justify-content: start;
    align-items: flex-start;
    align-content: start;
    @media (max-width: 768px) {
        height: ${({ showMenu }) => (showMenu ? "12rem" : "0")};
        /* gap: 1rem; */
    }
`;

const Goto = styled.a`
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: ${COLOR.white};
    transition: all 0.3s ease;
    &:hover {
        color: ${COLOR.secondary};
    }
    cursor: pointer;
    @media (max-width: 768px) {
        /* padding: 0; */
    }
`;
const LoginGoto = styled.div`
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: ${COLOR.white};
    transition: all 0.3s ease;
    &:hover {
        color: ${COLOR.secondary};
    }
    cursor: pointer;
    @media (max-width: 768px) {
        /* padding: 0; */
    }
`;
