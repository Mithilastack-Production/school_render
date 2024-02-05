import React, { useState } from "react";
import styled from "styled-components";
import { COLOR } from "../Utility/Colors";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setTrue, setSchoolName } from "../AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Components/WebSitePageComponent/Loading";
import { login } from "../http";
import axios from "axios";
import { backendURL } from "../fronendEnv";
import Cookies from "js-cookie";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email) {
            return toast("Email is required");
        }
        if (!password) {
            return toast("Password is required");
        }
        if (!validateEmail(email)) {
            return toast("Not a valid email");
        }
        setLoading(true);
        try {
            const res = await login({email, password});
            const { schoolName, message } = res.data;
            dispatch(setTrue());
            dispatch(setSchoolName(schoolName));
            navigate("/admin/social-links");
            toast(message);
        } catch (error) {
            if (error.response) {
                toast(error.response.data.message);
            } else {
                toast("Login failed");
            }
        } finally {
            setLoading(false);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    return (
        <Container>
            <LoginForm>
                <Title>Admin Login</Title>
                <Form>
                    <InputLabel>Email</InputLabel>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter your email"
                    />
                    <InputLabel>Password</InputLabel>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter your password"
                    />
                    {loading ? (
                        <Loading />
                    ) : (
                        <SubmitButton onClick={handleLogin} type="submit">
                            Login
                        </SubmitButton>
                    )}
                </Form>
            </LoginForm>
            <Link to={"/"}>
                <SubmitButton>Home</SubmitButton>
            </Link>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    height: 100vh;
    background: linear-gradient(45deg, #fcb737, #4caf50, lightpink);
`;

const LoginForm = styled.div`
    background-color: #ffffff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    padding: 40px;
    border-radius: 12px;
    width: 80%;
    max-width: 400px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
    }
    @media (max-width: 768px) {
        width: 95%;
        padding: 10px;
    }
`;

const Title = styled.h1`
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    font-size: 2em;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputLabel = styled.label`
    margin-bottom: 10px;
    color: #333;
    font-size: 1em;
`;

const Input = styled.input`
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1em;
    transition: border-color 0.3s ease-in-out;

    &:focus {
        border-color: #4caf50;
    }
`;

const SubmitButton = styled.button`
    background-color: ${COLOR.secondary};
    color: #fff;
    padding: 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.2em;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${COLOR.secondaryDark};
    }
`;

export default AdminLogin;
