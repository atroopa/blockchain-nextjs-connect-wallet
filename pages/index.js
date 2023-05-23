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
    //checkIfWalletConnected();
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
          const balance = await provider.getBalance(accounts[0]);
          setBalance(ethers.utils.formatEther(balance));
        }else{
          window.ethereum.reload();
        }

      });
    }
    accountChanged();
  }, []);

  return (
    <main className="flex items-center justify-center bg-gradient-to-tr from-pink-900 via-pink-600 to-pink-400 h-screen">
    <div className="bg-gray-700 
                      rounded-3xl 
                      shadow-black 
                      shadow-2xl 
                      py-10 px-4
                      text-white
                      text-center
                      flex
                      flex-col
                      items-center
                      ">
      {!currentAccount ? "" : <span></span> }
      <Image src={creator} alt="profile" width={80} height={80}/>
      <h3 className="text-2xl font-bold py-2">check BNB</h3>

      {! currentAccount ? (
        <div className=" flex
                         flex-col
                         items-center">
          <div>
            
          </div>
        <Image  src={imageEth} alt="ether" width={200} height={300} />
        <p className="font-thin">Welcome to BNB Acount Balance Checker</p>
        </div>
      ):(
        <div>
          <h6 className="font-bold">Verified <span className="bg-yellow-300 rounded-full p-1">&#10004;</span></h6>
          <p className="py-3 text-sm">
            BNB account and balance Checker <br/> find account details 
          </p>
          <div>
            <button className="bg-pink-800 rounded-2xl px-4 py-3 my-4" onClick={() => {}}>BNB acount details</button>
          </div>
        </div>
      )}

        {!currentAccount && !connect ? (
          <div>
            <button className="m-3 rounded-lg px-2 py-1 bg-pink-400 text-black" onClick={() => cWallet()} >Connect Wallet</button>
          </div>
        ) : (
          <div className="shadow-black shadow-inner text-left bg-gray-600 rounded-xl p-3 h-full">
            <h6 className="text-2xl pt-3 pb-1 font-bold font-serif text-gray-300">Your BNB</h6>
            <ul>
              <li className="text-gray-200 font-serif font-bold">Account :</li>
              <li>{currentAccount}</li>
              <li className="text-gray-200 font-serif font-bold">Balance</li>
              <li>{balance} BNB</li>
            </ul>
          </div>
        )}
    </div>
    </main>
  );
};

export default Home;