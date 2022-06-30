import axios from 'axios';
import JackedABI from '../../../ABI/JackedApeClub.json';
import StakeABI from '../../../ABI/Stakeable.json';

const APIKEY = '29BGBNDYDU8GSR2IW7JRXUDUQ6Q6UF9RP5';
const getTxList = async (account) => {
    console.log("txLIst funciton called!")
    const response = await axios.get("https://api-rinkeby.etherscan.io/api", {
        params: {
            module: 'account',
            action: 'tokennfttx',
            contractAddress: JackedABI.address, //'0x95C9AD3Dd160D88FF66169f05C348e196B1a5dB1',
            address: account,
            apikey: APIKEY
        }
    });
    return response.data.result;
}

const catchTime = async (account) => {
    const response = await axios.get("https://api-rinkeby.etherscan.io/api", {
        params: {
            module: 'account',
            action: 'txlist',
            contractAddress: StakeABI.address, //'0xbc664220982bB481ABB52F2dC31b53bEC272057B',
            address: account,
            apikey: APIKEY
        }
    });
    return response.data.result;
}
export {
    getTxList,
    catchTime
}