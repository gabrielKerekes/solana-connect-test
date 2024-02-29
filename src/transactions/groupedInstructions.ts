import { StakeProgram, SystemProgram, Transaction } from "@solana/web3.js";
import {
  BLOCKHASH,
  LAST_VALID_BLOCK_HEIGHT,
  allFullPubKey,
  allFullStakePubKey,
  ledgerPubKey,
  randomPubKey,
  stakeProgramPubKey,
  systemProgramPubKey,
  trezorPubKey,
} from "./contants";

export const createStakeAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allFullPubKey,
  }).add(
    SystemProgram.createAccount({
      fromPubkey: allFullPubKey,
      newAccountPubkey: allFullStakePubKey,
      lamports: 20000000,
      space: 1000,
      programId: stakeProgramPubKey,
    }),
    StakeProgram.initialize({
      stakePubkey: allFullStakePubKey,
      authorized: {
        staker: allFullPubKey,
        withdrawer: allFullPubKey,
      },
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const createStakeAccountAndDelegate = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    SystemProgram.createAccount({
      fromPubkey: ledgerPubKey,
      newAccountPubkey: randomPubKey,
      lamports: 20000000,
      space: 1000,
      programId: systemProgramPubKey,
    }),
    StakeProgram.initialize({
      stakePubkey: randomPubKey,
      authorized: {
        staker: trezorPubKey,
        withdrawer: ledgerPubKey,
      },
    }),
    StakeProgram.delegate({
      stakePubkey: randomPubKey,
      authorizedPubkey: ledgerPubKey,
      votePubkey: trezorPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};
