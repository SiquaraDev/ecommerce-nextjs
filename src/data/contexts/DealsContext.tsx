"use client";
import { createContext, useContext } from "react";

interface DealsContextProps {
    dealIds: Set<number>;
}

const DealsContext = createContext<DealsContextProps>({ dealIds: new Set() });

export function DealsProvider({
    children,
    dealIds,
}: {
    children: React.ReactNode;
    dealIds: number[];
}) {
    return (
        <DealsContext.Provider value={{ dealIds: new Set(dealIds) }}>
            {children}
        </DealsContext.Provider>
    );
}

export function useDeals() {
    return useContext(DealsContext);
}
