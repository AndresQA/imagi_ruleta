import React, { useMemo, useState } from "react";
import createContext, { IPropsState } from "../../components/Context";

interface IPropsContext {
    useUser: IPropsState<{
        name: string, age: number
    }>
}

const { Provider, Consumer } = createContext<IPropsContext>()

export const UserContextProvider = (props: React.Props<any>) => {

    const useUser = useState({ name: "", age: 0 })
    const [user, setUser] = useUser;

    const value = useMemo(() => {
        return {
            useUser: () => useUser
        }
    }, [user])

    return <Provider value={value} {...props} />
}


const UserContext = Consumer;

export default UserContext;