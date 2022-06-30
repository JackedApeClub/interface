// Styled Components
import React from 'react';
import styled from "styled-components";

import { Box, } from "@mui/system";
import { Typography } from '@mui/material';

import FlowCardComp from './StakeItem/FlowCardComp';
import CardComp from "./StakeItem/CardComp";
import WalletAddress from "./StakeItem/WalletAddress";
import StakeABI from '../../ABI/Stakeable.json';
import { MarketContext } from "../../context/MarketContext";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import CircularProgress from '@mui/material/CircularProgress';
import Web3 from 'web3';


const Stake = ({ tokenIds, currentAccount }) => {

    const [totalYields, setTotalYields] = React.useState(0);
    const [claimLoading, setClaimLoading] = React.useState(false);

    const { stakedItems, setStakedItems, totalSum } = React.useContext(MarketContext);
    const pumpRate = stakedItems.length > 0 ? (stakedItems.length > 4 ? 10 : 5 * ((stakedItems.length - 1) * 0.25 + 1)) : 0;
    const getYields = async (account) => {
        const web3 = new Web3(window.ethereum);
        const stakeContractInstance = new web3.eth.Contract(StakeABI.abi, StakeABI.address);
        const total = await stakeContractInstance.methods.getYields(account).call();
        setTotalYields(total);
    }
    React.useEffect(() => {
        if (currentAccount) {
            const getStakedItems = async () => {
                const web3 = new Web3(window.ethereum);
                const stakeContractInstance = new web3.eth.Contract(StakeABI.abi, StakeABI.address);
                const items = await stakeContractInstance.methods.getStakedTokenIds(currentAccount).call();
                console.log("getStakedItems ? ", items);
                setStakedItems(items);
            }
            getStakedItems();
        }
    }, [currentAccount])
    React.useEffect(() => {
        console.log("currentAccount is ", currentAccount);
        if (currentAccount) getYields(currentAccount)
    }, [currentAccount])

    const claimReward = async () => {
        setClaimLoading(true);
        web3 = new Web3(window.ethereum);
        const stakeContractInstance = new web3.eth.Contract(StakeABI.abi, StakeABI.address);
        try {
            console.log(currentAccount);
            await stakeContractInstance.methods.claimReward().send({
                from: currentAccount
            })
            .on('transactionHash', (hash) => {
                console.log("transactionHash", hash);
            })
            .on('receipt', (receipt) => {
                console.log("receipt", receipt);
                NotificationManager.success('Successfully claim reward.', 'Claim Reward', 3000);
                setClaimLoading(false);
            })
            .on('error', function(error) {
                console.log("error");
                NotificationManager.error('Faild to claim', 'Rejected', 3000);
                setClaimLoading(false);
            });
        } catch (err) {
            console.log(err);
            if (err.code === 4001) {

            }
        }
    }

    return (
        <Wrapper>
            <NotificationContainer />
            <div className="stake-container">
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Img src='/images/Logos/JACKED_Grey_Crop.svg' alt=""></Img>
                </div>
                {/* <div className="head-title">
                    STAKING ROUTINE
                </div> */}
            </div>
            <div className="detail-container" >
                <Box
                    sx={{
                        width: '30%',
                        height: 517,
                        paddingLeft: 3,
                        backgroundColor: 'black',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                        },
                    }}
                    className={"detail-box"}
                >
                    <Typography className="total-title">TOTAL RESULTS</Typography>
                    <div className="text-box">
                        <div className="text-container">
                            {/* <div className="total-content-tag">Workout Streak:</div>
                            <div className="total-content">17 Days</div> */}
                            <div className="total-content-tag">Pump Collected:</div>
                            <div className="total-content">{totalSum}</div>
                            <div className="total-content-tag">Highest Pump Rate:</div>
                            <div className="total-content">{pumpRate}$ / Day</div>
                            <div className="total-content"></div>
                            <div className="total-content">
                                <ClaimButton onClick={() => !claimLoading ? claimReward() : ''}><span></span>{claimLoading ? <CircularProgress /> : 'Claim'}</ClaimButton>
                            </div>
                            
                        </div>
                    </div>

                </Box>
                <Box
                    sx={{
                        width: '65%',
                        paddingLeft: 10,
                        paddingRight: 8,
                        backgroundColor: 'black',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                        },
                    }}
                    className={"items-box"}
                >
                    <div className="total-title">Staking</div>
                    <div className="box_wrapper">
                        <BoxContainer className="box-container">
                            {
                                stakedItems.length > 0 ? stakedItems.map((item, index) => {
                                    return (
                                        <CardComp content={item} account={currentAccount} key={index}></CardComp>
                                    )
                                })
                                    : <div className='no-stakedItem'>Nothing is staked</div>
                            }
                        </BoxContainer>
                    </div>
                </Box>

            </div>
            <div className="detail-footer">
                <Box
                    sx={{
                        width: '100%',
                        paddingLeft: 3,
                        paddingRight: 3,
                        backgroundColor: 'black',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                        },
                    }}
                    className={"detail-footer-box"}
                >
                    <div className="footer-wallet">
                        <Typography className="footer-title">Wallet</Typography>
                        <WalletAddress></WalletAddress>
                    </div>
                    <StateBoxContainer>
                        <div className="footer-cards">
                            {
                                tokenIds.length > 0 ? tokenIds.map((tokenId, index) => {
                                    return (
                                        <FlowCardComp tokenId={tokenId} account={currentAccount} key={index}></FlowCardComp>
                                    )
                                })
                                    : <div className='no-items'>No items</div>
                            }
                        </div>
                    </StateBoxContainer>
                </Box>

            </div>
            <div style={{ height: "100px" }}></div>
        </Wrapper >
    );
};

