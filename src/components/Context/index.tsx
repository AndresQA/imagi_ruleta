import React from "react";

function createContext<ContextType>() {
    const ctx = React.createContext<
        ContextType | undefined
    >(undefined);

    const useCtx = () => {
        const context = React.useContext(ctx);
        if (!context) {
            throw new Error("El contexto no se encuentra")
        }
        return context;
    }

    const useCondicional = () => {
        const context = React.useContext(ctx);
        if (!context) {
            console.log("El contexto no se encuentra")
        }
        return context;
    }

    return { Consumer: useCtx, Provider: ctx.Provider, useCondicional: useCondicional } as const;
}


export type IPropsState<S> = () => [S, React.Dispatch<React.SetStateAction<S>>]

export default createContext;