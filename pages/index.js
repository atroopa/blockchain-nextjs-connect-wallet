import React, {useState, useEffect}     from "react";
import {getTrustWalletInjectedProvider} from './trust'
import web3Modal from 'web3modal';
import {ethers}  from 'ethers';
import imageEth  from '../ether.png';
import creator   from '../creator.png';
import Image     from "next/image";

const Home = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [connect, setConnect]               = useState(false);
  const [balance , setBalance]              = useState('');

  const failMessage                         = "Please install TrustWallet and connect !";
  const successMessage                      = "Your Account Successfully Connected to Metamask";

  const INFURA_ID                           = "f67125134e064cf094e2495c49323c68";
  const provider                            = new ethers.providers.JsonRpcProvider(`https://bsc-dataseed.binance.org`);

  const checkIfWalletConnected =  async () => {
    if (! window.trustwallet) return;

    const injectedProvider = await getTrustWalletInjectedProvider();

    try {

      const accounts = await injectedProvider.request({
        method: "eth_requestAccounts",
      });
      

        if(accounts.length){
          console.log(accounts[0]);
        }else {
          console.log(failMessage);
        }

        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance));

    } catch (e) {
      if (e.code === 4001) {
        console.error("User denied connection.");
      }
    }
  }

  const cWallet = async () => {
    if(!window.ethereum) return console.log(failMessage);

    const injectedProvider = await getTrustWalletInjectedProvider();
    const accounts = await injectedProvider.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);
    //window.location.reload();

  }

  useEffect(() => {
    checkIfWalletConnected();
  });

useEffect(() => {
    async function accountChanged() {
      window.ethereum.on('accountsChanged' , async function () {
        const injectedProvider = await getTrustWalletInjectedProvider();
        const accounts = await injectedProvider.request({
          method: "eth_accounts",
        });

        if(accounts.length){
          setCurrentAccount(accounts[0]);
        }else{
          window.ethereum.reload();
        }

      });
    }
    accountChanged();
  }, []);

  return (
    <div>
      {!currentAccount ? "" : <span>PRO</span>}
      <Image src={creator} alt="profile" width={80} height={80}/>
      <h3>check ether</h3>

      {! currentAccount ? (
        <div>
          <div>
            <p>{failMessage}</p>
          </div>
        <Image src={imageEth} alt="ether" width={100} height={100} />
        <p>Welcome to BNB Acount Balance Checker</p>
        </div>
      ):(
        <div>
          <h6>Verified <span className="tick">&#10004;</span></h6>
          <p>
            BNB account and balance Checker <br/> find account details 
          </p>
          <div>
            <button className="bg-blue-100" onClick={() => {}}>BNB acount details</button>
          </div>
        </div>
      )}

        {!currentAccount && !connect ? (
          <div>
            <button className="bg-red-100" onClick={() => cWallet()} >Connect Wallet</button>
          </div>
        ) : (
          <div>
            <h6>Your BNB</h6>
            <ul>
              <li>Account</li>
              <li>{currentAccount}</li>
              <li>Balance</li>
              <li>{balance} BNB</li>
            </ul>
          </div>
        )}
    </div>
  );
};

export default Home;