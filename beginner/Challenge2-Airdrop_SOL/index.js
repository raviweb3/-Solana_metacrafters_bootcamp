// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Get the wallet balance from a given private key
const getWalletBalance = async (publickey) => {
    try {
        // Connect to the Devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
//        console.log("Connection object is:", connection);

        const walletBalance = await connection.getBalance(
            new PublicKey(publickey)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async (publickey) => {
    try {
        // Connect to the Devnet and make a wallet from privateKey
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
       
        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publickey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    console.log(process.argv[2]);
    const publickey = process.argv[2];
    await getWalletBalance(publickey);
    await airDropSol(publickey);
    await getWalletBalance(publickey);
}

mainFunction();