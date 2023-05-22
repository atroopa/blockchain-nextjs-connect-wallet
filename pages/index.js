import React, {useState, useEffect} from "react";
import web3Modal from 'web3modal';
import {ethers} from 'ethers';
import imageEth from '../ether.png';
import creator from '../creator.png';

const Home = () => {

  const [currentAccount, setCurrentAccount] = useState('');
  const [connect, setConnect]               = useState(false);
  const [balance , setBalance]              = useState('');

  const failMessage    = "Please install MetaMask and connect !";
  const successMessage = "Your Account Successfully Connected to Metamask";

  const INFURA_ID = "f67125134e064cf094e2495c49323c68";
  const provider = new ethers.providers.JsonRpcProvider(`HTTP://127.0.0.1:7545`);

  const checkIfWalletConnected =  async () => {
    //if (! window.trustwallet) return;

    const accounts = await window.ethereum.request({method: "eth_accounts"});
    //console.log(accounts);
    // const injectedProvider = await getTrustWalletInjectedProvider();
    // const ethersProvider = new ethers.providers.Web3Provider(injectedProvider);
    // const account = "0x5352ca03fECfeC0BAdb7918E9933cb9c0f70E662";
    // const accountBalance = await ethersProvider.getBalance(account);
    // console.log(accountBalance)

    if(accounts.length){
      setCurrentAccount(accounts[0]);
    } else {
      return failMessage;
    }

    const balance = await provider.getBalance("0x4Ba71c78d6556b0b25D7738b7fD8a518C7489A44");
  }

  return (
    <div>
      <h1>Home</h1>
      <div>{currentAccount}</div>
    </div>
  );
};

export default Home;