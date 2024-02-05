import React, { useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../Utility/Colors";
import { toast } from "react-toastify";

import Loading from "../../Components/WebSitePageComponent/Loading";
import { resetPassword } from "../../http";

const ResetPassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!oldPassword) {
            return toast("Email is required");
        }
        if (!newPassword || newPassword.length < 8) {
            return toast("Password must be at least 8 characters");
        }

        setLoading(true);
        try {
            const res = await resetPassword({
                oldPassword,
                newPassword
            });
            const {message} = res.data;
            setOldPassword("")
            setNewPassword("")
            toast(message);
        } catch (error) {
            if (error.response) {
                toast(error.response.data.message);
            } else {
                toast("Reset Password Failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
        <LoginForm>
            <Title>Reset Password</Title>
            <Form>
                <InputLabel>Current Password</InputLabel>
                <Input
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    type="email"
                    placeholder="Enter your Old Password"
                />
                <InputLabel>New Password</InputLabel>
                <Input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    placeholder="Enter your New Password"
                />
                {loading ? (
                    <Loading />
                ) : (
                    <SubmitButton onClick={handleLogin} type="submit">
                        Reset
                    </SubmitButton>
                )}
            </Form>
        </LoginForm>
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

export default ResetPassword;
