import {
  Transaction,
  SystemProgram,
  PublicKey,
  ComputeBudgetInstruction,
  ComputeBudgetProgram,
} from "@solana/web3.js";

const CREATE_TOKEN_TRANSACTION =
  "02000305b2a722dc18dd5c49c3f48e9b0726f11be66786e91cac573498d6ee88392cc96a527706a12f3f7c3c852582f0f79b515c03c6ffbe6e3100044ba7c982eb5cf9f2000000000000000000000000000000000000000000000000000000000000000006a7d517192c5c51218cc94c3d4af17f58daee089ba1fd44e3dbd98a0000000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9175c061af9280e461e3390a05ba941cff657f7ff1aeaeb20f49b0bbd93b2ab3702020200013400000000604d160000000000520000000000000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a904020103230009b2a722dc18dd5c49c3f48e9b0726f11be66786e91cac573498d6ee88392cc96a00";
const MINT_TOKEN_TRANSACTION =
  "01000104b2a722dc18dd5c49c3f48e9b0726f11be66786e91cac573498d6ee88392cc96a527706a12f3f7c3c852582f0f79b515c03c6ffbe6e3100044ba7c982eb5cf9f2d7258ac6bf4f084fd1f9be9b96044c41aecb150d59c58f0569dc22a826c4b73a06ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9e21ffd36c6724c552d2248cb0974ea93173ac284a996c0c556948cf7a683f5f00103030102000a0e00e876481700000009";
const TRANSFER_TOKEN_TRANSACTION =
  "01000205b2a722dc18dd5c49c3f48e9b0726f11be66786e91cac573498d6ee88392cc96aa99c9c4d0c7def9dd60a3a40dc5266faf41996310aa62ad6cbd9b64e1e2cca78d7258ac6bf4f084fd1f9be9b96044c41aecb150d59c58f0569dc22a826c4b73a06ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9527706a12f3f7c3c852582f0f79b515c03c6ffbe6e3100044ba7c982eb5cf9f25d2d6510d70562dbc9ed32a47299681daa255e518b8b8d9bdae2c7b458b1283e010304020401000a0c00e40b540200000009";
const TRANSFER_TOKEN_WITH_FUND_RECIPIENT_TRANSACTION =
  "01000508b2a722dc18dd5c49c3f48e9b0726f11be66786e91cac573498d6ee88392cc96aa99c9c4d0c7def9dd60a3a40dc5266faf41996310aa62ad6cbd9b64e1e2cca78d7258ac6bf4f084fd1f9be9b96044c41aecb150d59c58f0569dc22a826c4b73a000000000000000000000000000000000000000000000000000000000000000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9527706a12f3f7c3c852582f0f79b515c03c6ffbe6e3100044ba7c982eb5cf9f28c97258f4e2489f1bb3d1029148e0d830b5a1399daff1084048e7bd8dbe9f859c80f8b50107e9f3e3c16a661b8c806df454a6deb293d5e8730a9d28f2f4998c6e004b423493b058de3a2e4026fec91e567fbff11a7712a0c816030453f4ce88d02060600010705030401010404020501000a0c00743ba40b00000009";

const BLOCKHASH = "2p4rYZAaFfV5Uk5ugdG5KPNty9Uda9B3b4gWB8qnNqak";
const LAST_VALID_BLOCK_HEIGHT = 50;

const RANDOM_ADDRESS = "AeDJ1BqA7ruBbd6mEcS1QNxFbT8FQbiBVuN9NqK94Taq";
const TREZOR_ADDRESS = "ETxHeBBcuw9Yu4dGuP3oXrD12V5RECvmi8ogQ9PkjyVF";
const LEDGER_ADDRESS = "D2PPQSYFe83nDzk96FqGumVU8JA7J8vj2Rhjc2oXzEi5";

const STAKE_PROGRAM = "Stake11111111111111111111111111111111111111";

const getPubKey = (hwWallet: "trezor" | "ledger") =>
  new PublicKey(hwWallet === "trezor" ? TREZOR_ADDRESS : LEDGER_ADDRESS);

export const getRawTransaction = () => {
  return TRANSFER_TOKEN_TRANSACTION;
};

export const createAccountTransaction = (hwWallet: "trezor" | "ledger") => {
  const walletKey = getPubKey(hwWallet);

  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: walletKey,
  }).add(
    SystemProgram.createAccount({
      fromPubkey: new PublicKey(TREZOR_ADDRESS),
      newAccountPubkey: new PublicKey(RANDOM_ADDRESS),
      lamports: 20000000,
      space: 1000,
      programId: new PublicKey(RANDOM_ADDRESS),
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const createComputeBudgetTransaction = (
  hwWallet: "trezor" | "ledger"
) => {
  const walletKey = getPubKey(hwWallet);

  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: walletKey,
  })
    .add(ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 }))
    .add(
      SystemProgram.transfer({
        fromPubkey: walletKey,
        toPubkey: new PublicKey(RANDOM_ADDRESS),
        lamports: 200000000,
      })
    );

  return tx.serializeMessage().toString("hex");
};

export const createInitializeNonceAccountTransaction = (
  hwWallet: "trezor" | "ledger"
) => {
  const walletKey = getPubKey(hwWallet);

  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: walletKey,
  }).add(
    SystemProgram.nonceInitialize({
      noncePubkey: new PublicKey(RANDOM_ADDRESS),
      authorizedPubkey: new PublicKey(walletKey),
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const create = (hwWallet: "trezor" | "ledger") => {
  const walletKey = getPubKey(hwWallet);

  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: walletKey,
  }).add(
    SystemProgram.nonceInitialize({
      noncePubkey: new PublicKey(RANDOM_ADDRESS),
      authorizedPubkey: new PublicKey(walletKey),
    })
  );

  return tx.serializeMessage().toString("hex");
};
