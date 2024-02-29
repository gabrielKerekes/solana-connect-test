import {
  Transaction,
  SystemProgram,
  PublicKey,
  ComputeBudgetProgram,
} from "@solana/web3.js";
import {
  AuthorityType,
  createSetAuthorityInstruction,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import {
  BLOCKHASH,
  LAST_VALID_BLOCK_HEIGHT,
  ledgerPubKey,
  randomPubKey,
  trezorPubKey,
} from "./transactions/contants";

export const createComputeBudgetTransaction = (
  blockhash: string = BLOCKHASH
) => {
  const tx = new Transaction({
    blockhash,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  })
    .add(ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 }))
    .add(ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 200 }))
    .add(
      SystemProgram.transfer({
        fromPubkey: ledgerPubKey,
        toPubkey: trezorPubKey,
        lamports: 200000000,
      })
    );

  return tx;
};

export const createInitializeNonceAccountTransaction = () => {
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

export const create = () => {
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

export const createSetTokenAuthorityTransaction = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: trezorPubKey,
  }).add(
    createSetAuthorityInstruction(
      new PublicKey("6YuhWADZyAAxAaVKPm1G5N51RvDBXsnWo4SfsJ47wSoK"),
      trezorPubKey,
      AuthorityType.FreezeAccount,
      trezorPubKey,
      [trezorPubKey]
    )
  );

  return tx.serializeMessage().toString("hex");
};

export const createCreateAssociatedTokenAccountTransaction = async (
  blockhash: string = BLOCKHASH
) => {
  const associatedTokenAddress = await getAssociatedTokenAddress(
    new PublicKey("Gj7ur9LxwPv27RN9bfmB6rR8Zh9hcm7Kpn3DznKrtvnV"),
    ledgerPubKey
  );

  const tx = new Transaction({
    blockhash,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: ledgerPubKey,
  }).add(
    createAssociatedTokenAccountInstruction(
      ledgerPubKey,
      associatedTokenAddress,
      ledgerPubKey,
      new PublicKey("Gj7ur9LxwPv27RN9bfmB6rR8Zh9hcm7Kpn3DznKrtvnV")
    )
  );

  return tx;
};
