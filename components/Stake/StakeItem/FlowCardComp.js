import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import axios from 'axios';
import Web3 from 'web3';
import JackedABI from '../../../ABI/JackedApeClub.json';
import StakeABI from '../../../ABI/Stakeable.json';
import { useState } from 'react';
import { MarketContext } from '../../../context/MarketContext';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function FlowCardComp({ tokenId, account }) {
    const [imageUrl, setImageUrl] = useState();
    const [stakeStatus, setStakeStatus] = useState(false);
    const [displayButton, setDisplayButton] = useState(false);
    const [loading, setLoading] = useState(false);

    const { stakedItems, setStakedItems } = React.useContext(MarketContext);

    const createNotification = (type) => {
        switch (type) {
            case 'info':
                NotificationManager.info('Info message');
                break;
            case 'success':
                NotificationManager.success('Successfully staked.', 'Staked');
                break;
            case 'warning':
                NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                break;
            case 'error':
                NotificationManager.error('Rejected to stake', 'Rejected', 3000);
                break;
        }
    }


    React.useEffect(async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const stakeContractInstance = new web3.eth.Contract(StakeABI.abi, StakeABI.address);
            const contractInstance = new web3.eth.Contract(JackedABI.abi, JackedABI.address);
            const tokenInfo = await contractInstance.methods.tokenURI(tokenId).call();
            const stakeStatus = await stakeContractInstance.methods.getStakedTokenIds(account).call();
            if (stakeStatus.includes(tokenId)) {
                setStakeStatus(true);
            }

            const tokenUri = tokenInfo.replace("ipfs://", "https://ipfs.io/ipfs/");
            const meta = await axios.get(tokenUri);
            const imgUrl = (meta.data.image).replace("ipfs://", "https://ipfs.io/ipfs/");
            setImageUrl(imgUrl);
        }
    }, []);

    React.useEffect(() => {
        if (!stakedItems.includes(tokenId)) {
            setStakeStatus(false);
        } else {
            setStakeStatus(true);
        }
    }, [stakedItems])


    const stakeNFT = async () => {
        if (window.ethereum) {
            console.log("selected Id is ", tokenId);
            setLoading(true);
            const web3 = new Web3(window.ethereum);
            const contractInstance = new web3.eth.Contract(JackedABI.abi, JackedABI.address);
            const stakeContractInstance = new web3.eth.Contract(StakeABI.abi, StakeABI.address);
            const to = StakeABI.address;
            try {
                await contractInstance.methods.approve(to, tokenId).send({
                    from: account
                });
                const stakeResult = await stakeContractInstance.methods.stake(tokenId).send({
                    from: account
                });
                if (stakeResult) {
                    console.log("stakeResult is ", stakeResult);
                    let temp = stakedItems;
                    console.log("temp is ", temp, typeof temp);
                    temp = [...temp, tokenId];
                    setStakedItems(temp);
                }
                createNotification("success");
                setLoading(false);
            } catch (err) {
                if (err.code === 4001) {
                    createNotification("error");
                    setLoading(false);
                }
            }
        }
    }


    return (
        <Wrapper>
            <NotificationContainer />
            <CardItem content={imageUrl} onMouseOver={() => setDisplayButton(true)} onMouseLeave={() => setDisplayButton(false)}>
                {
                    loading ? <CircularProgress /> :
                        !stakeStatus && displayButton && <StakeButtonArea>
                            <Button onClick={() => stakeNFT()}>
                                Stake
                            </Button>
                        </StakeButtonArea>
                }
                {
                    stakeStatus && <StakedText>
                        Staked
                    </StakedText>
                }
            </CardItem>
        </Wrapper>
    );
}

const StakedText = styled.div`
    font-family: Helvetica;
    font-size: 50px;
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StakeButtonArea = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const Button = styled.div`
    width: 126px;
    height: 42px;
    border: 2px solid rgba(255, 255, 255, 0.6);
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const CardItem = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:236px;
    height:236px;
    background-image:url('${props => props.content}');
    background-size: 100%;
    position:relative;
    border-radius:25px;
    margin-right:80px;
    cursor: pointer;
`

const Wrapper = styled.div`
    position: relative;
    .stake{
        display:flex;
        align-items:center;
        justify-content:center;
        width: 126px;
        height: 42px;
        border:2px solid #ffffff;
        font-size:25px;
        display:none;
    }
    .staked{
        font-family:DeadStockDemo;
        font-size:50px;
        .card-item{
            border:none;
        }
    }

    .card-item:hover{
        opacity:0.5;
        .stake{
            display:flex;
        }
        cursor: pointer;
    }

`