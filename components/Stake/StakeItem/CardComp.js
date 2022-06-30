import React from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import { useState } from 'react';
import axios from 'axios';
import JackedABI from '../../../ABI/JackedApeClub.json';
import StakedABI from '../../../ABI/Stakeable.json';
import { MarketContext } from '../../../context/MarketContext';
import CircularProgress from '@mui/material/CircularProgress';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


export default function CardComp({ content, account }) {
    let web3;

    const { stakedItems, setStakedItems, txHistory, totalSum, setTotalSum } = React.useContext(MarketContext);
    const [imageUrl, setImageUrl] = useState();
    const [name, setName] = useState();
    const [loading, setLoading] = useState(false);
    const [sum, setSum] = useState(0);
    const [currentTime, setCurrentTime] = useState('');
    const [startTime, setStartTime] = useState('');

    const createNotification = (type) => {
        switch (type) {
            case 'info':
                NotificationManager.info('Info message');
                break;
            case 'success':
                NotificationManager.success('Successfully unstaked.', 'Unstaked');
                break;
            case 'warning':
                NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                break;
            case 'error':
                NotificationManager.error('Rejected to unstake', 'Rejected', 5000);
                break;
        }
    }

    React.useEffect(async () => {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            const contractInstance = new web3.eth.Contract(JackedABI.abi, JackedABI.address);
            const tokenUri = await contractInstance.methods.tokenURI(content).call();

            const stakedTokenUri = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
            const meta = await axios.get(stakedTokenUri);
            const imgUrl = (meta.data.image).replace("ipfs://", "https://ipfs.io/ipfs/");
            setName(meta.data.name);
            setImageUrl(imgUrl);
        }
    }, []);

    React.useEffect(async () => {
        if (txHistory.length > 0 && account) {
            let amount = 0;
            const web3 = new Web3(window.ethereum)
            const currentBlock = await web3.eth.getBlockNumber();
            let currentTimestamp;
            let endTime;

            const currentTime = await web3.eth.getBlock(currentBlock);
            currentTimestamp = currentTime.timestamp;
            setCurrentTime(currentTimestamp);
            const keccakStakeFunction = web3.eth.abi.encodeFunctionCall({
                name: 'stake',
                type: 'function',
                inputs: [{
                    type: 'uint256',
                    name: 'tokenId'
                }],
            }, ['13']);
            const keccakUnstakeFunction = web3.eth.abi.encodeFunctionCall({
                name: 'unstake',
                type: 'function',
                inputs: [{
                    type: 'uint256',
                    name: 'tokenId'
                }],
            }, ['13']);
            const stakePrefix = keccakStakeFunction.slice(0, 10);
            const unstakePrefix = keccakUnstakeFunction.slice(0, 10);
            const condition = (idex) => {
                const idx = idex - 1;
                if (txHistory[idx]?.input) {
                    const tokenIdFromTx = '0x' + txHistory[idx]?.input.slice(txHistory[idx]?.input.length - 10);
                    console.log("tokenId from tx: ", tokenIdFromTx, txHistory[idx]);
                    console.log('current tokenId is ', content, txHistory[idx]?.input.includes(stakePrefix));
                    const returnValue = txHistory[idx]?.input.includes(stakePrefix) && String(Number(tokenIdFromTx)) === String(content);
                    console.log('return value is ', returnValue);
                    return returnValue;
                } else {
                    return true;
                }

            }
            const stakedContractInst = new web3.eth.Contract(StakedABI.abi, StakedABI.address);
            const stakedAmount = await stakedContractInst.methods.getStakedTokenIds(account).call();
            amount = Number(stakedAmount.length);
            let index = txHistory.length;
            const currentRate = amount > 4 ? 10 : ((amount - 1) * 0.25 + 1) * 5;
            let sum = (Number(currentTimestamp) - Number(txHistory[index - 1]?.timeStamp)) / 3600 / 24 * currentRate;
            endTime = Number(txHistory[index - 1]?.timeStamp);
            while (!condition(index)) {
                console.log(index);
                const current = index - 1;
                const prev = index - 2;
                if (txHistory[current]?.timeStamp || txHistory[prev]?.timeStamp) {
                    console.log("-----------------------", txHistory[current]?.timeStamp);
                    if (txHistory[current]?.input.includes(stakePrefix)) {
                        amount = amount - 1;
                    }
                    if (txHistory[current]?.input.includes(unstakePrefix)) {
                        amount = amount + 1;
                    }
                    const duration = (Number(txHistory[current]?.timeStamp) - Number(txHistory[prev]?.timeStamp)) / 3600 / 24;
                    const rate = amount > 4 ? 10 : ((amount - 1) * 0.25 + 1) * 5;
                    sum = sum + duration * rate;
                    endTime = txHistory[prev]?.timeStamp;
                    console.log("end time stamp is ", endTime);
                    index = index - 1;
                }
            }
            setSum(sum);
            setStartTime(endTime);
        }
    }, [txHistory, account])

    const temp = [
        {
            title: 'Jacked Ape#0001',
            rank: 'Gym Lad',
            pumpCollected: '27 Pump',
            pumpRate: '5 Pump/24hrs',
            currentStreak: '7D 3H',
            nextStreak: '7'
        }
    ]

    const unstakeNFT = async () => {
        setLoading(true);

        web3 = new Web3(window.ethereum);
        const currentAccount = await web3.eth.getAccounts();
        const stakedInstance = new web3.eth.Contract(StakedABI.abi, StakedABI.address);
        try {
            await stakedInstance.methods.unstake(content).send({
                from: currentAccount[0]
            });
            const newStakedItems = stakedItems.filter(item => item !== content);
            console.log("the length is", stakedItems.length);
            setStakedItems(newStakedItems);
            setLoading(false);
            createNotification("success");
        } catch (err) {
            if (err.code === 4001) {
                setLoading(false);
                createNotification("error");
            }
        }
    }

    React.useEffect(() => {
        const total = totalSum + sum;
        setTotalSum(total);
    }, [sum])


    const timer = (current, start) => {
        const duration = Number(current) - Number(start);
        console.log("duration is ", start);
        const hours = Math.floor(duration / 3600);
        const day = Math.floor(hours / 24);
        const hour = hours % 24;
        const min = Math.floor((duration - day * 3600 * 24 - hour * 3600) / 60);
        return day + ' D ' + hour + ' H ' + min + ' M';
    }
    return (
        <Container>
            <NotificationContainer />
            <Img src={imageUrl}></Img>
            <ContentBox>
                <Content fontSize={10}>
                    {'Title: ' + name}
                </Content>
                <Content fontSize={10}>
                    {'Pump Collected: ' + sum}
                </Content>
                <Content fontSize={10}>
                    {'Pump Rate: ' + String(sum / ((currentTime - startTime) / 3600 / 24))}
                </Content>
                <div style={{ width: '211px', display: 'flex', justifyContent: 'space-between' }}>
                    <Content fontSize={8}>
                        {'Current Streak: ' + timer(currentTime, startTime)}
                    </Content>

                </div>
                <RankBar>
                    <FilledBar value={((currentTime - startTime) / 3600 / 24) / 17 * 100}></FilledBar>
                </RankBar>
                <FlexRow>
                    {
                        loading ? <div className='spinner'><CircularProgress /></div> : <Img2 src='/images/Logos/Fill-White.png'></Img2>
                    }
                    <DecorText onClick={() => unstakeNFT()}>unstake</DecorText>
                </FlexRow>
            </ContentBox>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    background-color: black;
    margin-top: 20px;
    margin-bottom: 20px;
    height: fit-content;

    @media (max-width: 1016px) {
        margin-bottom: 0px;
        margin-top: 20px;
    }

    @media (max-width: 768px) {
        margin: auto;

        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media (max-width: 510px) {
        margin: auto;

        padding-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media (max-width: 425px) {
        margin: auto;
        width: 100%

        padding-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`
const ContentBox = styled.div`
    height: 181px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 25px;
    @media (max-width: 768px) {
        margin-top: 20px;
    }
`
const Img = styled.img`
    width: 181px;
    height: 181px;
    border-radius: 25px;
    margin: auto;
`
const Img2 = styled.img`
    width: 400px;
    height: 100px;
`
const RankBar = styled.div`
    width: 211px;
    background-color: white;
`
const Content = styled.div`
    font-size: ${props => props.fontSize}px;
    letter-spacing: 0px;
    line-height: 1px;
    color: #ffffff;
    font-weight: bold;
    font-family: "HelveticaNeue_Medium";
`;

const FilledBar = styled.div`
    width: ${props => props.value}%;
    height: 14px;
    background-color: #8dffa0;
`
const FlexRow = styled.div`
    display: flex;
    align-items: center;
    width: 236px;
    justify-content: space-between;
    margin-right: 40px;
    @media (max-width: 375px) {
        margin-right: 0px;
    }
`

const DecorText = styled.div`
    font-size: 17px;
    color: #a1c5ff;
    opacity: 0.9;
    font-family: "HelveticaNeue_Medium";
    text-transform: uppercase;
    cursor:pointer;
`