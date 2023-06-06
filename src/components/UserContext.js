import React, { createContext, useState ,useEffect} from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');

  const login = (name) => {
    setUserName(name);
    console.log("username")
    console.log(name)
  };

  const logout = () => {
    setUserName("");
    console.log(userName);
  };

  useEffect(() => {
    console.log('userName:', userName);
  }, [userName]);


  return (
    <UserContext.Provider value={{ userName, setUserName,login,logout }}>
      {children}
    </UserContext.Provider>
  );
};
