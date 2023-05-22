import React, {useState, useEffect} from "react";
import web3Modal from 'web3modal';
import {ethers} from 'ethers';
import imageEth from '../ether.png';
import creator from '../creator.png';
import {getTrustWalletInjectedProvider} from './trust';


const Home = () => {

  const [currentAccount, setCurrentAccount] = useState('');
  const [connect, setConnect]               = useState(false);
  const [balance , setBalance]              = useState('');

  const failMessage    = "Please install MetaMask and connect !";
  const successMessage = "Your Account Successfully Connected to Metamask";





  const checkIfWalletConnected =  async () => {
    //if (! window.trustwallet) return;

    //const accounts = await window.trustWallet.request({method: "eth_accounts"});
    //console.log(accounts);
    const injectedProvider = await getTrustWalletInjectedProvider();
    const provider = new ethers.providers.Web3Provider(injectedProvider);
    // const account = "0x5352ca03fECfeC0BAdb7918E9933cb9c0f70E662";
    // const accountBalance = await provider.getBalance(account);
    const signer   =  provider.getSigner()
    console.log( signer.getAddress());
    //console.log( ethers.utils.formatEther(accountBalance), " ETH")

  //   if(accounts.length){
  //     setCurrentAccount(accounts[0]);
  //     console.log(accounts[0]);
  //   } else {
  //     console.log(failMessage);
  //   }

  //   const address = "0x4Ba71c78d6556b0b25D7738b7fD8a518C7489A44";
  //   const balance = await provider.getBalance(address);
  //   console.log(ethers.utils.formatEther(balance) , " ETH");
  }

  checkIfWalletConnected();

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;