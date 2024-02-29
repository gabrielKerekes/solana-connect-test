import { StakeProgram, Transaction } from "@solana/web3.js";
import {
  BLOCKHASH,
  LAST_VALID_BLOCK_HEIGHT,
  allFullPubKey,
  allFullStakePubKey,
  ledgerPubKey,
  randomPubKey,
  seedPubKey,
  systemProgramPubKey,
  trezorPubKey,
} from "./contants";

export const initializeAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allFullPubKey,
  }).add(
    StakeProgram.initialize({
      stakePubkey: allFullStakePubKey,
      authorized: {
        staker: allFullPubKey,
        withdrawer: allFullPubKey,
      },
      lockup: {
        unixTimestamp: 20,
        epoch: 330,
        custodian: allFullPubKey,
      },
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const authorize = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    StakeProgram.authorize({
      stakePubkey: ledgerPubKey,
      authorizedPubkey: ledgerPubKey,
      newAuthorizedPubkey: trezorPubKey,
      stakeAuthorizationType: { index: 1 },
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const delegate = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    StakeProgram.delegate({
      stakePubkey: ledgerPubKey,
      authorizedPubkey: randomPubKey,
      votePubkey: trezorPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const split = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    StakeProgram.split({
      stakePubkey: ledgerPubKey,
      authorizedPubkey: randomPubKey,
      splitStakePubkey: trezorPubKey,
      lamports: 1000000,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const withdraw = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    StakeProgram.withdraw({
      stakePubkey: ledgerPubKey,
      authorizedPubkey: ledgerPubKey,
      toPubkey: trezorPubKey,
      lamports: 1000000,
      custodianPubkey: randomPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const deactivate = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    StakeProgram.deactivate({
      stakePubkey: ledgerPubKey,
      authorizedPubkey: randomPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const merge = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    StakeProgram.merge({
      stakePubkey: ledgerPubKey,
      sourceStakePubKey: randomPubKey,
      authorizedPubkey: trezorPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

export const authorizeWithSeed = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    StakeProgram.authorizeWithSeed({
      stakePubkey: randomPubKey,
      authorityBase: ledgerPubKey,
      authoritySeed: "stake:0",
      authorityOwner: systemProgramPubKey,
      newAuthorizedPubkey: seedPubKey,
      stakeAuthorizationType: { index: 1 },
      //   custodianPubkey: trezorPubKey,
    })
  );

  return tx.serializeMessage().toString("hex");
};

// IntializeChecked, AuthorizeChecked, AuthorizeCheckedWithSeed
// and SetLockupChecked not implemented
