// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmRawTransaction,
    sendAndConfirmTransaction
} = require("@solana/web3.js");

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Get the wallet balance from a given private key
const getWalletBalance = async (publickey) => {
    let balance = 0;
    try {
        // Connect to the Devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
//        console.log("Connection object is:", connection);

        const walletBalance = await connection.getBalance(
            new PublicKey(publickey)
        );
        balance = parseInt(walletBalance);
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
    return balance;
};

const airDropSolAndTransfer = async (from, to, balance) => {
    try {
        // Connect to the Devnet and make a wallet from privateKey
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
       
        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(from._keypair.publicKey),
            balance * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);

            // Send money from "from" wallet and into "to" wallet
        var transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to.publicKey,
                lamports: (balance * LAMPORTS_PER_SOL) / 2
            })
        );

        // Sign transaction
        var signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );
        console.log('Signature is ', signature);
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    const fromPair = Keypair.generate();
    const toPair = Keypair.generate();
    const fromBalance = await getWalletBalance(fromPair._keypair.publicKey);
    await getWalletBalance(toPair._keypair.publicKey);
    await airDropSolAndTransfer(fromPair, toPair, 10);
    await getWalletBalance(fromPair._keypair.publicKey);
    await getWalletBalance(toPair._keypair.publicKey);
}

mainFunction();