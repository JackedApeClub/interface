// React
import React, { Fragment } from "react";

// Next
import Head from "next/head";

// Components
import Stake from "../../components/Stake/Stake";
import Web3 from 'web3';
import StakeableABI from '../../ABI/Stakeable.json';
import { getTxList, catchTime } from "./utils/etherApi";
import { MarketContext } from "../../context/MarketContext";
import { getTotalList } from "../../components/utils/helpers";

const index = () => {
  const [currentAccount, setCurrentAccount] = React.useState('');
  const [tokenIds, setTokenIds] = React.useState([]);
  const [stakePrefix, setStakePrefix] = React.useState('');
  const [unstakePrefix, setUnstakePrefix] = React.useState('');

  const { stakedItems, txHistory, setTxHistory } = React.useContext(MarketContext);

  const getAccounts = async (provider) => {
    await window.ethereum.enable();
    const accountList = await provider.request({ method: "eth_accounts" });
    setCurrentAccount(accountList[0]);
  }
  React.useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      // const keccakHash = web3.eth.abi.encodeFunctionSignature("stake(uint256)");
      // console.log("keccak hash result is ", keccakHash);
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
      const stakeFunctionHash = String(keccakStakeFunction).slice(0, 10);
      const unstakeFunctionHash = String(keccakUnstakeFunction).slice(0, 10);
      setStakePrefix(stakeFunctionHash);
      setUnstakePrefix(unstakeFunctionHash);
      console.log('encodeFunctionCall result is ', stakeFunctionHash, unstakeFunctionHash);
      getAccounts(window.ethereum);
    }
  }, []);

  React.useEffect(async () => {
    if (currentAccount) {
      console.log('currentAccount - index', currentAccount);
      const temp = [];
      const txList = await getTxList(currentAccount);
      console.log("txList is ", txList);
      if (txList.length > 0) {
        txList.forEach((tx, index) => {
          if (!temp.includes(tx.tokenID)) {
            temp.push(tx.tokenID);
          }
          if (index === txList.length - 1) {
            console.log('temp is ', temp);
            setTokenIds(temp);
          }
        })

      }
    }
  }, [currentAccount, stakedItems]);

  React.useEffect(() => {
    if (currentAccount) {
      if (stakePrefix || unstakePrefix) {
        const getList = async (_stakePrefix, _unstakePrefix) => {
          const catchList = await catchTime(currentAccount);
          console.log('catchList is', catchList);
          const totalList = getTotalList(_stakePrefix, _unstakePrefix, catchList);
          console.log('txHistory is ', totalList);
          setTxHistory(totalList);
        }
        getList(stakePrefix, unstakePrefix);
      }
    }

  }, [stakePrefix, currentAccount])
  return (
    <Fragment>
      <Head>
        <title>Jacked | Stake</title>
        <link rel="shortcut icon" href="./images/Logos/E-Fill-White.png" />
      </Head>
      <Stake tokenIds={tokenIds} currentAccount={currentAccount} />
    </Fragment>
  );
};

export default index;
