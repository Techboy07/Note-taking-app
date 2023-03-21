import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import App from "./App";
import { firebase } from "../firbaseConfig";
import { useNavigate } from "react-router-dom";

const { performOnAuth } = firebase();

export const AuthContext = createContext();

const Index = () => {
    const navigate = useNavigate();

    const [authState, setAuthState] = useState(false);



    useEffect(() => {
        if (!authState) {
            navigate("/");
        }
    }, [authState]);

    performOnAuth(
        () => {
            setAuthState(true);
        },
        () => {
            setAuthState(false);
        }
    );

    const changeLocation = (str) => {
        navigate(str)
    }

    return (
        <>
            <AuthContext.Provider value={authState}>
                <Routes>
                    <Route index element={<App nav={changeLocation} />} />
                    {<Route path="/Notes" element={<Layout nav={changeLocation} />} />}
                </Routes>
            </AuthContext.Provider>
        </>
    );
};

export default Index;
