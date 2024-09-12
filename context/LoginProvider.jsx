import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const LoginContext = createContext();

const LoginProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [permission, setPermission] = useState(false);
    const [code, setCode] = useState(null);
    const [medication, setMedication] = useState([]);
    const [caretaker, setCaretaker] = useState({name: '', email: '', age: '', gender: '', number: '', });
    const [userCurrentLocation, setUserCurrentLocation] = useState([74,15]);
    const [userHomeLocation, setUserHomeLocation] = useState([73.98100068685548, 15.423282817707287]);
    const [radius, setRadius] = useState(0.01);
    return (
      <LoginContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          role,
          setRole,
          code,
          setCode,
          caretaker,
          setCaretaker,
          userCurrentLocation,
          setUserCurrentLocation,
          radius,
          setRadius,
          permission,medication,
          setMedication,
          setPermission,
          userHomeLocation,
          setUserHomeLocation,
        }}>
        {props.children}
      </LoginContext.Provider>
    );
  };

export default LoginProvider;

export const useLogin =()=> useContext(LoginContext);