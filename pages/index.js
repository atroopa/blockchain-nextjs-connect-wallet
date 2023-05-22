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
  const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

  

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;