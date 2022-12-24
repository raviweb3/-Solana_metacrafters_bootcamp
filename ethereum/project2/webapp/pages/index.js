import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

// Connecting Blockchain

import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import { COHORT_CONTRACT_ADDRESS, abi } from "../constants";


export default function Home() {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  // joinedWhitelist keeps track of whether the current metamask address has joined the Whitelist or not
  const [registerUser, setRegisterUser] = useState(false);

  const [availableSpots, setAvailableSpots] = useState(0);

  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);

  const [allParticipants, setAllParticipants] = useState([]);
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();
 
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  
  const RegisterUser = async () => {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true);
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const cohortProgram = new Contract(
        COHORT_CONTRACT_ADDRESS,
        abi,
        signer
      );
     
      const tx = await cohortProgram.register("Ravi Kiran","fresh graduate", 0);
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      // get All Participants
      await getAllParticipants();
      setRegisterUser(true);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * getAllParticipants:  gets the number of whitelisted addresses
   */
  const getAllParticipants = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // No need for the Signer here, as we are only reading state from the blockchain
      const provider = await getProviderOrSigner();
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      const cohortProgram = new Contract(
        COHORT_CONTRACT_ADDRESS,
        abi,
        provider
      );
      // call the numAddressesWhitelisted from the contract
      const allparticipants =
        await cohortProgram.getAllParticipants();
        setAllParticipants(allparticipants);
    } catch (err) {
      console.error(err);
    }
  };

  const getAvailableSpots = async () => {
    try {
      // We will need the signer later to get the user's address
      // Even though it is a read transaction, since Signers are just special kinds of Providers,
      // We can use it in it's place
      const signer = await getProviderOrSigner(true);
      const cohortProgram = new Contract(
        COHORT_CONTRACT_ADDRESS,
        abi,
        signer
      );
     
      // call the whitelistedAddresses from the contract
      const numberOfSpots = await cohortProgram.availableSpots();
      setAvailableSpots(numberOfSpots);
    } catch (err) {
      console.error(err);
    }
  };

  /*
    connectWallet: Connects the MetaMask wallet
  */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);

      getAvailableSpots();
    } catch (err) {
      console.error(err);
    }
  };

  /*
    renderButton: Returns a button based on the state of the dapp
  */
  const renderButton = () => {
    if (walletConnected) {
      if (availableSpots == 0) {
        return (
          <div className={styles.description}>
            Program is full
          </div>
        );
      } else if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else {
        return (
          <button onClick={RegisterUser} className={styles.button}>
            Join the Program
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  // useEffects are used to react to changes in state of the website
  // The array at the end of function call represents what state changes will trigger this effect
  // In this case, whenever the value of `walletConnected` changes - this effect will be called
  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div>
      <Head>
        <title>Cohort Program - Ethereum training</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Ethereum 18 weeks program</h1>
          <div className={styles.description}>
            Path to transit from Web2 to Full fledged Web 3 Developer
          </div>
          <div className={styles.description}>
            {allParticipants.length} have already joined the program
          </div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src="./crypto-devs.svg" />
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by Crypto Devs
      </footer>
    </div>
  );
}
