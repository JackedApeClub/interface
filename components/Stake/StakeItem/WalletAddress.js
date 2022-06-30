import { Typography } from '@mui/material';
import React from 'react';
import Web3 from 'web3';
import { useState } from 'react';
import styled from 'styled-components';

export default function WalletAddress(content = {}) {
    const [walletAddress, setWalletAddress] = useState();

    React.useEffect(async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const currentAccount = await web3.eth.getAccounts();
            setWalletAddress(currentAccount);
        }
    });
    return (
        <Wrapper>
            <img className='metamask-icon' src="/images/Stake/MetaMask_Fox.png" />
            <Typography className="wallet-address">{walletAddress}</Typography>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items:center;
    .metamask-icon{
        width:23px;
        height:22px;
        margin-right:7px;
        margin-bottom:4px;
        margin-left:5px;
    }
    .wallet-address{
        font-size: 23px;
        letter-spacing: 0px;
        color: #ffffff;
        font-family: "DeadStockDemo";
    }
`