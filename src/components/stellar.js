import StellarSdk from "stellar-sdk";

// create new and unique key pair
const pair = StellarSdk.Keypair.random();
console.log("  Public Key: " + pair.publicKey());
console.log("  Secret Key: " + pair.secret());
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

// The SDK does not have tools for creating test accounts, so you'll have to make your own HTTP request.
// if you're trying this on Node, install the `node-fetch` library and uncomment the next line:
// const fetch = require('node-fetch');

export async function createWallet() {
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(
        pair.publicKey()
      )}`
    );
    const responseJSON = await response.json();
    console.log("SUCCESS! You have a new account :)\n", responseJSON);
  } catch (error) {
    console.error("ERROR!\n", error);
  }
  // After you've got your test lumens from friendbot, we can also use that account to create a new account on the ledger.
  try {
    var parentAccount = await server.loadAccount(pair.publicKey()); //make sure the parent account exists on ledger
    var childAccount = StellarSdk.Keypair.random(); //generate a random account to create
    //create a transacion object.
    var createAccountTx = new StellarSdk.TransactionBuilder(parentAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    });
    //add the create account operation to the createAccountTx transaction.
    createAccountTx = await createAccountTx
      .addOperation(
        StellarSdk.Operation.createAccount({
          destination: childAccount.publicKey(),
          startingBalance: "5",
        })
      )
      .setTimeout(180)
      .build();
    //sign the transaction with the account that was created from friendbot.
    await createAccountTx.sign(pair);
    //submit the transaction
    let txResponse = await server
      .submitTransaction(createAccountTx)
      // some simple error handling
      .catch(function (error) {
        console.log("there was an error\n", error);
        return error;
      });
    console.log("TESTNET Account Created\n", txResponse);
    // console.log("Created the new child account\n", childAccount.publicKey());
  } catch (e) {
    console.error("ERROR!\n", e);
  }
}

// get wallet details
export async function getAccount() {
  try {
    const account = await server.loadAccount(pair.publicKey());
    return account;
  } catch (error) {
    return error;
  }
}

export async function sendFunds(destinationId, secretKey, amount) {
  // try {
  const sourceKeys = StellarSdk.Keypair.fromSecret(pair.secret());
  // const destinationId = "GCQUQYZEUQNLKP6I3PSXWXLT5PDKRPQQTKZJCZSLR7BXHD6D6LDGOMJK";
  // Transaction will hold a built transaction we can resubmit if the result is unknown.
  let transaction;
  server
    // First, check to make sure that the destination account exists.
    // You could skip this, but if the account does not exist, you will be charged the transaction fee when the transaction fails.
    .loadAccount(destinationId)
    // If the account is not found, surface a nicer error message for logging.
    .catch(function (error) {
      if (error instanceof StellarSdk.NotFoundError) {
        throw new Error("The destination account does not exist!");
      } else return error;
    })
    // If there was no error, load up-to-date information on your account.
    .then(function () {
      return server.loadAccount(sourceKeys.publicKey());
    })
    .then(function (sourceAccount) {
      // Start building the transaction.
      transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destinationId,
            // Because Stellar allows transaction in many currencies, you must
            // specify the asset type. The special "native" asset represents Lumens.
            asset: StellarSdk.Asset.native(),
            amount: amount.toString(),
          })
        )
        // A memo allows you to add your own metadata to a transaction. It's optional and does not affect how Stellar treats the transaction.
        .addMemo(StellarSdk.Memo.text("Test Transaction"))
        // Wait a maximum of three minutes for the transaction
        .setTimeout(180)
        .build();
      // Sign the transaction to prove you are actually the person sending it.
      transaction.sign(sourceKeys);
      // And finally, send it off to Stellar!
      return server.submitTransaction(transaction);
    })
    .then(function (result) {
      // return result;
      console.log("Success! Results:\n", result);
    })
    .catch(function (error) {
      // If the result is unknown (no response body, timeout etc.) we simply resubmit already built transaction:
      // server.submitTransaction(transaction);
      // return error;
      console.error("Something went wrong!\n", error);
    });
  // } catch (error) {
  //   return error;
  // }
}

export async function makePayment() {
  const sourceKeys = StellarSdk.Keypair.fromSecret(pair.secret());
  // "SCSQQIBLQXGZ66C45RJGBEFFYERJCO2LUZ3NGV3EGCR2DSKQR7OVMGPT",
  const destinationId =
    "GAQWHQGLNCIVGILQCVSZLQ6SYZOOYPZVVCTPN6OULGPV37JLSV6FPDW7";
  // Transaction will hold a built transaction we can resubmit if the result is unknown.
  let transaction;
  server
    // First, check to make sure that the destination account exists.
    // You could skip this, but if the account does not exist, you will be charged the transaction fee when the transaction fails.
    .loadAccount(destinationId)
    // If the account is not found, surface a nicer error message for logging.
    .catch(function (error) {
      if (error instanceof StellarSdk.NotFoundError) {
        throw new Error("The destination account does not exist!");
      } else return error;
    })
    // If there was no error, load up-to-date information on your account.
    .then(function () {
      return server.loadAccount(sourceKeys.publicKey());
    })
    .then(function (sourceAccount) {
      // Start building the transaction.
      transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destinationId,
            // Because Stellar allows transaction in many currencies, you must specify the asset type. The special "native" asset represents Lumens.
            asset: StellarSdk.Asset.native(),
            amount: "10",
          })
        )
        // A memo allows you to add your own metadata to a transaction. It's optional and does not affect how Stellar treats the transaction.
        .addMemo(StellarSdk.Memo.text("Test Transaction"))
        // Wait a maximum of three minutes for the transaction
        .setTimeout(180)
        .build();
      // Sign the transaction to prove you are actually the person sending it.
      transaction.sign(sourceKeys);
      // And finally, send it off to Stellar!
      return server.submitTransaction(transaction);
    })
    .then(function (result) {
      console.log("Success! Results:\n", result);
    })
    .catch(function (error) {
      console.error("Something went wrong!\n", error);
      // If the result is unknown (no response body, timeout etc.) we simply resubmit already built transaction:
      // server.submitTransaction(transaction);
    });
}

// Keys for accounts to issue and receive the new asset
const issuingKeys = StellarSdk.Keypair.fromSecret(pair.secret()); // "SBENEWKMAGEBBAH7S2TPIB4W4QFZNMG4OLHPGFFPHJHH3PGQ24BFCKVN"
const buyer = StellarSdk.Keypair.fromSecret(
  "SDMOB47RKGCIIIWLA5QWZBYS46JHXVI6FFT74U5TFGTSKZVCEKDVEMST"
);
// Create an object to represent the new asset
const NFT = new StellarSdk.Asset("NFT", issuingKeys.publicKey());

export async function createTrustline() {
  server
    // First, the receiving account must trust the asset
    .loadAccount(buyer.publicKey())
    .then(function (receiver) {
      var transaction = new StellarSdk.TransactionBuilder(receiver, {
        fee: 100,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        // The `changeTrust` operation creates (or alters) a trustline
        // The `limit` parameter below is optional
        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: NFT,
            limit: "0.0000001",
          })
        )
        // setTimeout is required for a transaction
        .setTimeout(180)
        .build();
      transaction.sign(buyer);
      return server.submitTransaction(transaction);
    })
    .then(function (result) {
      // return result;
      console.log("Trust Success:\n", result);
    })
    // Second, the issuing account actually sends a payment using the asset
    .catch(function (error) {
      console.error("Error!", error);
    });
}

export async function buyOffer(price) {
  server
    .loadAccount(buyer.publicKey())
    .then(function (receiver) {
      var transaction = new StellarSdk.TransactionBuilder(receiver, {
        fee: 100,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.manageBuyOffer({
            selling: new StellarSdk.Asset.native(),
            buying: new StellarSdk.Asset(
              "NFT",
              "GBPTVG6JJEJ5NORBQY3ONVUNMFSDSS3NX2IYCYOT5NBJ6U7WHWUXSF3M"
            ),
            buyAmount: "0.0000001",
            price: "8.6",
            // price: price.toString(),
          })
        )
        .setTimeout(180)
        .build();
      transaction.sign(buyer);
      return server.submitTransaction(transaction);
    })
    .then(function (result) {
      // return result;
      console.log("Buy Offer Success:\n", result);
    })
    // Second, the issuing account actually sends a payment using the asset
    .catch(function (error) {
      console.error("Error!", error);
    });
}
