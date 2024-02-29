import { PublicKey, Transaction } from "@solana/web3.js";
import {
  AuthorityType,
  TOKEN_PROGRAM_ID,
  createApproveCheckedInstruction,
  createAssociatedTokenAccountIdempotentInstruction,
  createAssociatedTokenAccountInstruction,
  createBurnCheckedInstruction,
  createCloseAccountInstruction,
  createFreezeAccountInstruction,
  createInitializeAccount2Instruction,
  createInitializeAccount3Instruction,
  createInitializeAccountInstruction,
  createInitializeImmutableOwnerInstruction,
  createInitializeMultisigInstruction,
  createMintToCheckedInstruction,
  createNativeMint,
  createRevokeInstruction,
  createSetAuthorityInstruction,
  createSyncNativeInstruction,
  createThawAccountInstruction,
  createTransferCheckedInstruction,
} from "@solana/spl-token";
import {
  BLOCKHASH,
  LAST_VALID_BLOCK_HEIGHT,
  ledgerPubKey,
  mintPubKey,
  randomPubKey,
  tokenPubKey,
  trezorPubKey,
} from "./contants";

export const initializeAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createInitializeAccountInstruction(tokenPubKey, mintPubKey, ledgerPubKey)
  );

  return tx.serializeMessage().toString("hex");
};

export const initializeAccount2 = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createInitializeAccount2Instruction(tokenPubKey, mintPubKey, ledgerPubKey)
  );

  return tx.serializeMessage().toString("hex");
};

export const initializeAccount3 = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createInitializeAccount3Instruction(tokenPubKey, mintPubKey, ledgerPubKey)
  );

  return tx.serializeMessage().toString("hex");
};

export const initializeMultisig = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createInitializeMultisigInstruction(
      tokenPubKey,
      [ledgerPubKey, trezorPubKey],
      2
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const initializeImmutableOwner = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createInitializeImmutableOwnerInstruction(tokenPubKey, TOKEN_PROGRAM_ID)
  );

  return tx.serializeMessage().toString("hex");
};

export const transferChecked = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createTransferCheckedInstruction(
      tokenPubKey,
      mintPubKey,
      trezorPubKey,
      randomPubKey,
      200,
      1,
      [
        ledgerPubKey,
        randomPubKey,
        new PublicKey("6kkV8JtbvN41c9VXNKRSzMmS8JJ5n2wC7fZicYB7xqJx"),
      ]
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const approveChecked = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createApproveCheckedInstruction(
      tokenPubKey,
      mintPubKey,
      trezorPubKey,
      ledgerPubKey,
      200,
      1,
      [ledgerPubKey, randomPubKey]
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const revoke = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(createRevokeInstruction(tokenPubKey, ledgerPubKey));

  return tx.serializeMessage().toString("hex");
};

export const setAuthority = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createSetAuthorityInstruction(
      tokenPubKey,
      ledgerPubKey,
      AuthorityType.MintTokens,
      ledgerPubKey,
      [ledgerPubKey, randomPubKey]
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const mintToChecked = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createMintToCheckedInstruction(
      mintPubKey,
      trezorPubKey,
      ledgerPubKey,
      200,
      2
      //   [ledgerPubKey, randomPubKey]
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const burnChecked = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createBurnCheckedInstruction(
      tokenPubKey,
      mintPubKey,
      ledgerPubKey,
      200,
      2,
      [ledgerPubKey, randomPubKey]
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const closeAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createCloseAccountInstruction(tokenPubKey, trezorPubKey, ledgerPubKey, [
      ledgerPubKey,
      randomPubKey,
    ])
  );

  return tx.serializeMessage().toString("hex");
};

export const freezeAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(createFreezeAccountInstruction(tokenPubKey, mintPubKey, ledgerPubKey));

  return tx.serializeMessage().toString("hex");
};

export const thawAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createThawAccountInstruction(tokenPubKey, mintPubKey, ledgerPubKey, [
      ledgerPubKey,
      randomPubKey,
    ])
  );

  return tx.serializeMessage().toString("hex");
};

export const syncNative = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(createSyncNativeInstruction(tokenPubKey));

  return tx.serializeMessage().toString("hex");
};

export const createAssociatedTokenAccount = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createAssociatedTokenAccountInstruction(
      ledgerPubKey,
      tokenPubKey,
      ledgerPubKey,
      mintPubKey
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const createAssociatedTokenAccountIdempotent = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createAssociatedTokenAccountIdempotentInstruction(
      ledgerPubKey,
      tokenPubKey,
      ledgerPubKey,
      mintPubKey
    )
  );

  return tx.serializeMessage().toString("hex");
};
