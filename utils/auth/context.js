import React, {useContext} from 'react';

export const LoginContext = React.createContext();

export const useLoginContext = () => useContext(LoginContext);
