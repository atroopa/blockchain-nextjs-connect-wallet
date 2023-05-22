import React, {useState, useEffect} from "react";
import web3Modal from 'web3modal';
import {ethers} from 'ethers';
import imageEth from '../ether.png';
import creator from '../creator.png';
import {getTrustWalletInjectedProvider} from './trust'

const Home = () => {

  const [currentAccount, setCurrentAccount] = useState('');
  const [connect, setConnect]               = useState(false);
  const [balance , setBalance]              = useState('');

  const failMessage    = "Please install MetaMask and connect !";
  const successMessage = "Your Account Successfully Connected to Metamask";

  const INFURA_ID = "f67125134e064cf094e2495c49323c68";
  const provider = new ethers.providers.JsonRpcProvider(`https://bsc-dataseed.binance.org`);

  const checkIfWalletConnected =  async () => {
    if (! window.trustwallet) return;

    const injectedProvider = await getTrustWalletInjectedProvider();

    try {

      const accounts = await injectedProvider.request({
        method: "eth_requestAccounts",
      });
      

        if(accounts.length){
          setCurrentAccount(accounts[0]);
          console.log(accounts[0]);
        }else {
          console.log(failMessage);
        }

        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance) , " bnb");

    } catch (e) {
      if (e.code === 4001) {
        console.error("User denied connection.");
      }
    }



    // const address = "0x5352ca03fECfeC0BAdb7918E9933cb9c0f70E662";

  }

  checkIfWalletConnected();

  return (
    <div>
      <h1>Home</h1>
      <div>Address : {currentAccount}</div>
      <div>Balance : {balance} BNB</div>
    </div>
  );
};

export default Home;