export default Stake;

const BoxContainer = styled.div`
    width: 100%;
    height: 420px;
    overflow-y: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

const ClaimButton = styled.div`
    font-size: 1.75rem;
    cursor: pointer;
    transition: all 0.3s;
    padding: 8px;
    border: 1px solid white;
    border-radius: 8px;
    margin-top: 16px;
    width: 10rem;
    text-align: center;
`

const StateBoxContainer = styled.div`
    padding-bottom: 20px;
    overflow-x:auto;
    width:100%;
`

const Img = styled.img`
    width: 420px;
    height: 105px;
    margin: 20px;
    position: relative;
    z-index: 10000;
    @media (max-width: 375px) {
        width: 320px;
        height: 80px;
    }
`

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image:url('/images/PC_Wallpaper_1.png');
    .stake-container{
        width: 100%;
        height: 100%;   
        
    };

    .main-logo{
        width: 412px;
        height: 102px;
        margin: auto;
    };
    .stake-container{
        .head-title{
            text-align: center;
            font-size: 44px;
            letter-spacing: 1px;
            color: #ffffff;
            font-family: "HelveticaNeue_Medium";
        };
    }
    .detail-container{
        display:flex;
        justify-content: space-between;
        padding:16px 46px;
        .detail-box{
            width:34%;
        }
        .items-box{
            width:65%;
        }
        opacity: 0.9;
    };
    .text-box {
        width: 100%;
        display: flex;
        justify-content: left;    
    }
    
    .text-container {
        width: fit-content;
    }

    .total-title{
        font-size: 60px;
        letter-spacing: 1px;
        color: #ffffff;
        font-family: "HelveticaNeue_Medium";
    };

    .total-content-tag{
        font-size: 28px;
        letter-spacing: 1px;
        color: #ffffff;
        font-weight: bold;
        font-family: "HelveticaNeue_Medium";
    };

    .total-content{
        font-size: 43px;
        letter-spacing: 1px;
        color: #ffffff;
        font-weight: bold;
        font-family: "HelveticaNeue_Medium";
    };

    .detail-footer{
        width: calc(100%);
        display:flex;
        justify-content: center;
        padding: 0px 46px;
        margin: 0px;
        height: fit-content;
        opacity: 0.9;
        padding-bottom: 16px;

        .detail-footer-box{
            width: 100%;
            height: 335px;
        }
    }
    .items-box{
        height: 517px;
        .box-container {
            height: 425px;
        }
    }


    .footer-title{
        font-size: 42px;
        letter-spacing: 1px;
        color: #ffffff;
        font-family: "HelveticaNeue_Medium";
    }

    .footer-wallet{
        display:flex;
        justify-content:space-between;
    }

    .footer-cards{
        display:flex;
        justify-content:space-between;
    }

    .no-stakedItem{
        display: flex;
        margin: auto;
        font-size: 50px;
        font-family: HelveticaNeue_Medium;
    }

    .no-items{
        display: flex;
        margin: auto;
        font-size: 50px;
        font-family: HelveticaNeue_Medium;
    }

    @media (max-width: 1440px) {
        .total-content {
            font-size: 35px;
        }
        .total-content-tag{
            font-size: 28px;
            width: fit-content;
            line-height: 40px;
        };
        
    }
    @media (max-width: 1024px) {
        .detail-container{
            flex-direction: column;
            .detail-box{
                width: 100%;
                margin-top: 20px;
            }
            .items-box{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-top:20px;
                .box-container {
                    height: 100vh;
                }
            }
        }

        .total-title{
            text-align: center;
            padding-top:30px;
            padding-top:20px;
        }
        .text-box{
            justify-content:center;
        }
        .detail-footer{
            .detail-footer-box{
                width: 100%;
                height: 360px;
            }
        }

    }
    @media only screen and (max-width: 768px) {
        .box_wrapper{
            width: 605px;
            .box-container{
                width: 90%;
                height: 400px;
                overflow-y: auto;
                flex-wrap: wrap;
            }
        }
        
        .detail-footer{
            width: 100%;

            .detail-footer-box{
                width: 100%;
                height: 400px;
            }
        }

        .card-item{
            margin-right:0px;
            margin:20px;
        }
        .hZqYkZ{
            padding-right:50px; 
        }
        .css-dq8qjh {
            padding: 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    @media (max-width: 690px) {
        .main-logo-image {
            width: 320px !important;
            height: 80px !important;
        }
        .stake-container{
            .head-title {
                font-size: 30px;
            }
        }


        .detail-container {
            width: 90%;
            padding: 0px;   
            margin: auto;
            .items-box{
                width: 100%;
            }
        }

        .box_wrapper{
            width:100%;
            .box-container{
                overflow-y: auto;
                width: 100%;
                height: 420px;
                
            }
        }
        .hZqYkZ{
            padding-right:0px; 
        }
        .detail-footer {
            margin: auto;
            width: 90%;
            padding: 0px;
            margin-top: 20px;
        }
        .footer-wallet {
            display: flex;
            flex-direction: column;
        }
        .wallet-address {
            font-size: 16px;
            line-height: 16px;
        }
        .metamask-icon {
            margin: 0px;
            margin-right: 20px;
        }
        .total-title{
            line-height:70px;
        }

    }


    @media (max-width: 425px) {
        .main-logo-image {
            width: 320px !important;
            height: 80px !important;
        }

        .stake-container{
            .head-title {
                font-size: 30px;
            }
        }

        .detail-container {
            width: 90%;
            padding: 0px;   
            margin: auto;
            .items-box{
                padding: 0px;
                width: 100%;
                .box_wrapper {
                    width: 100%;            
                    .box-container{
                        overflow-y: auto;
                        margin: auto;
                        width: 100%;
                        height: 420px;       
                    }
                }
            }
        }

        .detail-footer {
            margin: auto;
            width: 90%;
            padding: 0px;
            margin-top: 20px;

        }
        .footer-wallet {
            display: flex;
            flex-direction: column;
        }
        .wallet-address {
            font-size: 16px;
            line-height: 16px;
        }
        .metamask-icon {
            margin: 0px;
            margin-right: 20px;
        }
        .total-title{
            line-height:70px;
        }
    }
    @media (max-width: 375px) {
        .items-box{
            padding: 0px;
            width: 100%;

            .box_wrapper {
                width: 100%;

                .box-container{
                    overflow-y: auto;
                    margin: auto;
                    width: 100%;
                    height: 420px;       
                }
            }
        }
    }
`;