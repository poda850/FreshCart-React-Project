import React, { createContext, useState } from "react";

export const TokenContext = createContext();

export default function TokenContextProvider(props) {
    const [userToken, setUserToken] = useState(null);

    return (
        <TokenContext.Provider value={{ userToken, setUserToken }}>
            {props.children}
        </TokenContext.Provider>
    );
}