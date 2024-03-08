import { createContext, useState } from "react";
const UserProgressContext = createContext({
    progress: "", // 'cart' or 'progress'
    showCart: () => { },
    hideCart: () => { },
    showCheckOut: () => { },
    hideCheckOut: () => { }
});

export function UserProgressContextProvider({ children }) {
    const [userProgress, setUserProgress] = useState("");

    const showCart = () => {
        setUserProgress('cart');
    }
    const hideCart = () => {
        setUserProgress('');
    }
    const showCheckOut = () => {
        setUserProgress('checkout')
    }
    const hideCheckOut = () => {
        setUserProgress('');
    }

    const userProgressContext = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckOut,
        hideCheckOut
    }

    return (
        <UserProgressContext.Provider value={userProgressContext}>
            {children}
        </UserProgressContext.Provider>
    )
}

export default UserProgressContext;