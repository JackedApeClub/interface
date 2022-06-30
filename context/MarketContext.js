import React from 'react';

export const MarketContext = React.createContext({});

export default function MarketContextProvider({ children }) {

    const [stakedItems, setStakedItems] = React.useState([]);
    const [stakeValue, setStakeValue] = React.useState(0);
    const [txHistory, setTxHistory] = React.useState([]);
    const [totalSum, setTotalSum] = React.useState(0);
    return (
        <MarketContext.Provider
            value={{
                stakedItems,
                setStakedItems,
                stakeValue,
                setStakeValue,
                txHistory,
                setTxHistory,
                totalSum,
                setTotalSum
            }}
        >
            {
                children
            }
        </MarketContext.Provider>
    )
}