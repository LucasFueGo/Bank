import React, { useState, useEffect } from "react";

const Context = React.createContext(null)

const ProviderWrapper = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // need : verify toke in backend
            setUser({ token }); 
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // need use backend
        console.log("Login avec", email);
        console.log("Login avec", password);
        const fakeToken = "token_jwt_exemple_123456";
        localStorage.setItem('token', fakeToken);
        setUser({ email, token: fakeToken });
        
        return true;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const exposedValue = {
        user,
        setUser,
        login,
        logout,
        loading
    };

    return <Context.Provider value={exposedValue}>
        { props.children }
    </Context.Provider>  
}

export {    
    Context,
    ProviderWrapper,    
}  