import { Transaction, SystemProgram, PublicKey } from "@solana/web3.js";
import {
  BLOCKHASH,
  LAST_VALID_BLOCK_HEIGHT,
  allFullPubKey,
  ledgerPubKey,
  randomPubKey,
  seedPubKey,
  systemProgramPubKey,
  trezorPubKey,
} from "./contants";

export const createAccountTransaction = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allFullPubKey,
  }).add(
    SystemProgram.createAccount({
      fromPubkey: allFullPubKey,
      newAccountPubkey: randomPubKey,
      lamports: 20000000,
      space: 1000,
      programId: systemProgramPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const assignTransaction = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allFullPubKey,
  }).add(
    SystemProgram.assign({
      accountPubkey: allFullPubKey,
      programId: new PublicKey(SystemProgram.programId),
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const createTransferTransaction = (blockhash: string = BLOCKHASH) => {
  const tx = new Transaction({
    blockhash,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allFullPubKey,
  }).add(
    SystemProgram.transfer({
      fromPubkey: allFullPubKey,
      toPubkey: trezorPubKey,
      lamports: 200000,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const createAccountWithSeedTransaction = (
  blockhash: string = BLOCKHASH
): string => {
  const tx = new Transaction({
    blockhash,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allFullPubKey,
  }).add(
    SystemProgram.createAccountWithSeed({
      fromPubkey: allFullPubKey,
      newAccountPubkey: seedPubKey,
      basePubkey: allFullPubKey,
      seed: "seed:1",
      lamports: 20000000,
      space: 0,
      programId: systemProgramPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const advanceNonceAccountTransaction = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    SystemProgram.nonceAdvance({
      noncePubkey: randomPubKey,
      authorizedPubkey: trezorPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const withdrawNonceAccountTransaction = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    SystemProgram.nonceWithdraw({
      noncePubkey: randomPubKey,
      authorizedPubkey: trezorPubKey,
      toPubkey: ledgerPubKey,
      lamports: 200000,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const initializeNonceAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    SystemProgram.nonceInitialize({
      noncePubkey: randomPubKey,
      authorizedPubkey: ledgerPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const authorizeNonceAccountTransaction = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    SystemProgram.nonceAuthorize({
      noncePubkey: randomPubKey,
      authorizedPubkey: ledgerPubKey,
      newAuthorizedPubkey: trezorPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const allocateTransaction = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    SystemProgram.allocate({
      accountPubkey: ledgerPubKey,
      space: 200,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const allocateWithSeed = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    SystemProgram.allocate({
      accountPubkey: new PublicKey(
        "BtaP9JShg3fT6pUTGxhYe9nsUjHWRJ76EWDPapwE3XWu"
      ),
      basePubkey: ledgerPubKey,
      seed: "seed:0",
      space: 200,
      programId: systemProgramPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const assignWithSeedTransaction = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    SystemProgram.assign({
      accountPubkey: new PublicKey(
        "BtaP9JShg3fT6pUTGxhYe9nsUjHWRJ76EWDPapwE3XWu"
      ),
      basePubkey: ledgerPubKey,
      seed: "seed:0",
      programId: systemProgramPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const transferWithSeedTransaction = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    SystemProgram.transfer({
      fromPubkey: ledgerPubKey,
      basePubkey: ledgerPubKey,
      toPubkey: seedPubKey,
      lamports: 200000,
      seed: "seed:0",
      programId: systemProgramPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

// NOT AVAILABLE IN SDK
// export const upgradeNonceAccountTransaction = () => {
//   const ledgerPubKey = new PublicKey(LEDGER_ADDRESS);

//   const tx = new Transaction({
//     blockhash: BLOCKHASH,
//     lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
//     feePayer: ledgerPubKey,
//   }).add(
//     SystemProgram.upgradeNonceAccount({
//       fromPubkey: ledgerPubKey,
//       basePubkey: ledgerPubKey,
//       toPubkey: seedPubKey,
//       lamports: 200000,
//       seed: "seed:0",
//       programId: new PublicKey("11111111111111111111111111111111"),
//     })
//   );

//   return tx.serializeMessage().toString("hex");
// };
